const express = require('express');
const User = require('../models').User;
const Annotation = require('../models').Annotation;
const Thread = require('../models').Thread;
const Source = require('../models').Source;
const Location = require('../models').Location;
const HtmlLocation = require('../models').HtmlLocation;
const Tag = require('../models').Tag;
const router = express.Router();

/**
 * Get all users for a given source
 * @name GET/api/annotations/allUsers
 */
router.get('/allUsers', (req,res) => {
  Source.findOne({where:{filepath: req.query.url}, include:[{association: 'Class',
    include: [
      {association:'GlobalSection', include:[{association: 'MemberStudents', attributes:['id', 'username', 'first_name', 'last_name']}]},
      {association: 'Instructors', attributes:['id', 'username', 'first_name', 'last_name']}]}]})
    .then((source) =>
      {
        const students = source.Class.GlobalSection.MemberStudents
          .map((user) => simplifyUser(user, 'student'))
          .reduce((obj,user)=> {obj[user.id] = user; return obj;}, {});
        const instructors = source.Class.Instructors
          .map((user) => simplifyUser(user, 'instructor'))
          .reduce((obj,user)=> {obj[user.id] = user; return obj;}, {});
        res.status(200).json(Object.assign(students, instructors));
      }
    );
});

/**
 * Get all users for a given source
 * @name GET/api/annotations/allTagTypes
 */
router.get('/allTagTypes', (req,res) => {
  Source.findOne({where:{filepath: req.query.url}, include:[{association: 'Class',
    include: [{association:'TagTypes'}]}]})
    .then((source) =>
      {
        const hashtags = source.Class.TagTypes
          .map((tag_type) => tag_type.get({plain:true}))
          .reduce((obj,tag) => {obj[tag.id] = tag; return obj;}, {});
        res.status(200).json(hashtags);
      }
    );
});

/**
 * Get all top-level annotation for a given source
 * @name GET/api/annotations/annotation
 * @param url: source url
 * @return [{
 * id: id of annotation
 * content: text content of annotation,
 * range: json for location range,
 * author: id of author,
 * tags: list of ids of tag types,
 * userTags: list of ids of users tagged,
 * visibility: string enum,
 * anonymity: string enum,
 * replyRequest: boolean,
 * star: boolean
 * }]
 */
router.get('/annotation', (req, res)=> {
  Source.findOne({where:{filepath: req.query.url},
    include:[{association: 'Class', include:[{association: 'Instructors', attributes: ['id']}]}]})
  .then(source =>
    source.getLocations({include:
      [
        {association:'HtmlLocation'},
        {association: 'Thread', include:[
          {association: 'HeadAnnotation', attributes:['id', 'content', 'visibility', 'anonymity', 'created_at'],
          include:[
            {association: 'Author', attributes: ['id', 'first_name', 'last_name', 'username']},
            {association: 'ReplyRequesters', attributes: ['id', 'first_name', 'last_name', 'username']},
            {association: 'Starrers', attributes: ['id', 'first_name', 'last_name', 'username']},
            {association: 'TaggedUsers', attributes: ['id']},
            {association: 'Tags', attributes: ['tag_type_id']},
            {association: 'Bookmarkers', attributes: ['id']}
          ]},
          {association: 'SeenUsers', attributes: ['id', 'first_name', 'last_name', 'username']},
          {association: 'RepliedUsers', attributes: ['id', 'first_name', 'last_name', 'username']},
        ]}
      ]})
      .then(locations => {
        let instructors = source.Class.Instructors.map(user => user.id);
        let annotations = locations.map((location) => {
          let annotation = {};

          let range = location.HtmlLocation;
          let head = location.Thread.HeadAnnotation;

          annotation.id = head.id;
          annotation.range = {
            start: range.start_node,
            end: range.end_node,
            startOffset: range.start_offset,
            endOffset: range.end_offset
          };
          annotation.parent = null;
          annotation.timestamp = head.dataValues.created_at;
          annotation.author = head.Author.id;
          annotation.authorName = head.Author.first_name + " " + head.Author.last_name;
          annotation.instructor = instructors.indexOf(head.Author.id) >= 0;
          annotation.html = head.content;
          annotation.hashtags = head.Tags.map(tag => tag.tag_type_id);
          annotation.people = head.TaggedUsers.map(userTag => userTag.id);
          annotation.visibility = head.visibility;
          annotation.anonymity = head.anonymity;
          annotation.replyRequestedByMe = head.ReplyRequesters
            .reduce((bool, user)=> bool || user.id == req.session.userId, false);
          annotation.replyRequestCount = head.ReplyRequesters.length;
          annotation.starredByMe = head.Starrers
            .reduce((bool, user)=> bool || user.id == req.session.userId, false);
          annotation.starCount = head.Starrers.length;
          annotation.seenByMe = location.Thread.SeenUsers
            .reduce((bool, user)=> bool || user.id == req.session.userId, false);
          annotation.bookmarked = head.Bookmarkers
            .reduce((bool, user)=> bool || user.id == req.session.userId, false);
          return annotation;
        });
        res.status(200).json(annotations);

      })
  );
});


