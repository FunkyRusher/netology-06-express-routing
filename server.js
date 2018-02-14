var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
    res.status(200).send('Hello, Express.js');
});

app.get('/hello', function (req, res) {
    res.status(200).send('Hello stranger!');
});

app.get('/hello/:name', function (req, res) {
    res.status(200).send('Hello, ' + req.params.name + '!');
});

app.all('/sub/*', function(req, res) {
    res.send('You requested URI: ' + req.originalUrl);
});

/*app.get('/post/helper', function(req, res) {
    res.send('<form action="/post" method="post" style="text-align: center"><textarea name="text"></textarea><br><br><button>Let\'s Do It!</button></form><br><br><form action="/post" method="post" style="text-align: center"><button>Don\'t Do It!</button></form>');
});*/

app.post('/post', function(req, res, next) {
    if (req.get("Key")) {
        next();
    } else {
        res.sendStatus(401);
    }
}, function(req, res) {
    if (Object.keys(req.body).length !== 0) {
        res.json(req.body);
    } else {
        res.sendStatus(404);
    }
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});