mysql = require('mysql');

// connect to mysql db
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ccprocks',
    database: 'node_crash_course'
});

let connectToDb = (app) => {
    connection.connect(function (err) {
        if (err) {
            return console.error('error: ' + err.message);
        }

        console.log('Connected to the MySQL server.');

        // listen for requests
        app.listen(3000);
    });
}

let addBlog = (blogData) => {
    connection.query(`INSERT INTO blog (title, snippet, body) VALUES ('${blogData.title}', '${blogData.snippet}', '${blogData.body}')`, function (error, results, fields) {
        // if (error) throw error;
        if (error) console.log(error);
      });
}

let allBlogs = (descOrder, callBack) => {
    let sqlStr = `SELECT id, title, snippet, body FROM blog`;
    if (descOrder < 0) {
        sqlStr += ` ORDER BY createdTS DESC`;
    }
    connection.query(sqlStr, function (error, results, fields) {
        // if (error) throw error;
        if (error) console.log(error);
        let list = [];
        results.forEach(r => {
            let id = r.id;
            let title = r.title;
            let snippet = r.snippet;
            let body = r.body;
            list.push({id, title, snippet, body});
        });
        callBack(list);
      });

}

let getBlogById = (id, callBack) => {
    connection.query(`SELECT title, snippet, body FROM blog WHERE id=${id}`, function (error, results, fields) {
        // if (error) throw error;
        if (error) console.log(error);
        let r = results[0];
        let id = r.id;
        let title = r.title;
        let snippet = r.snippet;
        let body = r.body;
        callBack({id, title, snippet, body});
      });

}


module.exports = {
    connectToDb,
    addBlog,
    allBlogs,
    getBlogById
};
