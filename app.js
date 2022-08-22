const express = require('express');

// express app
const app = express();

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    // res.write('<p>home page</p>');
    // res.end();
    res.send('<p>home page</p>');
});