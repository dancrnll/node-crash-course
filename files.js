const fs = require('fs');

// reading files

// (this method is asynchronous)
// fs.readFile('./docs/blog12.txt', (err, data) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(data.toString());
// });

//console.log('last line, but output first');

// writing files
// (this method is asynchronous)
// fs.writeFile('./docs/blog1.txt', 'hello, world', () => {
//     console.log('file was written');
// });

// fs.writeFile('./docs/blog2.txt', 'hello, world', () => {
//     console.log('file was written');
// });

// directories

// if (!fs.existsSync('./assets')) {
//     // (this method is asynchronous)
//     fs.mkdir('./assets', (err) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log('folder created');
//     });
// } else {
//     fs.rmdir('./assets', (err) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log('folder deleted');
//     });
// }

// deleting files
if (fs.existsSync('./docs/deleteme.txt')) {
   // (this method is asynchronous)
  fs.unlink('./docs/deleteme.txt', (err) => {
    if (err) {
        console.log(err);
    }
    console.log('file deleted');
  });
}