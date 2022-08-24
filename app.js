const express = require('express');
const morgan = require('morgan');
const blog = require('./models/blog.js');

// express app
const app = express();

// connect to mysql db
blog.connectToDb().then((message) => {
    console.log(message);
    // now that we have a db connection, listen for requests
    app.listen(3000);
}).catch((err) => {
    console.log(err);
});

// register vie wengine
app.set('view engine', 'ejs');
//app.set('views', 'views');  // the views directory is the default for ejs

// middleware & status files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // log request

// routes

// home page (the blogs page is the home page)
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// about page
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.get('/blogs', (req, res) => {
    (async () => {
        try {
            const list = await blog.allBlogs(-1);
            res.render('index', { title: 'All Blogs', blogs: list });
        } catch (err) {
            console.log(err);
            res.end();
        }
    })();
});

// display all blogs
app.post('/blogs', (req, res) => {
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

// add new blog
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a New Blog' });
});

// display single blog
app.get('/blogs/:id', (req, res) => {
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
app.delete('/blogs/:id', (req, res) => {
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

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});