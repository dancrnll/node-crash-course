const express = require('express');
const morgan = require('morgan');
const dbConnect = require('./dbConnect.js');
const blog = require('./models/blog.js');
const blogRoutes = require('./routes/blogRoutes.js');

// express app
const app = express();

// connect to mysql db
dbConnect.connectToDb().then((message) => {
    console.log(message);
    blog.setConnection(dbConnect.connection);

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
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});