/**
 * Make new thread for a given annotation
 * @name POST/api/annotations/annotation
 * @param url: source url
 * @param content: text content of annotation
 * @param range: json for location range
 * @param author: id of author
 * @param tags: list of ids of tag types
 * @param userTags: list of ids of users tagged
 * @param visibility: string enum
 * @param anonymity: string enum
 * @param replyRequest: boolean
 * @param star: boolean
 * @param bookmark: boolean
 */
router.post('/annotation', (req, res)=> {
  let range = req.body.range;
  Source.findOne({where:{filepath: req.body.url}})
  .then(source => Location.create({source_id: source.id})
    .then(location => Promise.all(
      [HtmlLocation.create({
        start_node: range.start,
        end_node: range.end,
        start_offset: range.startOffset,
        end_offset: range.endOffset,
        location_id: location.id
      }),
      Thread.create({
        location_id: location.id,
        HeadAnnotation:{
          content: req.body.content,
          visibility: req.body.visibility,
          anonymity: req.body.anonymity,
          author_id: req.session.userId
        }},
        {
          include: [{association: 'HeadAnnotation'}]
        }
      )
      .then(thread => {
        let annotation = thread.HeadAnnotation;

        req.body.tags.forEach((tag) => Tag.create({annotation_id: annotation.id, tag_type_id: tag}));
        req.body.userTags.forEach((user_id) => User.findByPk(user_id).then(user => annotation.addTaggedUser(user)));
        User.findByPk(req.session.userId).then(user => {
          if (req.body.replyRequest) annotation.addReplyRequester(user);
          if (req.body.star) annotation.addStarrer(user);
          if (req.body.bookmark) annotation.addBookmarker(user);
          thread.setSeenUsers([user]);
          thread.setRepliedUsers([user]);
        });
        annotation.setThread(thread).then(() => res.status(200).json(annotation));
      })
      ])
    )
  );
});

/**
 * Get all reply annotation for a given parent
 * @name GET/api/annotations/reply/:id
 * @param id: parent id
 * @return [{
 * id: id of annotation
 * content: text content of annotation,
 * range: json for location range,
 * author: id of author,
 * tags: list of ids of tag types,
 * userTags: list of ids of users tagged,
 * visibility: string enum,
 * anonymity: string enum,
 * replyRequest: boolean,
 * star: boolean
 * }]
 */
