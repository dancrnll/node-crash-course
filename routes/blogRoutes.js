const express = require('express');
const blog = require('../models/blog');

const router = express.Router();

// all blogs
router.get('/', (req, res) => {
    (async () => {
        try {
            const list = await blog.allBlogs(-1);
            res.render('index', { title: 'All Blogs', blogs: list });
        } catch (err) {
            console.log(errouterr);
            res.end();
        }
    })();
});

// add blog to db
router.post('/', (req, res) => {
    //console.log(req.body);
    (async () => {
        try {
            const msg = await blog.addBlog(req.body);
            res.redirect('/blogs');
        } catch (err) {
            console.log(err);
            res.end();
        }
    })();
});

// show page to add new blog
router.get('/create', (req, res) => {
    res.render('create', { title: 'Create a New Blog' });
});

// display single blog
router.get('/:id', (req, res) => {
    const id = req.params.id;
    (async () => {
        try {
            const blogEntry = await blog.getBlogById(id);
            res.render('details', { title: 'Blog Details', blog: blogEntry });
        } catch (err) {
            console.log(err);
            res.end();
        }
    })();
});

// delete single blog
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    (async () => {
        try {
            const blogEntry = await blog.deleteBlogById(id);
            res.json({ redirect: '/blogs' });
        } catch (err) {
            console.log(err);
            res.end();
        }
    })();
});

module.exports = router;