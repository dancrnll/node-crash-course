const express = require('express');
const morgan = require('morgan');

// express app
const app = express();

// register vie wengine
app.set('view engine', 'ejs');
//app.set('views', 'views');  // the views directory is the default for ejs

// listen for requests
app.listen(3000);

// middleware & statis files
app.use(express.static('public'));
app.use(morgan('dev')); // log request

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