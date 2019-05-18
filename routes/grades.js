const express = require('express');
const Class = require('../models').Class;
const Source = require('../models').Source;
const Annotation = require('../models').Annotation;
const GradingSystem = require('../models').GradingSystem;
const GradingThreshold = require('../models').GradingThreshold;
const CriteriaCount = require('../models').CriteriaCount;
const Criteria = require('../models').Criteria;
const Assignment = require('../models').Assignment;
const router = express.Router();
const h2p = require('html2plaintext');

/**
 * Get grading systems of a class.
 * @name GET/api/grades/gradingSystems
 */
router.get('/gradingSystems', (req, res) => {
  if (!req.session.classId){
    res.status(200).json(null);
    return null;
  }
  Class.findByPk(req.session.classId,{include: [{
      association: 'GradingSystems',
      include: [{
        association: 'GradingThresholds',
        include: [{
          association: 'CriteriaCounts',
          attributes: ['id','num_annotations', 'criteria_id']
        }],
        order: [
          [GradingThreshold, 'score', 'DESC']
        ]
      },
      {association: 'Criteria'}
    ]
    }]
  }).then((nb_class) => {
    res.status(200).json(nb_class.GradingSystems);
  });
});


/**
 * Set grading threshold of a class.
 * @name POST/api/grades/gradingSystems
 * @param id: id of grading system to add threshold to
 */
router.post('/threshold/:id', (req, res) => {
  GradingThreshold.create({
    label: req.body.label,
    score: req.body.points,
    total_comments: req.body.totalComments,
    total_words: req.body.totalWords,
    total_tags: req.body.totalHashtags,
    total_chars: req.body.totalChars,
    grading_system_id: req.params.id,
    CriteriaCounts: Object.keys(req.body.customCriteria).map(id => {
      return {
        criteria_id: id,
        num_annotations: req.body.customCriteria[id]
      };
    })
  },{
    include:[{association: 'CriteriaCounts'}]
  })
  .then(threshold => {
    res.status(200).json(threshold);
  });
});

/**
 * Edit grading threshold of a class.
 * @name GET/api/grades/gradingSystems
 * @param id: id of grading threshold
 */
router.put('/threshold/:id', (req, res) => {
  GradingThreshold.findByPk(req.params.id).then(threshold =>
    threshold.update({
      label: req.body.label,
      score: req.body.points,
      total_comments: req.body.totalComments,
      total_words: req.body.totalWords,
      total_tags: req.body.totalHashtags,
      total_chars: req.body.totalChars,
    }))
    .then(threshold =>
      Object.keys(req.body.customCriteria).map(id => {
        CriteriaCount.findOne({where: {
          criteria_id: id,
          grading_threshold_id: threshold.id
        }})
        .then(criteriaCount => {
          if(criteriaCount){
            return criteriaCount.update({
              num_annotations: req.body.customCriteria[id]
            });
          }
          else{
            return CriteriaCount.create({
              criteria_id: id,
              grading_threshold_id: threshold.id,
              num_annotations: req.body.customCriteria[id]
            });
          }
        });
      })
  )
  .then(() => {
    res.status(200).json(null);
  });
});


/**
 * Delete grading threshold of a class.
 * @name DELETE/api/grades/threshold
 * @param id: id of grading threshold
 */
router.delete('/threshold/:id', (req, res) => {
  GradingThreshold.destroy({where:{id: req.params.id}})
  .then(() => {
    res.status(200).json(null);
  });
});

/**
 * Create custom criteria for a grading system
 * @name POST/api/grades/criteria/:id
 * @param id: id of grading system
 */
router.post('/criteria/:id', (req, res) => {
  Criteria.create({
    label: req.body.label,
    num_tags: req.body.filters.HASHTAGS,
    num_words: req.body.filters.WORDS,
    num_chars: req.body.filters.CHARS,
    grading_system_id: req.params.id
  })
  .then(criteria => res.status(200).json(criteria))
});

/**
 * Edit custom criteria for a grading system
 * @name PUT/api/grades/criteria/:id
 * @param id: id of criteria
 */
router.put('/criteria/:id', (req, res) => {
  Criteria.findByPk(req.params.id).then(criteria =>
    criteria.update({
      label: req.body.label,
      num_tags: req.body.filters.HASHTAGS,
      num_words: req.body.filters.WORDS,
      num_chars: req.body.filters.CHARS
    }))
  .then(criteria => res.status(200).json(criteria))
});

