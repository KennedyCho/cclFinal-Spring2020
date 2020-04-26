
let mqtt = require('mqtt');

let options = {
  port: 16086,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: "qkjtffif",
  password: 'JlqxGc-L0ocS'
};

// updated url
let client = mqtt.connect('mqtt://hairdresser.cloudmqtt.com', options);
console.log("Received");

client.on('connect', function() { // When connected
  //Subscribe to a topic
  client.subscribe('topic1/kennedy', function() {
    //When a message arrives, print it to the console
    client.on('message', function(topic, message, packet) {
      console.log(message);
    });
  });
});
