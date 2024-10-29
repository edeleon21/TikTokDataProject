
let table;
let dateMenu;
let videoArray = [];
let youtubeVideo ;
let videoRandButton;
let randArray;
let canvas



function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels

  table = loadTable('js/personalData.csv', 'csv', 'header');

}


function setup(){
  //canvas = createCanvas(windowWidth, windowHeight);
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0)

  canvas.style("z-index", "-1")

  //select the iframe from the index file
  youtubeVideo  = select('#youtubeVideo');

  dateMenu = createSelect();
  dateMenu.option('Select Date')
  videoRandButton = createButton('Random Video')
  videoRandButton.mousePressed(randVideo)

  for (let i = 0; i < table.getRowCount(); i++){
    //store the YouTube video IDs in an array
    videoArray[i] = table.getString(i, 'videoID');

    //grab each of the dates
    let date = table.getString(i, 'date');

    let company = table.getString(i, 'company');


    dateMenu.option(date)
  }

  dateMenu.changed(changeData);
  
}


function randVideo(){

  
  let randVideoNum = random(0, videoArray.length)
  let convertVidNum = int(randVideoNum)
  youtubeVideo.attribute('src', 'https://www.youtube.com/embed/' + videoArray[convertVidNum]);



}

function changeData(){
//  randArray = int(random(videos.length));

  background(255)
  for (let i = 0; i < table.getRowCount(); i++){
    if(dateMenu.value() == table.getString(i, 'date')){
      text(table.getString(i, 'company'), windowWidth/2, 50);
      text(table.getString(i, 'date'), windowWidth/2, 90);

      //replace the link in the iframe with the
      //YouTube video ID that matches the entry
      youtubeVideo.attribute('src', 'https://www.youtube.com/embed/' + videoArray[i]);
    }
  }
}

function draw(){

  //T1000.attribute('src', 'videos/' + vidSelect.value() + '.mp4');
//  T1000.position(150, 200);
}
