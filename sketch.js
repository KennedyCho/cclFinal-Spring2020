let afinn; 

var angle = 0;
var slider;
let grow = false; 
let weight = 10; 

function preload() {
  afinn = loadJSON('afinn111.json');
}

var myRec = new p5.SpeechRec(); // P5.SpeechRec object

function setup(){
	createCanvas(500, 500);
	background(255, 255, 255);
	myRec.onResult = analyzePhrase;
	myRec.start(true, false); 

	button = createButton('click me');
	button.mousePressed(changeGrow);
}

function analyzePhrase(){
	if(myRec.resultValue==true) { //if speech is detected
		let phrase = myRec.resultString.replace(/[^\w\s]|_/g, "").split(" ") //convert speech string to list of elements split by spaces
		console.log(phrase);
		let phraseScore = 0; 
		for (let word = 0; word < phrase.length; word++) {
			if (afinn.hasOwnProperty(phrase[word])) {
				phraseScore += Number(afinn[phrase[word]]); 	
			}
		}
		console.log(phraseScore/phrase.length);
	}
}

function changeGrow() {	
	grow = !grow; 
}

function draw() {
	background(51);
	stroke(255);

  translate(width/2, height);
  branch(100);
}
//angle 0, TWO_PI, PI / 4, 0.01
function branch(len) {
	strokeWeight(weight);
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 4 && grow) {
		weight -= 1; 
    push();
    rotate(PI / 4);
    branch(len * 0.67);
    pop();
    push();
    rotate(-PI / 4);
    branch(len * 0.67);
		pop();
	}	
}

