var Myo = require('myo');


var midi = require('midi');

var myMyo = Myo.create();

console.log('app.js running');

// var events = ['fist', 'gyroscope'];

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
var o = output.getPortCount();

// Get the name of a specified output port.
output.getPortName(0);

// Open the first available output port.
output.openPort(0);

myMyo.on('gyroscope', function(data){
    output.sendMessage([(data.x % 127),(data.y % 127),1]);
});

// Close the port when done.
output.closePort();
