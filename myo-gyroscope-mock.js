var _ = require('lodash');

// Purpose: rotate a point around the surface of a sphere to emulate an
// object moving through space with a gyroscope

var mock = {
    r: 1.5, // meters
    origin:  {
        x: 1.5,
        y: 1.5
    }, // meters
    rotationTime: 1000, // milliseconds
    interval: 250, // milliseconds; sb 30ms
    offsetPosition: 0 * Math.PI // degrees
};
// var timeStart = 0; // milliseconds

var position = function(t, r, origin, rotationTime) {
    // console.log('position()', t, r, origin, rotationTime);
    var angle =  2 * Math.PI * (t / rotationTime);
    var result = {
        x: origin.x + r * Math.cos(angle),
        y: origin.y + r * Math.sin(angle)
    };
    // console.log('position() result: ', result);
    return result;
};

var mockPosition = (function(mock) {
    return function(t) {
        return position(t,mock.r, mock.origin, mock.rotationTime);
    };
})(mock);

var expect = function(name, actual, expected) {
    var outcome = _.isEqual(actual, expected);
    console.log(name + ' pass: ', outcome, actual, expected);
};
// Validate expect
expect('int', 1, 1);
expect('object', {x: 1}, {x: 1});

// Test harness
expect('0', mockPosition(0), {x: 3, y: 1.5});
expect('1000', mockPosition(1000), {x: 3, y: 1.5});

// Test run for two seconds
// for (var i = 0; i < 2000; i+= 30) {
//     console.log(position(t));
// }

// var gyroscope = setInterval(position(), interval);
