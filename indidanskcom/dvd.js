const size = 60;
const speed = 2;
const string = "anders";

let font1, font2;
let w, h;

let x, y;
let vx, vy;
let lastHue, clr;
let counter;


function preload() {
  font1 = loadFont("/arialbd.ttf");
  font2 = loadFont("/arial.ttf");
}

function setup() {
  createCanvas(400*1.618, 400);
  noStroke();
  colorMode(HSB);
  textAlign(CENTER, CENTER);
  
  x = width/2; y = height/2;
  vx = 1; vy = 1;
  lastHue = -100;
  clr = color(255);
  counter = 0;
}

function draw() {
  x += vx * speed;
  y += vy * speed;
  
  textSize(size);
  textFont(font1);
  let b = font1.textBounds(string, x, y);
  let ax = b.x - b.advance;
  let ay = b.y;
  let bx = ax + b.w;
  let by = ay + b.h;
  
  let xhit, yhit;
  if (bx > width) {
    x -= (bx - width)*2;
    vx = -1;
    xhit = true;
  } else if (ax < 0) {
    x += -ax*2;
    vx = 1;
    xhit = true;
  }
  if (by > height) {
    y -= (by - height)*2;
    vy = -1;
    yhit = true;
  } else if (ay < 0) {
    y += -ay*2;
    vy = 1;
    yhit = true;
  }
  
  if (xhit && yhit) {
    counter++;
  }
  
  
  background(0);
  
  /*fill(255);
  rect(ax, ay, b.w, b.h);*/
  
  if (xhit || yhit) {
    let hue = lastHue;
    while (abs(hue - lastHue) < 20) {
        hue = Math.floor(random()*360);
    }
    lastHue = hue;
	
    clr = color(hue, 100, 100);
  }
  fill(clr);
  text(string, x, y);
  
  textSize(50);
  textFont(font2);
  fill(255);
  text(counter, 30, 30);
}
