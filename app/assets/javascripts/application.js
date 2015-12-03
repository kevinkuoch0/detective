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

var w = canvas.width = 800;
    h = canvas.height = 340;
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
  // c.font="20px Betty Noir Regular";
  // c.fillStyle = "white";
  // c.fillText("Start",500,200);

  // c.font="20px Betty Noir Regular";
  // c.fillStyle = "white";
  // c.fillText("Credits",500,250);

  while(particles.length > 500) particles.shift();

  for(var i = 0; i < particles.length; i++)
  {
    particles[i].update();
  }
};



setInterval(draw, 3500/60);
 // ***This comment ends the above code at line 67***

$(document).ready(function() {
  console.log("document.ready");
  $("canvas").fadeIn(3000);
  $("nav").fadeIn(3000);
  $("#noir-song").get(0).play();
  //click function for the credits
  $("#credits").on("click",function() {
    $('#bottom-bar').fadeIn(0);
    $("canvas").fadeOut(1000);
    $("nav").fadeOut(1000);
    $("#back-div").fadeIn(1000);
    $("#credits-bg").fadeIn(1000);
    $('#credits-list').show().animate({top:"7%"}, 15000);
    $("#back-to-menu").on("click", function() {
      $("canvas").fadeIn(3000);
      $("nav").fadeIn(3000);
      $("#credits-bg").fadeOut(3000);
      $('#back-div').fadeOut(3000);
      $('#credits-list').stop().animate({top:"100%"}, 0).fadeOut(3000, function(){ 
        $('#bottom-bar').fadeOut(3000);
      });
     });
  });  //end of the credits
  //Start button for game
  $("#start").on("click", function() {
    $("canvas").fadeOut(1000);
    $("#start").fadeOut(1000);
    $("#credits").fadeOut(1000);
    $("#quote-container").fadeIn(5000);
    $("#quote-container").fadeOut(5000);
    $("#alley-sound").delay(2000).get(0).play();
    $("#bootswalking").delay(2000).get(0).play();
    $("#alleyway-bg").delay(10000).fadeIn(4000, function() {
      $("#alleyway-bg").fadeTo(500, 0.1);
      $({blurRadius: 0}).animate({blurRadius: 10}, {
        duration: 500,
        easing: 'swing', // or "linear"
                        // use jQuery UI or Easing plugin for more options
        step: function() {
          console.log(this.blurRadius);
          $('#alleyway-bg').css({
            "-webkit-filter": "blur("+this.blurRadius+"px)",
            "filter": "blur("+this.blurRadius+"px)"
          });
        }
      });
      $("#typing-container").show();
      $("#type-sound").get(0).play();
      $("#narration1").delay(2000).fadeIn(3000); //first text fading in
      $("#narration1").click(function() { //start of the click narration
        $("#narration1").fadeOut(1000, function() {  //first text fading out
          $("#narration2").fadeIn(1000);  //second text fading in
          $("#narration2").click(function() {  // second text fading out 
            $("#narration2").fadeOut(1000, function() { //third fading in
              $("#narration3").fadeIn(1000);
              $("#narration3").on("click", function() {
                $("#narration3").fadeOut(1000);
                $("#typing-container").fadeOut(1000);
                $("#narration-container").fadeOut(1000); //fading out narration container !! where is it appearing
                $("#alleyway-bg").fadeOut(4000); //Fading out the first scene
                $("#officenoise-sound").get(0).play();
                $("#office-bg").fadeIn(6000, function() {
                  $("#office-bg").fadeTo(500, 0.1);
                  $({blurRadius: 0}).animate({blurRadius: 10}, {
                    duration: 500,
                    easing: 'swing', // or "linear"
                                    // use jQuery UI or Easing plugin for more options
                    step: function() {
                      console.log(this.blurRadius);
                      $('#office-bg').css({
                        "-webkit-filter": "blur("+this.blurRadius+"px)",
                        "filter": "blur("+this.blurRadius+"px)"
                      });
                    }
                  });
                  $("#typing-container2").show();
                  $("#type-sound").get(0).play();
                  $("#typing-container2").delay(3000).fadeOut(1000); //Either this is faded or the text get smaller. It interferes with the text
                  $("#office-narration1").delay(2000).fadeIn(1000,function(){
                    $("#office-narration1").on("click", function () { //start of office narration function
                      $("#office-narration1").fadeOut(1000, function() {
                        $("#office-narration2").fadeIn(1000); 
                        $("#office-narration2").on("click", function () {                         
                          $("#office-narration2").fadeOut(1000, function() {
                            $("#office-narration3").fadeIn(1000);                           
                            $("#office-narration3").on("click", function (){                              
                              $("#office-narration3").fadeOut(1000, function() {
                                $("#office-narration4").fadeIn(1000);
                                $("#office-narration4").on("click", function (){
                                  $("#office-narration4").fadeOut(1000, function(){
                                    $("#office-narration5").fadeIn(1000);
                                    $("#office-narration5").on("click",function(){
                                      $("#office-narration5").fadeOut(1000);                              
                                      $("#typing-container2").fadeOut(1000);
                                      $("#office-bg").fadeOut(4000); // Start of phone-bg scene
                                      $("#phonenoise-sound").get(0).play();
                                      $("#phone-bg").fadeIn(8000, function() {
                                        $("#phone-bg").fadeTo(500, 0.1);
                                        $({blurRadius: 0}).animate({blurRadius: 10}, {
                                          duration: 500,
                                          easing: 'swing', // or "linear"
                                                          // use jQuery UI or Easing plugin for more options
                                          step: function() {
                                            console.log(this.blurRadius);
                                            $('#phone-bg').css({
                                              "-webkit-filter": "blur("+this.blurRadius+"px)",
                                              "filter": "blur("+this.blurRadius+"px)"
                                            });
                                          }
                                        });
                                        $("#type-sound").get(0).play();
                                        $("#typing-container3").show(function() {
                                          $('#phone-narration1').fadeIn(1000);
                                          $('#phone-narration1').on("click", function(){
                                            $('#phone-narration1').fadeOut(1000,function(){
                                              $('#phone-narration2').fadeIn(1000);
                                              $('#phone-narration2').on("click", function(){
                                                $('#phone-narration2').fadeOut(1000,function(){
                                                  $('#phone-narration3').fadeIn(1000);
                                                  $('#phone-narration3').on("click", phonenarration3click);
                                                });
                                              });
                                            });     
                                          });
                                        });
                                      }); // end of the blur function
                                    });
                                  });
                                });
                              });
                            }); //end of office narration5 CLICK function
                          }); //end of office narration4 CLICK function
                        }); //end of office narration3 CLICK function 
                      }); //end of office narration2 CLICK function
                    }); //end of office narration1 CLICK function
                  });
                }); // end of the blur function
              }); // Ending part of the office scene and below is start of phone-scene
            });
          }); // second text fading out
        });   //end of fadeout out first click 
      }); //end of first click narration bubble
    }); // transition to the office scene below, above is first scene ending
  }); //ending for start function

  // music toggle next 11 lines
  $("#sound-off").on("click", function() {
    $("#sound-off").hide();
    $("#sound-on").show();
    $("#noir-song").get(0).pause();
    $("#noir-song").get(0).currentTime = 0;
  });
  $("#sound-on").on("click", function() {
    $("#sound-on").hide();
    $("#sound-off").show();
    $("#noir-song").get(0).play();
  });

}); // End of the loading document







