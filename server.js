// HPDF Week 3 app. Created by Amol Venkataraman <abbunini@gmail.com>

var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');


var app = express();
app.use(morgan('combined'));
var request = require('sync-request');
app.use(bodyParser.urlencoded({ extended: true }));

// Returns a HTML template to get Startpoint and EndPoint.
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'HTML', 'textbox.html'));
});

app.post('/answer', function(req, res) {
    var fr = JSON.stringify(req.body.StartPoint)
    var to = JSON.stringify(req.body.EndPoint)
    var key = 'AIzaSyCSb_fvcY-0NwFZbJzVZdvNjoYb3wO9yzY' // The API key
    url = 'https://maps.googleapis.com/maps/api/directions/json?origin=' + fr + '&destination=' + to + '&key=' + key;
    var res1 = request('GET', url);
    var ans1 = JSON.parse(res1.body);
    var route = ans1.routes;
    var duration = route[0].legs[0].duration.text;
    var distance = route[0].legs[0].distance.text;
    var summary = route[0].summary;
    var step = route[0].legs[0].steps;
    var steps;
    for (k in step) {
        var instruction = step[k]["html_instructions"];
        instruction = instruction.replace(/<[^>]*>/g, "");
        var StepDistance = step[k]["distance"].text;
        var StepDuration = step[k]["duration"].text;
        console.log(StepDistance + StepDuration);
        steps += "Step " + k + ": " + " ("+ StepDistance +"/"+ StepDuration+")\n";
    }
    var result = "Total Duration: " + duration + "\n" + "Total Distance: " + distance + "\n\n" + steps;
    result = result.replace(/<[^>]*>/g, "");
    res.send(result);// Send the result
});

var port = 8080;
app.listen(port, function () {
  console.log(`Week 3 app listening on port ${port}!`);
});
