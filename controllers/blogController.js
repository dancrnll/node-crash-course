const blog = require('../models/blog');

// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
    (async () => {
        try {
            const list = await blog.allBlogs(-1);
            res.render('blogs/index', { title: 'All Blogs', blogs: list });
        } catch (err) {
            console.log(err);
            res.end();
        }
    })();
}


const blog_details = (req, res) => {
    const id = req.params.id;
    (async () => {
        try {
            const blogEntry = await blog.getBlogById(id);
            res.render('blogs/details', { title: 'Blog Details', blog: blogEntry });
        } catch (err) {
            console.log(err);
            res.end();
        }
    })();
}


const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create a New Blog' });
}


const blog_create_post = (req, res) => {
    (async () => {
        try {
            const msg = await blog.addBlog(req.body);
            res.redirect('/blogs');
        } catch (err) {
            console.log(err);
            res.end();
        }
    })();
}


const blog_delete = (req, res) => {
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
}


module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
}