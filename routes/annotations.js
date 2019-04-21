const express = require('express');
const Annotation = require('../models').Annotation;
const Thread = require('../models').Thread;
const Source = require('../models').Source;
const Location = require('../models').Location;
const HtmlLocation = require('../models').HtmlLocation;
const router = express.Router();

/**
 * Gets top level annotations for a given source 
 * @name GET/api/annotations/source/:id
 * @param id: id of source
 * @returns list of annotations of the form 
 * {id, 
 * range, 
 * created_at, 
 * author{id, username}, 
 * content, 
 * tags, 
 * tagged_users, 
 * visibility, 
 * anonymity, 
 * starrers, 
 * bookmarkers,
 * reply_requesters,
 * thread,
 * parent}
 */
router.get('/source/:id', (req, res) => {
  Source.findByPk(req.params.id).then((source) =>
    source.getLocations()
      //returns locations with range as a field
      .then((locations) => 
        Promise.all(locations.map((location) => addRange(location)))
      )
      //return annotation with range as a field
      .then((locations) => 
        Promise.all(locations.map((location) => addAnnotation(location)))
      ).then((annotations) => {
        res.status(200).json(annotations);
      })
  );
});

/**
 * Make new annotation for a given source
 * @name GET/api/annotations/source/:id
 * @param id: id of source
 * @param range: {start_node, end_node, start_offset, end_offset}
 * @param content: text content of annotation
 * @param visibility: ['public', 'private', 'author-only']
 * @param anonymity: ['anonymous', 'public']
 */
router.post('/source/:id', (req, res) => {
  Source.findByPk(req.params.id).then((source) =>
    Location.create({type: 'html'}).then((location) =>
      Promise.all([
        source.addLocation(location),
        HtmlLocation.create(req.body.range).then((htmlLocation) => htmlLocation.setLocation(location)),
        Thread.create().then((thread) =>
          Promise.all([
            Annotation.create({
              content: req.body.content, 
              visibility: req.body.visibility, 
              anonymity: req.body.anonymity
            }).then((annotation) => thread.setHeadAnnotation(annotation)),
            location.setThread(thread)
          ])
        )   
      ])
    )
  ).then(() => res.status(200));
});

/**
 * Make new reply for a given annotation
 * @name GET/api/annotations/source/:id
 * @param id: id of parent annotation
 * @param content: text content of annotation
 * @param visibility: ['public', 'private', 'author-only']
 * @param anonymity: ['anonymous', 'public']
 */
router.post('/reply/:id', (req, res)=>{
  Annotation.findByPk(req.params.id).then((parent) => 
    Annotation.create({
      content: req.body.content, 
      visibility: req.body.visibility, 
      anonymity: req.body.anonymity
    }).then((child) => parent.setChild(child))
  ).then(() => res.status(200));
});


function addRange(location){
  if(location.type == 'html_location'){
    return HtmlLocation.findOne({where:{location_id: location.id}})
      .then((htmlLocation)=>{
        location.range = htmlLocation;
        return location;
      });
  }
  else{
    return location;
  }
}

function addAnnotation(location){
  return location.getThread().then((thread) => thread.getAnnotation({
    include: [{all: true}]
  })
    .then((annotation) =>{
      annotation.range = location.range;
    }
  ));  
}


module.exports = router;