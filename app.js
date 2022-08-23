const express = require('express');
const morgan = require('morgan');
//const mysql = require('mysql');
const blog = require('./models/blog.js');

// express app
const app = express();

// connect to mysql db
blog.connectToDb(app);

// register vie wengine
app.set('view engine', 'ejs');
//app.set('views', 'views');  // the views directory is the default for ejs

// middleware & status files
app.use(express.static('public'));
app.use(morgan('dev')); // log request

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.get('/blogs', (req, res) => {
    blog.allBlogs(-1, (list) => {
        res.render('index', { title: 'All Blogs', blogs: list } );
    });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a New Blog' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});