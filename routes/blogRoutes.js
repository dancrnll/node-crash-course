const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

// all blogs
router.get('/', blogController.blog_index);

// add blog to db
router.post('/', blogController.blog_create_post);

// show page to add new blog
router.get('/create', blogController.blog_create_get);

// display single blog
router.get('/:id', blogController.blog_details);

// delete single blog
router.delete('/:id', blogController.blog_delete);

module.exports = router;