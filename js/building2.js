let videoRandButton;
let canvas;
let slider;
let guessButton;

let table;
let dateMenu;
let videoArrays = {}; // Store video arrays by date in an object
let tikTokVideo;

let tiktokEmbedBool = false;
let tiktokBlockQuote;
let tiktokScript;
let tiktokSectionTag;

let phoneWidth;
let phoneHeight;
let phoneHomeButton;
let phoneSpeaker;

// let heart;
let heartClicked = false;

function preload() {
  // Load my data from the CSV file
  table = loadTable('TikTokData/updatedBrowsingSept1-7.csv', 'csv', 'header');
  // heart = loadImage('heart.png');
}

function setup() {
  // Create canvas
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");

  // Set phone dimensions
  phoneWidth = 300;
  phoneHeight = phoneWidth * 2;
  phoneHomeButton = phoneHeight - 20;
  phoneSpeaker = phoneWidth / 4;

  // Create and position slider
  slider = createSlider(0, 300, 0, 1);
  slider.position(windowWidth / 2 + 280, windowHeight / 2 - 65);

  // Create and position guess button
  guessButton = createButton('Submit Guess');
  guessButton.position(windowWidth / 2 + 300, windowHeight / 2 + 90);

  // Create and position date menu
  dateMenu = createSelect();
  dateMenu.option('Select Date');
  dateMenu.position(windowWidth / 2 + 300, windowHeight / 2);

  // Create and position new video button
  videoRandButton = createButton('New Video');
  videoRandButton.mousePressed(() => randVideo(dateMenu.value()));
  videoRandButton.position(windowWidth / 2 + 300, windowHeight / 2 + 120);

  // Populate date menu and store video IDs in arrays by date
  for (let i = 0; i < table.getRowCount(); i++) {
    let date = table.getString(i, 'Date');
    let videoID = table.getString(i, 'Video ID');

    if (!videoArrays[date]) {
      videoArrays[date] = [];
    }
    videoArrays[date].push(videoID);

    // Add unique dates to the date menu
    if (dateMenu.elt.length <= 1 || !Array.from(dateMenu.elt.options).some(option => option.value === date)) {
      dateMenu.option(date);
    }
  }
  // print(videoArrays);
  dateMenu.changed(changeData);
}

function randVideo(date) {
  if (date in videoArrays) {
    let videos = videoArrays[date];
    let randIndex = int(random(videos.length));
    let selectedVideoID = videos[randIndex];

    // print(`Selected date: ${date}`);
    // print(`Videos for this date: ${videos}`);
    // print(`Randomly selected video ID: ${selectedVideoID}`);

    updateTikTokEmbed(selectedVideoID);
  }
}

function changeData() {
  let selectedDate = dateMenu.value();
  randVideo(selectedDate);
}

function updateTikTokEmbed(videoID) {
  if (!tikTokVideo) {
    tikTokVideo = createElement('iframe', '');
    tikTokVideo.attribute('class', 'tiktok-embed');
    tikTokVideo.attribute('style', 'width: 300px; height: 533px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);');
  }
  tikTokVideo.attribute('src', 'https://www.tiktok.com/embed/v2/' + videoID + '?lang=en-US&referrer=http%3A%2F%2F127.0.0.1%3A8080%2F');
  // print(`Video ID: ${videoID}`);
}

function draw() {
  background(220);

  let seconds = slider.value()

  // Phone outline
  fill(255);
  stroke(0);
  strokeWeight(2);
  rectMode(CENTER);
  rect(windowWidth / 2, windowHeight / 2, phoneWidth, phoneHeight, 20); // Phone outline
  rect(windowWidth / 2, phoneSpeaker, 100, 10); // Phone speaker
  ellipse(windowWidth / 2, phoneHomeButton, 30, 30); // Phone home button

  // Area for slider, buttons, and instructions
  fill(255);
  stroke(0);
  strokeWeight(2);
  rectMode(CENTER);
  rect(windowWidth / 2 + 350, windowHeight / 2, 300, 340, 20);

  // Instructions
  fill(0);
  noStroke();
  textSize(14);
  textAlign(LEFT);
  text("Browse my TikTok For You page by selecting a date from the drop-down menu. Use the slider to guess how much time I spent watching the video. Press the heart if you think I liked the video. Check if you were right by clicking Submit Guess. Load a new video by pressing New Video.", windowWidth / 2 + 350, windowHeight / 2, 270, 300);

  // Position of select date, slider and buttons
  dateMenu.position(windowWidth / 2 + 300, windowHeight / 2 - 5);
  slider.position(windowWidth / 2 + 230, windowHeight / 2 + 25);
  text(seconds + " seconds", windowWidth / 2 + 400, windowHeight / 2 + 40);
  // imageMode(CENTER);
  // image(heart, windowWidth / 2 + 350, windowHeight / 2 + 75);
  // heart.resize(50, 0);
  guessButton.position(windowWidth / 2 + 300, windowHeight / 2 + 105);
  videoRandButton.position(windowWidth / 2 + 310, windowHeight / 2 + 135);

  // Background ideas
  fill(0)
  text("A paper being typed in the background and news headlines popping up in the background.", 200, 60);

  drawHeart();
}

// Draw heart and change color when mouse is pressed
function drawHeart() {
  heartX = windowWidth / 2 + 350
  heartY = windowHeight / 2 + 68
  const r = 1.5; // change r to adjust the size of the heart

  mouseDist = dist(mouseX, mouseY, heartX, heartY);
  if(mouseIsPressed && mouseDist < r * 16){
    heartClicked = !heartClicked
  }

  if(heartClicked){
    fill(235, 64, 52)
  } else {
    fill(237, 126, 119);
  }

  translate(heartX, heartY); // position of the heart
  noStroke();
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.1) {
    const x = r * 16 * pow(sin(a), 3);
    const y = -r * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));

    vertex(x, y);
  }
  endShape();
}
