import * as mqtt from 'mqtt';

class MqttClient {
  #options;
  #client;
  #topics;

  constructor(options, topics) {
    this.#options = options;
    this.#topics = topics;
  }

  connect() {
    const self = this;
    self.#client = mqtt.connect(self.#options);

    // 연결 이벤트 콜백
    self.#client.on('connect', () => {
      console.log('## MQTT is connected');

      // set subscribe
      self.#client.subscribe(self.#topics, (err) => {
        if (!err) {
          console.log(`## start to subscribe ${self.#topics}`);
        } else {
          console.log(err);
        }
      });
    });
    // error handling
    self.#client.on('err', (err) => {
      console.log(err);
    });
  }

  // MQTT 메시지 발행
  sendCommand(topic, message) {
    this.#client.publish(topic, JSON.stringify(message));
  }

  // 메시지 이벤트 콜백 설정
  setMessageCallback(callback) {
    this.#client.on('message', callback);
  }
}

export default MqttClient;