/**
 * Delete custom criteria for a grading system
 * @name DELETE/api/grades/criteria/:id
 * @param id: id of criteria
 */
router.delete('/criteria/:id', (req, res) => {
  Criteria.destroy({where:{id: req.params.id}})
    .then(() => res.status(200).json(null));
});

/**
 * Generate grades for all students in current class for a given source and grading scheme
 * @name GET/api/grades/grades
 * @param sourceId: id of source file
 * @param gradingSystemId: id of gradingSystem
 */
router.get('/grades', (req, res) => {
  Class.findByPk(req.session.classId, {include:
    [{
      association: 'GlobalSection',
      include:[{
        association: 'MemberStudents',
        include:[{
          association: 'Annotations',
          // TODO: fix in query, temp measure is in filtering below
          // where: { createdAt: {$lt : new Date(req.query.date)}},
          // required: false,
          include:[{
            association: 'Thread',
            required: true,
            include: [{
              association: 'Location',
              required: true,
              include: [{
                association: 'Source',
                where:{id: req.query.sourceId},
                required: true,
              }],
            }]
          },
          {association: 'Tags'}
          ]
        }]
      }]
    }]
}).then(nb_class => {
  // Source.findByPk(req.query.sourceId,{include: [{association: 'Assignment'}]}).then(source =>{
  //   if(source.Assignment){
  //     source.Assignment.update({deadline: new Date(req.query.date)});
  //   }
  //   else{
  //     Assignment.create({deadline: new Date(req.query.date), source_id: source.id});
  //   }
  // })
  GradingSystem.findByPk(req.query.gradingSystemId, {include:
    [
      {association: 'Criteria'},
      {association: 'GradingThresholds',
        include:[{association: 'CriteriaCounts'}]
      }
    ]})
    .then(gradingSystem => {
      let grades = [];
      let annotations = {};
      let filters = {};
      let date = new Date(req.query.date);
      let students = nb_class.GlobalSection.MemberStudents.map(student => {
        annotations[student.id] = student.Annotations.filter(annotation =>
          req.query.date && annotation.get({plain:true}).createdAt < date
        );
        return student.get({plain: true});
      });
      nb_class.GlobalSection.MemberStudents.forEach(student => {
        annotations[student.id] = annotations[student.id].map(annotation => {
          let text = h2p(annotation.content);
          return {
            words : text.split(" ").length,
            chars : text.length,
            tags : annotation.Tags.length
          };
        });
      });

      gradingSystem.Criteria.forEach(criteria => {
        filters[criteria.id] = function(annotation){
          return annotation.words >= criteria.num_words &&
            annotation.chars >= criteria.num_chars &&
            annotation.tags >= criteria.num_tags;
        };
      });
      students.forEach(student => {
        let gradeLine = {
          username: student.username,
          email: student.email,
          name: `${student.first_name} ${student.last_name}`,
          total_words: annotations[student.id].reduce((sum, annotation) => (sum + annotation.words), 0),
          total_chars: annotations[student.id].reduce((sum, annotation) => (sum + annotation.chars), 0),
          total_tags: annotations[student.id].reduce((sum, annotation) => (sum + annotation.tags), 0),
          total_comments: annotations[student.id].length,
        };
        let possibleGrades = gradingSystem.GradingThresholds.filter(threshold =>
            gradeLine.total_words > threshold.total_words &&
            gradeLine.total_chars > threshold.total_chars &&
            gradeLine.total_tags > threshold.total_tags &&
            gradeLine.total_comments > threshold.total_comments &&
            //Go through all the criteria counts and see if satisfying annotations are enough
            (threshold.CriteriaCounts.reduce((bool, criteriaCount) =>
              (bool &&
                (criteriaCount.num_annotations == 0 ||
                  annotations[student.id]
                  .filter(filters[criteriaCount.criteria_id]).length >= criteriaCount.num_annotations)),
              true))
        );
        gradeLine.grade = possibleGrades.reduce((max, t) => t.score > max ? t.score : max, 0);
        grades.push(gradeLine);
      });
      res.status(200).json(grades);
    });
});

});

module.exports = router;
