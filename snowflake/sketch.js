let gravity;
let snow = [];

let spritesheet;
let textures = [];
let bg;

function preload() {
  spritesheet = loadImage('snow.png');
  bg = loadImage('output2.jpg');
}

function setup() {
  createCanvas(800, 800);
  gravity = createVector();
  gravity.y = 0.0003;
  
  for (let x = 0; x < spritesheet.width; x += 32) {
    for (let y = 0; y < spritesheet.height; y += 32) {
      let img = spritesheet.get(x, y, 32, 32);
      image(img, x, y);
      textures.push(img);
    }
  }
  
  for (let i = 0; i < 200; i++) {
    let snowFlake = new SnowFlake(random(textures));
    snow.push(snowFlake);
  }
  
  
}
function draw() {
  image(bg, 0, 0, width, height)
  
  
  for (flake of snow) {
    flake.applyForce(gravity)
    flake.update();
    flake.render();
  }

}