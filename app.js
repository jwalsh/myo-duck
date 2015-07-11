var Myo = require('myo');

var myMyo = Myo.create();

console.log('app.js running');

// var events = ['fist', 'gyroscope'];

myMyo.on('fist', function(edge){
    console.log('fist');
});

myMyo.on('gyroscope', function(data){
    console.log('gyroscope');
});

myMyo.on('thumb_to_pinky', function(edge){
    console.log('thumb_to_pinky');
});

myMyo.on('connected', function () {
    console.log('connected');
});

myMyo.on('double_tap', function (edge) {
    console.log('double_tap');
});
