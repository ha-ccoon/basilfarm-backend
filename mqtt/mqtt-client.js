import * as mqtt from 'mqtt';

// const client = mqtt.connect({
//   host: '3.34.199.220',
//   port: 1883,
//   username: 'yoon',
//   password: 'helloElice',
// });

// client connection
client.on('connect', function () {
  console.log('Is MQTT connected?: ' + client.connected);
});

// handle incoming messages
client.on('message', function (topic, message) {
  console.log(`topic: ${topic.toString()}, message: ${message.toString()}`);
});

// publish (device => server)
function publish(topic, message) {
  if (client.connected == true) {
    client.publish(topic, message, { qos: 2 });
  }
}

// subscribe (server => device)
setInterval(() => {
  client.publish('test1', 'turn on the pump');
}, 2000);
client.subscribe('test1');

// connection error
client.on('error', function (err) {
  console.log(err);
  process.exit(1);
});
