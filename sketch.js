
let tableCounts

function preload(){
  tableCounts = loadTable('TikTokData/countsSept1-7.csv', 'csv', 'header')
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < tableCounts.getRowCount(); i++){

    let date = tableCounts.getString(i, 'Date');
    let videosViewed = tableCounts.getString(i, 'Videos Viewed');
    let videosLiked = tableCounts.getString(i, 'Videos Liked');
    let percentVideosLiked = tableCounts.getString(i, 'Percent Videos Liked');
  
    // print(date)
    // print(videosViewed)
    // print(videosLiked)
    // print(percentVideosLiked)
  }

}

function draw() {
  background(255);
}