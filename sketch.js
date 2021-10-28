var bg,bgI;
var plane, planeImg;
var ms1Img,ms2Img,ms3Img,ms4Img,ms5Img,msG,msG1;
var missileI,missileG;
var gameState = SERVE;
var SERVE = 0;
var PLAY = 1;
var END = 2;
var start,startI;
var Score = 0;
//var rs,rsI;
var go,goI;
var s1I,s2I,dia,diaI,sG,diaG;
var ufo1I,ufo2I,ufoG;
var next,nextI;
var space,spaceI;
var win,lose,explosion;
 
function preload(){
 
  win = loadSound("win.mp3");
  lose = loadSound("lose.mp3");
  explosion = loadSound("explosion.mp3");
  bgI = loadImage("background.png");
  planeImg = loadImage("plane.png");
  ms1Img = loadImage("ms1.png");
  ms2Img = loadImage("ms2.png");
  ms3Img = loadImage("ms3.png");
  ms4Img = loadImage("ms4.png");
  ms5Img = loadImage("ms5.png");
  missileI = loadImage("missile.png");
  startI = loadImage("start.png");
  //rsI = loadImage("restart.png");
  goI = loadImage("gameover.png");
  s1I = loadImage("star2.png");
  s2I = loadImage("star3.png");
  diaI = loadImage("diamond.png");
  ufo1I = loadImage("ufo.png");
  ufo2I = loadImage("ufo1.png");
  nextI = loadImage("next.png");
  spaceI = loadImage("space.png");
  

}

function setup() {
  createCanvas(700,700);

  msG = new Group();
  msG1 = new Group();
  missileG = new Group();
  sG = new Group();
  diaG = new Group();
  ufoG = new Group();

  bg = createSprite(350,350,0,0);
  bg.addImage(bgI);
  bg.scale = 2;

  plane = createSprite(0,330,0,0);
  plane.addImage(planeImg);
  plane.scale = 0.25;

  start = createSprite(350,350,0,0);
  start.addImage(startI);
  start.scale = 1;

  space = createSprite(350,670,0,0);
  space.addImage(spaceI);
  space.scale = 0.3;

  //rs = createSprite(320,400,0,0);
  //rs.addImage(rsI);
  //rs.scale = 0.2;

  go = createSprite(330,290,0,0);
  go.addImage(goI);
  go.scale = 0.5;

  next = createSprite(660,660,0,0);
  next.addImage(nextI);
  next.scale = 0.2;

}

function draw() {
  background(0);
  edges = createEdgeSprites();

  bg.visible = false;
  plane.visible = false;
  //rs.visible = false;
  go.visible = false;
  next.visible = false;

  if(mousePressedOver(start)){
    gameState = SERVE;
    Score = 0;
  }
  
  if(gameState === SERVE){
    
    textSize(30);
    fill("red");
    text("Instructions-",270,290);
    textSize(27);
    fill("lime");
    text("1. Shoot the ufo's",170,360);
    text("2. Collect the stars and diamonds",170,390);
    text("3. Escape from aliens",170,420);
    start.y = 1000;
    next.visible = true;

    if(mousePressedOver(next)){
      gameState = PLAY;
    }
  }

  if(gameState === PLAY){
    
    bg.visible = true;
    plane.visible = true;
    start.y = 1000;
    
  if(keyDown(UP_ARROW)){ 
    plane.y = plane.y - 5
  }

  if(keyDown(DOWN_ARROW)){
    plane.y = plane.y + 5
  }

  if(keyDown("space")){
    missile();
  }

  if(Score>0 && Score%25 === 0){
    win.play() 
 }

  if(plane.isTouching(msG)){
    gameState = END;
    explosion.play();
  }

  if(plane.isTouching(diaG)){
    Score = Score+3;
    diaG.destroyEach();
    win.play();
  }

  if(plane.isTouching(sG)){
    Score = Score+2;
    sG.destroyEach();
    win.play();
  }

  if(plane.isTouching(ufoG)){
    gameState = END;
    explosion.play(); 
  }

  if(plane.isTouching(msG1)){
    gameState = END;
    explosion.play();
  }

  if(missileG.isTouching(ufoG)){
    ufoG.destroyEach();
    Score = Score + 1;
    lose.play(); 
  }


  plane.collide(edges)
  monsters();  
  monsters1();
  diamond();
  stars();
  ufos();

  }

  else if(gameState === END) {

    msG.destroyEach();
    msG1.destroyEach();
    missileG.destroyEach();
    sG.destroyEach();
    diaG.destroyEach();
    ufoG.destroyEach();
    start.y = 350;
    explosion.play();

    //rs.visible = true;
    go.visible = true;


    if(mousePressedOver(start)) {
      gameState = PLAY;   
      Score = 0;
      //rs.visible = false;
      go.visible = false;
      plane.y = 330;
   
    }
  }


  drawSprites();

  textSize(25);            
  fill("cyan");
  stroke("cyan");
  text("Score:" +Score, 300,50 );
  
  textSize(30);            
  fill("orange");
  stroke("orange");
  text("Press",210,680);
  text("to shoot",410,680);
  //text("NEXT",670,680);

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

function missile(){
  var missile = createSprite(80,0,0,0);
    missile.addImage(missileI);
    missile.scale = 0.1;
    missile.y = plane.y;
    missile.lifetime = 300;
    missile.velocityX = 3;
    missileG.add(missile);
    missile.visible = true;
  }

function diamond() {
  if(frameCount % 230 === 0){
    var dia = createSprite(750,0,0,0);
    dia.y = Math.round(random(20,600));
    dia.addImage(diaI);
    dia.scale = 0.12;
    dia.lifetime = 300;
    dia.velocityX = -4;
    diaG.add(dia);
  }}

function stars(){
    
  if(frameCount % 260 === 0){
    var st = createSprite(750,0,10,10);
      st.velocityX = -4;
      st.y = Math.round(random(25,600));
      sG.add(st);
      
      var rand = Math.round(random(1,2));
      switch(rand) {
  
        case 1: st.addImage(s1I);
        st.scale = 0.09;
        break;
  
        case 2: st.addImage(s2I);
        st.scale = 0.2;
        break;
      }}}

function ufos(){
    
  if(frameCount % 240 === 0){
    var ufo = createSprite(750,0,10,10);
      ufo.velocityX = -4;
      ufo.y = Math.round(random(25,700));
      ufoG.add(ufo);
          
      var rand = Math.round(random(1,2));
      switch(rand) {
      
        case 1: ufo.addImage(ufo1I);
        ufo.scale = 0.2;
        break;
      
        case 2: ufo.addImage(ufo2I);
        ufo.scale = 0.2;
        break;
      }}}   