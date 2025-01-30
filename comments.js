// Create web server
// Load the express library
var express = require('express');
// Create a new web server
var app = express();
// Load the body-parser library
var bodyParser = require('body-parser');
// Load the nedb library
var Datastore = require('nedb');
// Load the nedb library
var db = new Datastore({ filename: 'comments.db', autoload: true });
// Set up body-parser to parse JSON and HTML form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files from the 'public' directory
app.use(express.static('public'));
// Create a new comment
app.post('/comment', function (req, res) {
    // Get the comment text
    var comment = req.body.comment;
    // Create a new comment object
    var newComment = { text: comment };
    // Insert the new comment into the database
    db.insert(newComment, function (err, comment) {
        // Send a response back to the client
        res.send(comment);
    });
});
// Get all comments
app.get('/comments', function (req, res) {
    // Find all comments in the database
    db.find({}, function (err, comments) {
        // Send a response back to the client
        res.send(comments);
    });
});
// Start the web server on port 3000
app.listen(3000, function () {
    console.log('Server is listening on port 3000');
});