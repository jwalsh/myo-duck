var Myo = require('myo');
// var midi = require('midi');
var myMyo = Myo.create();
var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/'));

var server = http.createServer(app);
server.listen(port);

console.log('http server listening on %d', port);


// Send Myo activity to a web page
myoEvents = ['fist', 'thumb_to_pinky', 'connected', 'double_tap'];

myoEvents.map(function(e, i, c) {
  myMyo.on(e, function(evt) {
        console.log(new Date(), e, evt);
  });
});


// // Set up a new output for displaying sound
// var output = new midi.output();
// // This needs to be configured either for Bluetooth or network
// var portsCount = output.getPortCount();

// if (portsCount > 0) {
//   output.getPortName(0);
//   output.openPort(0);
//   myMyo.on('gyroscope', function(data) {
//     output.sendMessage([(data.x % 127), (data.y % 127), 1]);
//   });
// }
// // output.closePort();

var wss = new WebSocketServer({server: server});
console.log('websocket server created');

wss.on('connection', function(ws) {
  var id = setInterval(function() {
    ws.send(JSON.stringify(
          {
              'date': new Date(),
              'point': {
                  'x': Math.random() * 200 - 100,
                  'y': Math.random() * 200 - 100
              }
          }));
  }, 100);

  // Pass Myo gesture activity over to the web UI
  myMyo.on('gyroscope', function(data) {
        console.log(new Date(), 'gyroscope', data);
        ws.send(JSON.stringify(new Date()), data);
  });

  console.log('websocket connection open');

  ws.on('close', function() {
    console.log('websocket connection close');
    clearInterval(id);
  });
});
