var Myo = require('myo');

var myMyo = Myo.create();

console.log('app.js');

// var events = ['fist', 'gyroscope'];

myMyo.on('fist', function(edge){
    console.log(new Date(), 'fist', edge);
});

myMyo.on('gyroscope', function(data){
    console.log(new Date(), 'gyroscope', Math.ceil(data.x),
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
