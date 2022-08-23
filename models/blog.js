mysql = require('mysql');

// connect to mysql db
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ccprocks',
    database: 'node_crash_course'
});

let connectToDb = () => {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                reject(err);
            } else {
                resolve('Connected to the MySQL server');
            }
        });
    });
}

let addBlog = (blogData) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO blog (title, snippet, body) VALUES ('${blogData.title}', '${blogData.snippet}', '${blogData.body}')`, function (error, results, fields) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve('blog added');
            }
        });
    });
}

let allBlogs = (descOrder) => {
    return new Promise((resolve, reject) => {
        let sqlStr = `SELECT id, title, snippet, body FROM blog`;
        if (descOrder < 0) {
            sqlStr += ` ORDER BY createdTS DESC`;
        }
        connection.query(sqlStr, function (error, results, fields) {
            // if (error) throw error;
            if (error) {
                reject(error);
            } else {
                let list = [];
                results.forEach(r => {
                    let id = r.id;
                    let title = r.title;
                    let snippet = r.snippet;
                    let body = r.body;
                    list.push({ id, title, snippet, body });
                });
                resolve(list);
            }
        });
    });
}

let getBlogById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id, title, snippet, body FROM blog WHERE id=${id}`, function (error, results, fields) {
            // if (error) throw error;
            if (error) console.log(error);
            if (error) {
                reject(error);
            } else {
                let r = results[0];
                let id = r.id;
                let title = r.title;
                let snippet = r.snippet;
                let body = r.body;
                resolve({ id, title, snippet, body });
            }
        });
    });
}

module.exports = {
    connectToDb,
    addBlog,
    allBlogs,
    getBlogById,
};
