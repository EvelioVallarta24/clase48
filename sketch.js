var bgImg;
var bg;
var sharkImg;
var shark;
var surferImg;
var sufer;
var swimmer, swimmerImg;
var swimmerGroup;
var coconut, coconutImg;
var coconutGroup;
var score = 0;
var gameState = "PLAY"; 
var database;  

function preload() {
  bgImg = loadImage("images/bg.jpg");
  surferImg = loadImage("images/surfer.png");
  swimmerImg = loadImage("images/salvavidas.png");
  coconutImg = loadImage("images/coco.png");
  sharkImg = loadAnimation("images/shark1.png","images/shark2.png");
}

function setup() {
    createCanvas(600, 1000);

    database = firebase.database();

    bg = createSprite(300,0);
    bg.addImage("ocean",bgImg);
    bg.velocityY = +3;
    shark = createSprite(300,930);
    shark.addAnimation("shark",sharkImg);
    shark.scale = 1.5
    surfer = createSprite(300,740);
    surfer.addImage("surfista",surferImg);
    surfer.scale = 0.08;
    swimmerGroup = new Group();
    coconutGroup = new Group();
}

function draw() {
    edges = createEdgeSprites();
    
    //background("black");

    if(gameState === "PLAY"){

    if(bg.y>500){
        bg.y = 100;
    }
    bg.deep = bg.deep-4;
    console.log(score);
    text("score: "+score,width/2,height/2);

    //score = score+Math.round(frameCount%1.1);
    score = score+0.1;

    if(keyDown(LEFT_ARROW)){
        surfer.velocityX-=2
    }
    if(keyDown(RIGHT_ARROW)){
        surfer.velocityX+=2
    }

    if(coconutGroup.isTouching(surfer)){
        bg.velocityY+=2;
        swimmerGroup.setVelocityYEach(5);
        coconutGroup.velocityY+=2;
    }

    surfer.bounceOff(edges);

    spawnSwimmers();
    spawnCoconuts();
    }
    // Agregar el código para Cambio de estado a END
    drawSprites();
}

function spawnSwimmers(){
    if(frameCount%150==0){
        var x = Math.round(random(20,580))
        swimmer = createSprite(x,-40);
        swimmer.addImage(swimmerImg);
        swimmer.scale=0.18;
        swimmer.velocityY=+3;
        swimmer.lifetime=370;
        swimmerGroup.add(swimmer);
    }
}

function spawnCoconuts(){
    if(frameCount%300==0){
        var x = Math.round(random(20,580))
        coconut = createSprite(x,-40);
        coconut.addImage(coconutImg);
        coconut.scale=0.07;
        coconut.velocityY=+3;
        coconut.lifetime=370;
        coconutGroup.add(coconut);
    }
}

function gameOver(){
    swal(
      {
        title: `¡Fin del juego!`,
        text: "¡Gracias por jugar!",
        imageUrl:
          "https://static.vecteezy.com/system/resources/previews/002/739/226/non_2x/surfing-cute-shark-with-open-mouth-cartoon-vector.jpg",
        imageSize: "150x150",
        confirmButtonText: "Jugar de nuevo"
      },
      function(isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
    );
  }
