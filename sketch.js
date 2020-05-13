let afinn; 
let maxDepth = 6;
let currentDepth = 0; 
let state = false; 

let tree = []; 
let leaves = [];

let myRec = new p5.SpeechRec(); // P5.SpeechRec object

function preload() {
	afinn = loadJSON('afinn111.json');
	leaf = loadImage('assets/leaf.png');
	cloud = loadImage('assets/cloud.png');

}

setInterval(function(){
	state = false
	console.log(state);
}, 3000); 

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
		
		if (phraseScore/phrase.length > 0) {
			for (var i = tree.length - 1; i >= 0; i--) {
				if (!tree[i].finished) {
					tree.push(tree[i].branchA());
					tree.push(tree[i].branchB());
					
				}
				tree[i].finished = true;
			}
			currentDepth++;
		
			if (currentDepth > 0) {
				console.log('leaf');
				
				for (var i = 0; i < tree.length; i++) {
					if (!tree[i].finished) {
						var leaf = tree[i].end.copy();
						leaves.push(leaf);
					}
				}
			}
		}
	}
}

class Branch {
  constructor(begin, end, currentDepth){
		this.begin = begin;
		this.end = end;
		this.finished = false;
		this.currentDepth = currentDepth; 
	}
	

	jitter() {
    this.end.x += random(-1, 1);
    this.end.y += random(-1, 1);
  };

  show() {
		strokeWeight(12 * Math.pow((maxDepth - this.currentDepth + 1) / maxDepth, 2));
    stroke(156, 139, 100);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  };

  branchA() {
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(PI / 6);
		dir.mult(random(0.60, 0.90));
		var newEnd = p5.Vector.add(this.end, dir);
    var b = new Branch(this.end, newEnd, currentDepth);
    return b;
  };
  branchB() {
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(-PI / 4);
		dir.mult(random(0.60, 0.90));
    var newEnd = p5.Vector.add(this.end, dir);
    var b = new Branch(this.end, newEnd, currentDepth);
    return b;
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  var a = createVector(width / 2, height);
  var b = createVector(width / 2, height - 100);
  var root = new Branch(a, b, currentDepth);

	tree[0] = root;
	
	myRec.onResult = analyzePhrase;
	myRec.start(true, false); 


}

function draw() {
	background(199, 234, 255);


	fill(252, 227, 3);
	noStroke();
	ellipse(width - 150, 150, 200, 200);

	image(cloud, width-410, 140, 300, 150);

	fill(70, 138, 18);
	ellipse(0, height, width+width/3, height/4); 
	fill(182, 252, 3);
	ellipse(width, height, -width-width/3, height/4);
  for (var i = 0; i < tree.length; i++) {
    tree[i].show();
  }

  for (var i = 0; i < leaves.length; i++) {
    fill(100, 199, 58);
		noStroke();
		push();
		translate(leaves[i].x-30, leaves[i].y-30);
		image(leaf, 0, 0, 30, 30);
		pop();
		push();
		translate(leaves[i].x+30, leaves[i].y-20);
		rotate(90);
		image(leaf, 0, 0, 30, 30);
		rotate(90);
		pop();
  }
}