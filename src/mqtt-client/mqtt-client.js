import * as mqtt from 'mqtt';

class MqttSetup {
  constructor(options, topics) {
    this._options = options;
    this._topics = topics;
  }

  connect() {
    this._client = mqtt.connect(this._options);

    this._client.on('connect', (err) => {
      if (!err) {
        console.log('## MQTT is connected');
      } else {
        console.log('Connection Error: ', err);
      }
    });
  }

  subscribe() {
    this._client.subscribe(this._topics, (err) => {
      if (!err) {
        console.log(`## Start to subscribe ${this._topics}`);
      } else {
        console.log('Subscribe Error: ', err);
      }
    });
  }

  // 서버 => 디바이스
  sendInstruction(topic, message, err) {
    if (!err) {
      this._client.publish(this._topic, JSON.stringify(message));
    } else {
      console.log('Publish Error: ', err);
    }
  }

  // 디바이스 => 데이터베이스
  receiveMessage(callback, err) {
    if (!err) {
      this._client.on('message', callback);
    } else {
      console.log('Receiving Message Error: ', err);
    }
  }

  // error handling
  error() {
    this._client.on('error', (err) => {
      console.log(err);
    });
  }
}

export default MqttSetup;
