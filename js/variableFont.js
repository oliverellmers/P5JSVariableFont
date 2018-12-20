var isMobile = false;
var isOverSketch = false;
var isOverParagraph = false;
var paragraph;
var pWeight = 10;

var fontWeightCurrent = 0;
var fontWeightTarget = 0;

var textElement;

var fontSizeStr = "vw";
var fontSizeCurrent = 0;
var fontSizeTarget = 0;

var easing = 0.25;

var textCanvas;


function setup() {
  //noCursor();
  getMobileOperatingSystem();

  var multiCanvas = createCanvas(windowWidth, windowHeight, P2D);
  multiCanvas.style('display', 'block');

  //textCanvas = createCanvas(1024, 768);

  paragraph = createP("GROUNDED");
  paragraph.class("pClass");
  paragraph.position(0,0);
  paragraph.mouseOver(overParagraph);
  paragraph.mouseOut(outParagraph);
  //paragraph.parent(textCanvas);

  multiCanvas.parent("multiCanvas");
  multiCanvas.mouseOver(overSketch);
  multiCanvas.mouseOut(outSketch);
}

function overParagraph(){
  isOverParagraph = true;
}

function outParagraph(){
  isOverParagraph = false;
}

function draw() {
  background(255);
  
  var fontWeightDiff = fontWeightTarget - fontWeightCurrent;
  fontWeightCurrent += fontWeightDiff * easing;

  var fontSizeDiff = fontSizeTarget - fontSizeCurrent;
  fontSizeCurrent += fontSizeDiff * easing;

  if(isOverParagraph){
    fontWeightTarget = 200;
    fontSizeTarget = 12;
    fontSizeStr = fontSizeCurrent + "vw";
    paragraph.style("font-size", fontSizeStr);
    paragraph.style("color:rgba(255,255,255,255);");
  }else{
    fontWeightTarget = 10;
    fontSizeTarget = 13.5;
    fontSizeStr = fontSizeCurrent + "vw";
    paragraph.style("font-size", fontSizeStr);
    paragraph.style("color:rgba(255,255,255,0);");
  }

  paragraph.elt.style['font-variation-settings'] = `"wght" ${fontWeightCurrent}, "wdth" ${125}`;
  paragraph.center();




/*
  blendMode(DIFFERENCE);
  if(isOverSketch && !isMobile){
    //console.log("");
    fill(255,255,255, 255);
  }else{
    fill(255,255,255, 0);
  }
  ellipse(mouseX, mouseY, 24, 24);
  blendMode(NORMAL)
  */
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