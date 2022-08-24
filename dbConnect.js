const mysql = require('mysql');

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

module.exports = {
    connection,
    connectToDb
}