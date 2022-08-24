let connection = null;

let setConnection = (con) => {
    connection = con;
}

let addBlog = (blogData) => {
    return new Promise((resolve, reject) => {

        let title = connection.escape(blogData.title);
        let snippet = connection.escape(blogData.snippet);
        let body = connection.escape(blogData.body);

        let sql = `INSERT INTO blog (title, snippet, body) VALUES (${title}, ${snippet}, ${body})`;
        connection.query(sql, function (error, results, fields) {
            if (error) {
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

let deleteBlogById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM blog WHERE id=${id}`, function (error, results, fields) {
            // if (error) throw error;
            if (error) {
                reject(error);
            } else {
                resolve('blog deleted');
            }
        });
    });
}

module.exports = {
    setConnection,
    addBlog,
    allBlogs,
    getBlogById,
    deleteBlogById,
};
