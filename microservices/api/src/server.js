var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(morgan('combined'));
var request = require('sync-request');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/input', function (req, res) {
  res.sendFile(path.join(__dirname, 'HTML', 'textbox.html'));
});
//Also Task 7 (Shows the contents of the textbox)
app.post('/answer', function(req, res) {
    var fr = JSON.stringify(req.body.StartPoint)
    var to = JSON.stringify(req.body.EndPoint)
    var key = 'AIzaSyCSb_fvcY-0NwFZbJzVZdvNjoYb3wO9yzY'
    url = 'https://maps.googleapis.com/maps/api/directions/json?origin=' + fr + '&destination=' + to + '&key=' + key;
    var res1 = request('GET', url);
    var ans1 = JSON.parse(res1.body);
    res.send(JSON.parse(ans1));
    console.log(ans1)
});



var port = 8080;
app.listen(port, function () {
  console.log(`Week 3 app listening on port ${port}!`);
});
