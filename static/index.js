var canvas = document.getElementById('gestures');
var ctx = canvas.getContext('2d');
var background = new Image();
background.src = 'static/channel.png';
background.onload = function() {
  ctx.drawImage(background, 0, 0);
};
var scores = document.getElementById('scores');
var score = 0;

var duck = new Image();
duck.src = 'static/duck-icon.png';
var kiwi = new Image();
kiwi.src = 'static/kiwi-icon.png';

var host = location.origin.replace(/^http/, 'ws');
var ws = new WebSocket(host);
ws.onmessage = function(event) {
  var output = event.data;
  var gesture = JSON.parse(event.data);
  var x = 2 * (100 + gesture.point.x);
  var y = 2 * (100 + gesture.point.y);
  document.querySelector('#pings').innerHTML = output;
  var inWater = (function(point) {
    // Water boundry conditions for the channel
    return point.y > -.1 * point.x + 180 &&
        point.y < 440 + -.6 * point.x;
  }({x: x, y: y}));
  var bird = kiwi;
  if (inWater) {
    bird = duck;
  }
  ctx.drawImage(bird,
      x,
      y);
  score += inWater ? 1 : -1;
  console.log(score, inWater);
  scores.innerHTML = 'inWater: ' + inWater + ' : ' + score;
};
