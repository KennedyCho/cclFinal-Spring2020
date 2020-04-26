let mqtt = require('mqtt')
let options = {
  port: 16086,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: "qkjtffif",
  password: 'JlqxGc-L0ocS'
};

let client = mqtt.connect('mqtt://hairdresser.cloudmqtt.com', options);


var myRec = new p5.SpeechRec(); // new P5.SpeechRec object


	function setup()
	{
		// graphics stuff:
		createCanvas(800, 400);
		background(255, 255, 255);
		fill(0, 0, 0, 255);
		// instructions:
		textSize(32);
		textAlign(CENTER);
		text("say something", width/2, height/2);
		myRec.onResult = showResult;
    myRec.start(); //begin listening - only executes once 
    // need to add continous property - cont listen
	}

	function showResult()
	{
		if(myRec.resultValue==true) {
      client.on('connect', function() { // When connected
        //Subscribe to a topic
        client.subscribe('topic1/kennedy', function() {});
        //Publish a new message to the broker every 4 seconds
      
        client.publish('topic1/kennedy', String(myRec.resultString), 
        function() {
          console.log(myRec.resultString);
          client.end(); // Close the connection when published
        });
      });

			background(192, 255, 192);
			text(myRec.resultString, width/2, height/2);
			//console.log(myRec.resultString);
		}
  }
  
  