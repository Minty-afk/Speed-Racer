var canvas;
var backgroundImage, car1_img, car2_img, track;
var database, gameState;
var form, player, playerCount;
var allPlayers, car1, car2;
var cars = [];

var obstacle1Image, obstacle2Image;
var blastImage, powerCoins, obstacles;

function preload() {
  backgroundImage = loadImage("./assets/background.png");
  car1_img = loadImage("../assets/car1.png");
  car2_img = loadImage("../assets/car2.png");
  track = loadImage("../assets/track.jpg");
  blastImage = loadImage("../assets/blast.png");
  powerCoinImage = loadImage("../assets/goldCoin.png");
  obstacle1Image = loadImage("../assets/obstacle1.png");
  obstacle2Image = loadImage("../assets/obstacle2.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();


  powerCoins = new Group();
  obstacles = new Group();

   // Adding coin sprite in the game
   addSpirtes(powerCoins, 18, powerCoinImage, 0.09);


   var obstaclesPositions = [
    { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
    { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
    { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
    { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
    { x: width / 2, y: height - 2800, image: obstacle2Image },
    { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
    { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
    { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
    { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
    { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
    { x: width / 2, y: height - 5300, image: obstacle1Image },
    { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
  ];


  //Adding obstacle sprite in the game
  addSpirtes(
    obstacles,
    obstaclesPositions.length,
    obstacle1Image,
    0.04,
    obstaclesPositions
  );
}



function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function addSpirtes(
  spriteGroup,
  numberOfSprites,
  spirteImage,
  scale,
  positions = []
) {
  for (var i = 0; i < numberOfSprites; i++) {
    var x, y;

    if (positions.length > 0) {
      x = positions[i].x;
      y = positions[i].y;
      spirteImage = positions[i].image;
    } else {
      x = random(width / 2 + 150, width / 2 - 150);
      y = random(-height * 4.5, height - 400);
    }
    var spirte = createSprite(x, y);
    spirte.addImage("spirte", spirteImage);

    spirte.scale = scale;
    spriteGroup.add(spirte);
  }
}