router.get('/reply/:id', (req, res)=> {
  Annotation.findByPk(req.params.id, {
    include: [{association:'Thread', attributes:['id'],
      include: [{association: 'Location', attributes:['id'],
        include: [{association: 'Source', attributes:['id'],
          include: [{association: 'Class', attributes:['id'],
            include: [{association: 'Instructors', attributes:['id']}]
          }]
        }]
      }]
    }]
  })
  .then(parent => parent.Thread.Location.Source.Class.Instructors.map(user => user.id))
  .then(instructors => {
    Annotation.findAll({where: {parent_id: req.params.id},
      attributes:['id', 'content', 'visibility', 'anonymity', 'created_at'],
      include:[
        {association: 'Thread', include:[{association: 'SeenUsers'}]},
        {association: 'Author', attributes: ['id', 'first_name', 'last_name', 'username']},
        {association: 'ReplyRequesters', attributes: ['id', 'first_name', 'last_name', 'username']},
        {association: 'Starrers', attributes: ['id', 'first_name', 'last_name', 'username']},
        {association: 'TaggedUsers', attributes: ['id']},
        {association: 'Tags', attributes: ['tag_type_id']},
        {association: 'Bookmarkers', attributes: ['id']}
      ]
    })
    .then(annotations => {
      return annotations.map(annotation => {
        let reply = {};
        reply.id = annotation.id;
        reply.range = null;
        reply.parent = req.params.id;
        reply.timestamp = annotation.dataValues.created_at;
        reply.author = annotation.Author.id;
        reply.authorName = annotation.Author.first_name + " " + annotation.Author.last_name;
        reply.instructor = instructors.indexOf(annotation.Author.id) >= 0;
        reply.html = annotation.content;
        reply.hashtags = annotation.Tags.map(tag => tag.tag_type_id);
        reply.people = annotation.TaggedUsers.map(userTag => userTag.id);
        reply.visibility = annotation.visibility;
        reply.anonymity = annotation.anonymity;
        reply.replyRequestedByMe = annotation.ReplyRequesters
          .reduce((bool, user)=> bool || user.id == req.session.userId, false);
        reply.replyRequestCount = annotation.ReplyRequesters.length;
        reply.starredByMe = annotation.Starrers
          .reduce((bool, user)=> bool || user.id == req.session.userId, false);
        reply.starCount = annotation.Starrers.length;
        reply.seenByMe = annotation.Thread.SeenUsers
          .reduce((bool, user)=> bool || user.id == req.session.userId, false);
        reply.bookmarked = annotation.Bookmarkers
          .reduce((bool, user)=> bool || user.id == req.session.userId, false);
        return reply;
      });
    })
    .then(annotations => res.status(200).json(annotations));
  });


});



/**
 * Make new reply for a given annotation
 * @name GET/api/annotations/reply/:id
 * @param id: id of parent annotation
 * @param content: text content of annotation
 * @param author: id of author
 * @param tags: list of ids of tag types
 * @param userTags: list of ids of users tagged
 * @param visibility: string enum
 * @param anonymity: string enum
 * @param replyRequest: boolean
 * @param star: boolean
 */
router.post('/reply/:id', (req, res)=>{
  Annotation.findByPk(req.params.id,{include:[{association:'Thread'}]}).then((parent) =>
    Annotation.create({
      content: req.body.content,
      visibility: req.body.visibility,
      anonymity: req.body.anonymity,
      thread_id: parent.Thread.id,
      author_id: req.session.userId,
      Tags: req.body.tags.map(tag_type => {return {tag_type_id: tag_type};}),
    },{
      include: [{association: 'Tags'}]
    }).then((child) => {
      req.body.userTags.forEach(user_id =>
        User.findByPk(user_id).then(user => child.addTaggedUser(user)));
      User.findByPk(req.session.userId).then(user => {
        if (req.body.replyRequest) child.addReplyRequester(user);
        if (req.body.star) child.addStarrer(user);
        if (req.body.bookmark) child.addBookmarker(user);
        parent.Thread.setSeenUsers([user]);
        parent.Thread.setRepliedUsers([user]);
      });
      parent.addChild(child);
      res.status(200).json(child);
    })
  );
});

/**
 * Edit a given annotation
 * @name GET/api/annotations/reply/:id
 * @param id: id of parent annotation
 * @param content: text content of annotation
 * @param tags: list of ids of tag types
 * @param userTags: list of ids of users tagged
 * @param visibility: string enum
 * @param anonymity: string enum
 * @param replyRequest: boolean
 */
