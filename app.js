const express = require('express');

// express app
const app = express();

// register vie wengine
app.set('view engine', 'ejs');
//app.set('views', 'views');  // the views directory is the default for ejs

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/BLOGS/CREATE', (req, res) => {
    res.render('create');
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404');
});