function phonenarration3click(){
  $('#phone-narration3').fadeOut(1000, phonenarration3fade);
}





function phonenarration3fade(){
  $('#phone-narration4').fadeIn(1000);
  $('#phone-narration4').on("click", phonebgclick);
}





function phonebgclick(){
  $('#phone-narration4').fadeOut(1000, phonenarration4fade);
}




function phonenarration4fade(){
  $('#phone-narration5').fadeIn(1000);
  $("#phone-narration5").on("click", phonestart); //ending of the gamestart scene
}



function phonestart(){
  $("#typing-container3").fadeOut(100);
  $('#phone-narration5').fadeOut(1000,gamestart);
}



function gamestart(){
  $('#phone-bg').fadeOut(2500); //start of the gamestart scene
  $("#finaldoor").get(0).play();
  $("#gamestart-bg").fadeIn(2500, function(){
    $("#gamestart-bg").fadeTo(300, 0.1);
    $({blurRadius: 0}).animate({blurRadius: 10}, {
      duration: 300,
      easing: 'swing', // or "linear"
                      // use jQuery UI or Easing plugin for more options
      step: function() {
        console.log(this.blurRadius);
        $('#alleyway-bg').css({
          "-webkit-filter": "blur("+this.blurRadius+"px)",
          "filter": "blur("+this.blurRadius+"px)"
        });
      }
    });
  $("#typing-container4").show();
  $("#type-sound").get(0).play();
  $("#start-narration1").delay(2000).fadeIn(1000); //first text fading in
  $("#start-narration1").on("click",function(){
    $("#start-narration1").fadeOut(1000, function(){
      $("#start-narration2").fadeIn(1000);
    $("#start-narration2").on("click", function(){
      $("#start-narration2").fadeOut(1000);
      $("#badge1").fadeIn(1000);
      $("#badge2").fadeIn(1000);
      $("#badge3").fadeIn(1000);
    });
      });
    });
  });
}