router.put('/annotation/:id', (req, res) => {
  Annotation.findByPk(req.params.id)
    .then(annotation =>
      annotation.update({
        content: req.body.content,
        visibility: req.body.visibility,
        anonymity: req.body.anonymity
      })
      .then(() => Tag.destroy({where:{annotation_id: annotation.id}}))
      .then(() => {
        if(req.body.userTags && req.body.userTags.length){
          Promise.all(req.body.userTags.map(user_id => User.findByPk(user_id)))
            .then(users => annotation.setTaggedUsers(users));
        }
        if (req.body.tags && req.body.tags.length){
          Promise.all(req.body.tags.map(tag => Tag.create({annotation_id: annotation.id, tag_type_id: tag})))
            .then(tags => annotation.setTags(tags));
        }
        return User.findByPk(req.session.userId).then(user => {
          if (req.body.replyRequest) annotation.addReplyRequester(user);
          else annotation.removeReplyRequester(user);
        });
      })
      .then(() => res.status(200))
    );
});

/**
 * Deletes a given annotation
 * @name DELETE/api/annotations/annotation/:id
 * @param id: id of annotation
 */
router.delete('/annotation/:id', (req, res) => {
  Annotation.findByPk(req.params.id, {include: [
      {association: 'Thread', include:[{association: 'Location'}]},
      {association: 'Parent'}
    ]})
    .then(annotation => {
      annotation.destroy();
      if(!annotation.Parent){
        annotation.Thread.destroy();
        annotation.Thread.Location.destroy();
      }

    })
    .then(() => res.status(200));
});

/**
 * Sets seen for a given annotation and user
 * @name POST/api/annotations/star/:id
 * @param id: id of annotation
 */
router.post('/seen/:id', (req, res) => {
  Annotation.findByPk(req.params.id, {include:[{association: 'Thread'}]}).then(annotation =>
    User.findByPk(req.session.userId).then(user => {
      annotation.Thread.addSeenUser(user);
    }).then(() => res.status(200))
  );
});

/**
 * Toggles a star for a given annotation
 * @name POST/api/annotations/star/:id
 * @param id: id of annotation
 */
router.post('/star/:id', (req, res) => {
  Annotation.findByPk(req.params.id, {include:[{association: 'Thread'}]}).then(annotation =>
    User.findByPk(req.session.userId).then(user => {
      if (req.body.star) {annotation.addStarrer(user);}
      else {annotation.removeStarrer(user);}
      annotation.Thread.addSeenUser(user);
      annotation.Thread.addRepliedUser(user);
    }).then(() => res.status(200))
  );
});

/**
 * Toggles a replyRequest for a given annotation
 * @name POST/api/annotations/replyRequest/:id
 * @param id: id of annotation
 */
router.post('/replyRequest/:id', (req, res) => {
  Annotation.findByPk(req.params.id, {include:[{association: 'Thread'}]}).then(annotation =>
    User.findByPk(req.session.userId).then(user => {
      if (req.body.replyRequest) {annotation.addReplyRequester(user);}
      else {annotation.removeReplyRequester(user);}
      annotation.Thread.addSeenUser(user);
      annotation.Thread.addRepliedUser(user);
    }).then(() => res.status(200))
  );
});

/**
 * Toggles a bookmark for a given annotation
 * @name POST/api/annotations/bookmark/:id
 * @param id: id of annotation
 */
router.post('/bookmark/:id', (req, res) => {
  Annotation.findByPk(req.params.id, {include:[{association: 'Thread'}]}).then(annotation =>
    User.findByPk(req.session.userId).then(user => {
      if (req.body.bookmark) {annotation.addBookmarker(user);}
      else {annotation.removeBookmarker(user);}
      annotation.Thread.addSeenUser(user);
      annotation.Thread.addRepliedUser(user);
    }).then(() => res.status(200))
  );
});


function simplifyUser(user, role){
  const id = user.id;
  user = user.get({plain: true});
  user.id = id;
  user.name = {first: user.first_name, last: user.last_name};
  user.role = role;
  return user;
}


module.exports = router;
