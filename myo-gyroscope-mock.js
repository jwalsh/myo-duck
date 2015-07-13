var exports = module.exports = {};

var _ = require('lodash');

// Purpose: rotate a point around the surface of a sphere to emulate an
// object moving through space with a gyroscope

var mock = {
    r: 80, // meters
    origin:  {
        x: 0,
        y: 0,
        z: 5
    }, // meters
    rotationTime: 453 // milliseconds
};

var position = function(t, r, origin, rotationTime) {
    // console.log('position()', t, r, origin, rotationTime);;
    var jitter = 5 * Math.random();
    var scale = (.6 * t / rotationTime);
    var angle =  (t / rotationTime) % (2 * Math.PI);
    var zangle =  (t / rotationTime) % (2 * Math.PI);
    var z = parseFloat((origin.z + jitter +
                        r * Math.sin(scale + angle)).toPrecision(6));
    // Scaled height of the cross-section
    var h = r * Math.sin(scale + angle);
    var x = parseFloat((origin.x + jitter + h * Math.cos(angle)).toPrecision(6));
    var y = parseFloat((origin.y + jitter + h * Math.sin(angle)).toPrecision(6));
    console.log(t, angle, z, h, x, y);
    var result = {
        x: x,
        y: y,
        z: z
    };

    // console.log('position() result: ', result);
    return result;
};

var mockPosition = (function(mock) {
    return function(t) {
        return position(t,mock.r, mock.origin, mock.rotationTime);
    };
})(mock);
module.exports.mockPosition = mockPosition;


var expect = function(name, actual, expected) {
    var outcome = _.isEqual(actual, expected);
    console.log(name + ' pass: ', outcome, actual, expected);
};

// Validate expect
// expect('int', 1, 1);
// expect('object', {x: 1}, {x: 1});
// Test harness
// We go around the sphere in one second
// expect('0', mockPosition(0), {x: 1.5, y: 1.5, z: 3});
// expect('1000', mockPosition(1000), {x: 1.5, y: 1.5, z: 3});
// expect('500', mockPosition(500), {x: 1.5, y: 1.5, z: 0});
// expect('250', mockPosition(250), {x: 1.5, y: 3, z: 1.5});
// expect('750', mockPosition(750), {x: 1.5, y: 0, z: 1.5});
// expect('5750', mockPosition(5750), {x: 1.5, y: 0, z: 1.5});
