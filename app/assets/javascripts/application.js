// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .



// *** This is for the particle effect and detective background


// ***This comment starts at line 4, code underneath begins at line 5***
var canvas = document.createElement('canvas'); 
var w = canvas.width = 800,
    h = canvas.height = 400;
var c = canvas.getContext('2d');

var img = new Image();
img.src = 'http://oi41.tinypic.com/4i2aso.jpg';

var background = new Image();
background.src = "/assets/title(1).jpg";



var position = {x : 410, y : 238};

document.body.appendChild(canvas);

var particles = [];
var random = function(min, max){
  return Math.random()*(max-min)*min;
};

function Particle(x, y){
  this.x = x;
  this.y = y;
  this.velY = -2;
  this.velX = (random(1, 10)-5)/10;
  this.size = random(3, 5)/10;
  this.alpha = 1;
  this.update = function(){
    this.y += this.velY;
    this.x += this.velX;
    this.velY *= 0.99;
    if(this.alpha < 0){this.alpha = 0;}
    c.globalAlpha = this.alpha;
    c.save();
    c.translate(this.x, this.y);
    c.scale(this.size, this.size);
    c.drawImage(img, -img.width/2, -img.height/2);
    c.restore();
    this.alpha *= 0.96;
    this.size += 0.02;//  
  };
}

var draw = function(){
  var p = new Particle(position.x, position.y);
  particles.push(p);

  // draw the background image before you draw the particles
  c.drawImage(background,160,0);
  c.font="20px Betty Noir Regular";
  c.fillStyle = "white";
  c.fillText("Start",500,200);

  c.font="20px Betty Noir Regular";
  c.fillStyle = "white";
  c.fillText("Credits",500,250);

  while(particles.length > 500) particles.shift();

  for(var i = 0; i < particles.length; i++)
  {
    particles[i].update();
  }
};



setInterval(draw, 3500/60);
 // ***This comment ends the above code at line 67***





$(document).ready(function() {
 $("canvas").fadeIn(7000);
});


$(document).ready(function() {
    $("#noir-song").get(0).play();
});

