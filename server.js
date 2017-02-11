// modules =================================================
var express         = require('express');
var app             = express();

// set the static files location
app.use(express.static(__dirname));

app.get('*', function(req, res) {
    res.sendfile('index.html'); // load our public/index.html file
});

// start app ===============================================
var port = 6969;
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;