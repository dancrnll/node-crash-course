const express = require('express');
const morgan = require('morgan');
//const mysql = require('mysql');
const blogDb = require('./blogDb.js');

// express app
const app = express();

// connect to mysql db
blogDb.connectToDb(app);

// register vie wengine
app.set('view engine', 'ejs');
//app.set('views', 'views');  // the views directory is the default for ejs

// middleware & status files
app.use(express.static('public'));
app.use(morgan('dev')); // log request

app.get('/add-blog', (req, res) => {
    blogDb.addBlog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });
    res.end();
});

app.get('/all-blogs', (req, res) => {
    blogDb.allBlogs((list) => {
        res.send(list);
    });
});

app.get('/single-blog', (req, res) => {
    blogDb.getBlogById(1, (blogEntry) => {
        res.send(blogEntry);
    });
});

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Loren ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Loren ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Loren ipsum dolor sit amet consectetur'},
    ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/BLOGS/CREATE', (req, res) => {
    res.render('create', { title: 'Create a New Blog' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});