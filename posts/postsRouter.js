//import express
const express = require('express');

//import data
const posts = require('../data/db');

//create router
const router = express.Router();

// ***** enpoints ***** //

//base route
router.get('/', (req, res) => {
  posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "The posts information could not be retrieved."
      })
    })
});

//get post by id
router.get('/:id', (req, res) => {
  posts.findById(req.params.id)
    .then(post => {
      if (post.id !== []) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        })
      }//end if/else
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "The post information could not be retrieved."
      })
    });
});

//get comments associated with a post by its ID
router.get('/:id/comments', (req, res) => {
  posts.findPostComments(req.params.id)
    .then(post => {
      if (post.length) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        })
      }//end if/else
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "The comments information could not be retrieved."
      })
    });
});

//post/add to 'posts'
router.post('/', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    })
  } else {
    posts.insert(req.body)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: "There was an error while saving the post to the database"
        })
      })
  }//end if
});

//post a comment to a specific post by its ID
router.post('/:id/comments', (req, res) => {
  //if there's no text`
  if(!req.body.text){
    res.status(400).json({
      errorMessage: "Please provide text for the comment."
    })
  }//end if
  posts.insertComment(req.body)
    .then(post => {
      // if there's no id match
      if (!post.id) {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exist."
        })
      } else {
        //success!
        res.status(201).json(post);
      }//end if else
    })
    .catch(error => {
      //DB error
      console.log(error);
      res.status(500).json({
        message: "There was an error while saving the comment to the database"
      })
    });
});

//delete a post by its ID
router.delete('/:id', (req, res) => {
  posts.remove(req.params.id)
    .then(post => {
      if (post) {
        //if that id to delete was found in DB
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "The post could not be removed"
      })
    })
});

//update (put) a post
router.put('/:id', (req, res) => {
  //if no information sent to change: title or text
  if (!req.body.title || !req.body.contents) {
    res.status(404).json({
      errorMessage: "Please provide title and/or contents for the post."
    })
  }//end if
  posts.update(req.params.id, req.body)
    .then(post => {
      if (post !== 1) {
        //returns a '1' if successful
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      } else {
        res.status(200).json({ post })
      }//end if/else 
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be modified."
      })
    })
})

//eport module
module.exports = router;
