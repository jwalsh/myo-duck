var Myo = require('myo');
var midi = require('midi');
var myMyo = Myo.create();
var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");
var app = express();
var port = process.env.PORT || 5000;

console.log('app.js starting');


app.use(express.static(__dirname + "/"));

var server = http.createServer(app);
server.listen(port);

console.log("http server listening on %d", port);

var wss = new WebSocketServer({server: server});
console.log("websocket server created");

wss.on("connection", function(ws) {
  var id = setInterval(function() {
      ws.send(JSON.stringify(new Date()), function() {  });
  }, 1000);

    console.log("websocket connection open");

  ws.on("close", function() {
      console.log("websocket connection close");
      clearInterval(id);
  });
});


myMyo.on('fist', function(edge){
    console.log(new Date(), 'fist', edge);
});

myMyo.on('gyroscope', function(data){
    console.log(new Date(), 'gyroscope',
                Math.ceil(data.x),
                Math.ceil(data.y));
});

myMyo.on('thumb_to_pinky', function(edge){
    console.log(new Date(), 'thumb_to_pinky', edge);
});

myMyo.on('connected', function (evt) {
    console.log(new Date(), 'connected', evt);
});

myMyo.on('double_tap', function (edge) {
    console.log(new Date(), 'double_tap', edge);
});



// Set up a new output.
var output = new midi.output();

// Count the available output ports.
var portsCount = output.getPortCount();

// Get the name of a specified output port.


// Open the first available output port.
if (portsCount > 0) {
    output.getPortName(0);
    output.openPort(0);
    myMyo.on('gyroscope', function(data){
        output.sendMessage([(data.x % 127),(data.y % 127),1]);
    });
}



// Close the port when done.
// output.closePort();
