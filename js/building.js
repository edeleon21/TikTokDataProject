
let videoRandButton
let canvas
let slider
let guessButton

let table;
let dateMenu;
let videoArray = [];
let videoArray1 = []
let videoArray2 = []
let videoArray3 = []
let videoArray4 = []
let videoArray5 = []
let videoArray6 = []
let videoArray7 = []
let tikTokVideo;
let randArray;

let tiktokEmbedBool = false
let tiktokBlockQuote
let tiktokScript
let tiktokSectionTag

let phoneWidth
let phoneHeight
let phoneHomeButton
let phoneSpeaker

let heart


function preload() {
  // load my data from the csv file
  table = loadTable('TikTokData/updatedBrowsingSept1-7.csv', 'csv', 'header')

  heart = loadImage('heart.png')

}


function setup() {
  
  // create canvas
  canvas = createCanvas(windowWidth, windowHeight)
  canvas.position(0, 0)
  canvas.style("z-index", "-1")

  // set phoneWidth and phoneHeight
  phoneWidth = 300
  phoneHeight = phoneWidth * 2

  // set phoneHomeButton 50 pixels above the bottom of the phone screen
  phoneHomeButton = phoneHeight - 50

  // set phoneSpeaker 50 pixels below the top of the phone screen
  phoneSpeaker = phoneWidth/4

  // create and position slider
  slider = createSlider(0, 120, 0)
  slider.position(windowWidth/2 + 280, windowHeight / 2 - 65)
  
  // create and position guess button
  guessButton = createButton('Submit Guess')
  guessButton.position(windowWidth/2 + 300, windowHeight / 2 + 90)

  // create and position date menu
  dateMenu = createSelect();
  dateMenu.option('Select Date')
  dateMenu.position(windowWidth/2 + 300, windowHeight/2)

  // create and position new video button
  videoRandButton = createButton('New Video')
  videoRandButton.mousePressed(randVideo('date'))
  // print('dateMenu.value' + dateMenu.value())
  videoRandButton.position(windowWidth/2 + 300, windowHeight/2 + 120)

  // for loop that cycles through each row
  for (let i = 0; i < table.getRowCount(); i++){
    
    //store the TikTok video IDs in an array
    videoArray[i] = table.getString(i, 'Video ID');

    //grab each of the dates
    let date = table.getString(i, 'Date');

    if (date == '9/1/24'){
      videoArray1[i] = table.getString(i, 'Video ID')
    }
    
    // each option is one of the dates in the file
    dateMenu.option(date)
  }

  // print(videoArray1)

  dateMenu.changed(changeData);
}


function randVideo(date){

}


function changeData(){

    print(dateMenu.value())

    if (dateMenu.value() == '9/1/24'){
      // videoArray1[i] = table.getString(i, 'Video ID')

      let randVideoNum = random(0, videoArray1.length)
      let convertVidNum = int(randVideoNum)

      print('hello')
   

      tikTokVideo = select('.tiktok-embed')
      tikTokVideo.attribute('src', 'https://www.tiktok.com/embed/v2/' + videoArray1[convertVidNum] + '?lang=en-US&amp;referrer=http%3A%2F%2F127.0.0.1%3A8080%2F')

  }

  // for loop that cycles through each row
  for (let i = 0; i < table.getRowCount(); i++){

    // checks if the selected date from the dropdown menu matches the date in the current row
    if(dateMenu.value() == table.getString(i, 'Date')){
      
      // updates the data-video-id attribute of the iframe to match the video ID corresponding to the selected date.
      tikTokVideo.attribute('data-video-id', videoArray[i]);
    }
  }
}


function draw() {
  background(220)

  // phone outline
  fill(255)
  stroke(0)
  strokeWeight(2)
  rectMode(CENTER)
  rect(windowWidth/2, windowHeight/2, phoneWidth, phoneHeight, 20) // phone outline
  rect(windowWidth/2, phoneSpeaker, 100, 10) // phone speaker
  ellipse(windowWidth/2, phoneHeight, 30, 30) // phone home button

  // area for slider, buttons, and instructions
  fill(255)
  stroke(0)
  strokeWeight(2)
  rectMode(CENTER)
  rect(windowWidth/2 + 350, windowHeight/2, 300, 340, 20)

  // instructions
  fill(0)
  noStroke()
  textSize(14)
  textAlign(LEFT)
  text("Browse my TikTok For You page by selecting a date from the drop-down menu. Use the slider to guess how much time I spent watching the video. Press the heart if you think I liked the video. Check if you were right by clicking Submit Guess. Load a new video by pressing New Video.", windowWidth/2 + 350, windowHeight/2, 270, 300)
  // text("Guess how much time I spent watching \n this video (0-120 seconds):", windowWidth/2 + 350, windowHeight / 2 - 100)
  // text("Press the heart if I liked the video.", windowWidth/2 + 350, windowHeight / 2)
  // rect(windowWidth/2 + 350, windowHeight / 2 + 30, 20, 20)
  // text("(The rectangle will be a heart.)", windowWidth/2 + 465, windowHeight / 2 + 35)
  // text("Click 'Random Video' to load a new random video.", windowWidth - 360, windowHeight / 2 + 170)

  // position of select date, slider, heart, and buttons
  dateMenu.position(windowWidth/2 + 300, windowHeight/2 - 5)
  slider.position(windowWidth/2 + 230, windowHeight / 2 + 25)
  text("___ seconds", windowWidth/2 + 400, windowHeight/2 + 40)
  imageMode(CENTER)
  image(heart, windowWidth/2 + 350, windowHeight/2 + 75)
  heart.resize(50, 0)
  guessButton.position(windowWidth/2 + 300, windowHeight / 2 + 105)
  videoRandButton.position(windowWidth/2 + 310, windowHeight/2 + 135)


  // background ideas
  text("A paper being typed in the background and news headlines popping up in the background.", 200, 60)
}
