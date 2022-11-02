const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');
const multer  = require('multer');
const cookieParser = require('cookie-parser')

app.use(express.static('public'));
app.use(cookieParser())

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

//app.use(multer({ dest: '/tmp/'}));

app.get('/', function (req, res) {
    res.send("Hello World");
})

// app.get('/', function(req, res) {
//     console.log("Cookies: ", req.cookies)
//  })

// display index page
app.get('/index.htm', function (req, res) {
    res.sendFile(__dirname + "/" + "index.htm");
})

// display index page
app.get('/fileUpload.htm', function (req, res) {
    res.sendFile(__dirname + "/" + "fileUpload.htm");
})

// app.get('/:id', function (req, res) {
//     res.send('Get all');
// })

// post data from index page
app.post('/process_post', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

// app.patch('/:id', function (req, res) {
//     res.send('Update');
// })

// app.delete('/:id', function (req, res) {
//     res.send('Delete');
// })

app.post('/file_upload', function (req, res) {
    console.log("file upload", req.files);
    console.log(req.files.file.name);
    console.log(req.files.file.path);
    console.log(req.files.file.type);
    var file = __dirname + "/" + req.files.file.name;

    fs.readFile(req.files.file.path, function (err, data) {
        fs.writeFile(file, data, function (err) {
            if (err) {
                console.log(err);
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: req.files.file.name
                };
            }

            console.log(response);
            res.end(JSON.stringify(response));
        });
    });
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("App listening at http://%s:%s", host, port)
})