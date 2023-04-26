import * as mqtt from 'mqtt';

const client = mqtt.connect('mqtt://test.mosquitto.org');
// console.log('Is MQTT connected?: ' + client.connected);

client.on('connect', function () {
  console.log('Is MQTT connected?: ' + client.connected);
});

// handle incoming messages
client.on('message', function (topic, message) {
  console.log(`topic: ${topic.toString()}, message: ${message.toString()}`);
});

// publish
function publish(topic, message) {
  console.log('publishing: ', message);
  if (client.connected == true) {
    client.publish(topic, message);
  }
}

// subscribe

setInterval(() => {
  if (client.connected === true) {
    client.publish('test', 'test message');
  }
}, 2000);
client.subscribe('test');

// connection error
client.on('error', function (err) {
  console.log(err);
  process.exit(1);
});
