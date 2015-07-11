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
myoEvents = ['fist', 'thumb_to_pinky', 'connected', 'double_tap',
             'wave_out', 'unlock', 'lock', 'double_tap'];

myoEvents.map(function(e, i, c) {
  myMyo.on(e, function(evt) {
      console.log(new Date(), e, evt);
      myMyo.vibrate('short').vibrate('short');
  });
});


myMyo.on('fist', function(val){
    console.log('zeroOrientation [fist]');
    myMyo.zeroOrientation();
});

myMyo.on('bluetooth_strength', function(val){
    console.log('Such strength', val);
});
myMyo.requestBluetoothStrength();

var wss = new WebSocketServer({server: server});
console.log('websocket server created');

wss.on('connection', function(ws) {

  console.log('websocket connection open');

  // Pass Myo gesture activity over to the web UI
  myMyo.on('gyroscope', function(data) {
        // console.log(new Date(), 'gyroscope', data);

		ws.send(JSON.stringify(
          {
              'date': new Date(),
              'point': data
          }));
  });

  ws.on('close', function() {
    console.log('websocket connection close');
    clearInterval(id);
  });
});
