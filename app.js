const express = require('express');

// express app
const app = express();

// register vie wengine
app.set('view engine', 'ejs');
//app.set('views', 'views');  // the views directory is the default for ejs

app.use(express.static(__dirname + '/public'));

// listen for requests
app.listen(3000);

app.use((req, res, next) => {
    console.log('new request name:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});

app.use((req, res, next) => {
    console.log('in the next middleware:');
    next();
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