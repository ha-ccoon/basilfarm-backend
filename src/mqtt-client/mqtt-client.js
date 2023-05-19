import * as mqtt from 'mqtt';

class MqttClient {
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
        // console.log(`Connection Error from ${this._topics} :`, err);
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
  async sendCommand(topic, message, err) {
    if (!err) {
      this._client.publish(topic, JSON.stringify(message));
      console.log('제어 명령이 전송 되었습니다.');
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

export default MqttClient;
