let afinn; 

function preload() {
  afinn = loadJSON('afinn111.json');
}

var myRec = new p5.SpeechRec(); // P5.SpeechRec object
function setup(){
	createCanvas(800, 400);
	background(255, 255, 255);

	myRec.onResult = analyzePhrase;
	myRec.start(true, false); 
}



function analyzePhrase()
{
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

  