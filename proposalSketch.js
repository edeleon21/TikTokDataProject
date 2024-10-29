
let videoRandButton
let canvas
let slider
let guessButton


function setup() {
  canvas = createCanvas(windowWidth, windowHeight)
  canvas.position(0, 0)
  canvas.style("z-index", "-1")

  dateMenu = createSelect()
  dateMenu.option('Select Date')
  videoRandButton = createButton('Random Video')

  slider = createSlider(0, 120, 0)
  slider.position(windowWidth/2 + 280, windowHeight / 2 - 65)
  
  guessButton = createButton('Submit Guess')
  guessButton.position(windowWidth/2 + 300, windowHeight / 2 + 90)
}

function draw() {
  background(220)

  // phone outline
  fill(255)
  stroke(0)
  strokeWeight(2)
  rectMode(CENTER)
  rect(windowWidth/2, windowHeight/2, 250, 500, 20)
  rect(windowWidth/2, 130, 130, 10)
  ellipse(windowWidth/2, 550, 30, 30)

  // area for slider and instructions
  fill(255)
  stroke(0)
  strokeWeight(2)
  rect(windowWidth/2 + 350, windowHeight/2, 300, 300, 20)

  // instructions
  fill(0)
  noStroke()
  textSize(14)
  textAlign(CENTER)
  text("Guess how much time I spent watching \n this video (0-120 seconds):", windowWidth - 365, windowHeight / 2 - 100)
  text("Press the heart if I liked the video.", windowWidth/2 + 350, windowHeight / 2)
  rect(windowWidth/2 + 350, windowHeight / 2 + 30, 20, 20)
  text("(The rectangle will be a heart.)", windowWidth/2 + 465, windowHeight / 2 + 35)
  text("Click 'Random Video' to load a new random video.", windowWidth - 360, windowHeight / 2 + 170)

  // background ideas
  text("A paper being typed in the background and news headlines popping up in the background.", 350, 60)
}
