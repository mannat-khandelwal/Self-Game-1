var bg,bgI;
var plane, planeImg;
var ms1Img,ms2Img,ms3Img,ms4Img,ms5Img;
 
function preload(){

  bgI = loadImage("background.png");
  planeImg = loadImage("plane.png");
  ms1Img = loadImage("ms1.png");
  ms2Img = loadImage("ms2.png");
  ms3Img = loadImage("ms3.png");
  ms4Img = loadImage("ms4.png");
  ms5Img = loadImage("ms5.png");
  
}

function setup() {
  createCanvas(700,700);

  bg = createSprite(350,350,0,0);
  bg.addImage(bgI);
  bg.scale = 2;

  plane = createSprite(0,330,0,0);
  plane.addImage(planeImg);
  plane.scale = 0.25;

}

function draw() {
  background(0);
  edges = createEdgeSprites();
 
  plane.collide(edges);
 
  monsters();  
  monsters1();

  drawSprites();

}

function monsters(){
    
  if(frameCount % 240 === 0){
    var ms = createSprite(750,0,10,10);
    ms.velocityX = -4;
    ms.y = Math.round(random(25,600));
    msG.add(ms);
    
    var rand = Math.round(random(1,3));
    switch(rand) {

      case 1: ms.addImage(ms3Img);
      ms.scale = 0.3;
      break;

      case 2: ms.addImage(ms4Img);
      ms.scale = 0.3;
      break;

      case 3: ms.addImage(ms5Img);
      ms.scale = 0.3;
      break;

    }}}

function monsters1(){
    
  if(frameCount % 190 === 0){
    var ms1 = createSprite(750,0,10,10);
    ms1.velocityX = -4;
    ms1.y = Math.round(random(25,600));
    msG1.add(ms1);
    
    var rand = Math.round(random(1,2));
    switch(rand) {

      case 1: ms1.addImage(ms1Img);
      ms1.scale = 0.3;
      break;

      case 2: ms1.addImage(ms2Img);
      ms1.scale = 0.3;
      break;

    }}}
