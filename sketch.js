var balloon,balloonImage1,balloonImage2;
var database;
var position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("HotAirBallon01.png");
   balloonImage2=loadAnimation("HotAirBallon01.png","HotAirBallon01.png",
   "HotAirBallon01.png","HotAirBallon02.png","HotAirBallon02.png",
   "HotAirBallon02.png","HotAirBallon03.png","HotAirBallon03.png","HotAirBallon03.png");
  }

//Function to set initial environment
function setup() {

   database=firebase.database();

  createCanvas(1500,700);

  balloon=createSprite(250,200,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonPosition=database.ref('balloon/position');
  balloonPosition.on("value",readPosition, showError);



  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x - 10;
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=0.3; 
}
else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x + 10;
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=0.3; 
}
else if(keyDown(UP_ARROW)){
    balloon.y = balloon.y - 10;
    balloon.addAnimation("hotAirBalloon",balloonImage1);
    balloon.scale=0.3; 
}
else if(keyDown(DOWN_ARROW)){
  balloon.y = balloon.y + 10;
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.3; 
}

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

 function updatePosition(x,y){
   database.ref('balloon/position').set({
     'x': position.x+x ,
     'y': position.y+y
   })
 }


//CHOOSE THE CORRECT READHEIGHT FUNCTION
//function readPosition(data){
   //balloon.x = position.x;
   //balloon.y = position.y;
 //}

 function readPosition(data){
  position = data.val();
   balloon.x = position.x;
   balloon.y = position.y;
 }

// function readHeight(data){
//   height = data.val();
// }

// function readHeight(){
//   height = val();
//   balloon.x = height.x;
//   balloon.y = height.y;
// }

function showError(){
  console.log("Error in writing to the database");
}