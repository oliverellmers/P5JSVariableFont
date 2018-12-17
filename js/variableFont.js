

var isOverSketch = false;
var isOverParagraph = false;
var paragraph;
var pWeight = 10;

var currentVal = 0;
var targetVal = 0;

function getMobileOperatingSystem() {
var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/windows phone/i.test(userAgent)) {
      isMobile = true;
      return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
      isMobile = true;
      return "Android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      isMobile = true;
      return "iOS";
  }

  isMobile = false;
  return "unknown";
}

function setup() {
  noCursor();
  getMobileOperatingSystem();

  var multiCanvas = createCanvas(windowWidth, windowHeight, P2D);
  multiCanvas.style('display', 'block');

  paragraph = createP("Oliver Ellmers")

  multiCanvas.parent("multiCanvas");
  multiCanvas.mouseOver(overSketch);
  multiCanvas.mouseOut(outSketch);

  paragraph.mouseOver(overParagraph);
  paragraph.mouseOut(outParagraph);
}

function overParagraph(){
 // console.log("mouse is over the paragraph");
  isOverParagraph = true;
  targetVal = 100;
}

function outParagraph(){
  //console.log("mouse is over the paragraph");
  isOverParagraph = false;
  targetVal = 10;
}

function draw() {
  background(255);
  
  weightControl = sin(frameCount/10.0)*100+150;
  paragraph.elt.style['font-variation-settings'] = `"wght" ${currentVal}, "wdth" ${125}`;
  paragraph.width = windowWidth;
  paragraph.height = windowHeight;
  paragraph.position(windowWidth/2 - paragraph.width/2, windowHeight/2 - paragraph.height/2);

  var easing = 0.25;
  var diff = targetVal - currentVal;
  currentVal += diff * easing;


  blendMode(DIFFERENCE);
  if(isOverSketch && !isMobile){
    //console.log("");
    fill(255,255,255, 255);
  }else{
    fill(255,255,255, 0);
  }
  ellipse(mouseX, mouseY, 24, 24);
  blendMode(NORMAL)
}

function overSketch() {
  isOverSketch = true;
}

function outSketch() {
  isOverSketch = false;
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  multiCanvas.remove();
  multiCanvas = createCanvas(windowWidth, windowHeight, P2D);
  getMobileOperatingSystem();

}