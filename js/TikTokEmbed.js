let table;
let dateMenu;
let videoArray = [];
let tikTokVideo ;
let videoRandButton;
let randArray;
let canvas

let tiktokEmbedBool = false
let tiktokBlockQuote
let tiktokScript
let tiktokSectionTag


function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels

  table = loadTable('TikTokData/updatedBrowsingSept1-7.csv', 'csv', 'header');

}


function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0)

  canvas.style("z-index", "-1")

  

  dateMenu = createSelect();
  dateMenu.option('Select Date')
  videoRandButton = createButton('Random Video')
  videoRandButton.mousePressed(randVideo)

  for (let i = 0; i < table.getRowCount(); i++){
    //store the TikTok video IDs in an array
    videoArray[i] = table.getString(i, 'Video ID');

    //grab each of the dates
    let date = table.getString(i, 'Date');

    dateMenu.option(date)
  }

  dateMenu.changed(changeData);
  
}


function randVideo(){
    let randVideoNum = random(0, videoArray.length)
    let convertVidNum = int(randVideoNum)
   

    tikTokVideo = select('.tiktok-embed')
    tikTokVideo.attribute('src', 'https://www.tiktok.com/embed/v2/' + videoArray[convertVidNum] + '?lang=en-US&amp;referrer=http%3A%2F%2F127.0.0.1%3A8080%2F')

  


}

function changeData(){
//  randArray = int(random(videos.length));

  background(255)
  for (let i = 0; i < table.getRowCount(); i++){
    if(dateMenu.value() == table.getString(i, 'Date')){
      // text(table.getString(i, 'company'), windowWidth/2, 50);
      text(table.getString(i, 'Date'), windowWidth/2, 90);

      //replace the link in the iframe with the
      //YouTube video ID that matches the entry
      tikTokVideo.attribute('data-video-id', videoArray[i]);
    }
  }
}

function draw(){
}