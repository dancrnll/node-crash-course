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
app.use(morgan('dev')); // log request

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs', (req, res) => {
    (async () => {
        try {
            const list = await blog.allBlogs(-1);
            res.render('index', { title: 'All Blogs', blogs: list });
        } catch (err) {
            console.log(err);
        }
    })();
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a New Blog' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});