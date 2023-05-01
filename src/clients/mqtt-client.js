import * as mqtt from 'mqtt';
import dotenv from 'dotenv';

dotenv.config();

class mqttSetup {
  constructor(options, topics) {
    this._options = options;
    this._topics = topics;
  }

  // 함수가 여기 다들어가는게 맞는가에 대해 생각해보기
  connect() {
    this._client = mqtt.connect(this._options);

    // 연결 이벤트 콜백
    this._client.on('connect', () => {
      console.log('## MQTT is connected');

      // set subscribe
      this._client.subscribe(this._topics, (err) => {
        if (!err) {
          console.log(`## start to subscribe ${this._topics}`);
        } else {
          console.log(err);
        }
      });
    });
    // error handling
    this._client.on('err', (err) => {
      console.log(err);
    });
  }

  // 서버 => 디바이스 (error handling 생각해보기)
  sendCommand(topic, message) {
    this._client.publish(topic, JSON.stringify(message));
  }

  // 디바이스 => 데이터베이스
  setMessageCallback(callback) {
    this._client.on('message', async (topic, message) => {
      console.log(topic, message.toString());
      // 토픽 인식하기
      const topicType = topic.split('/')[TOPIC_TYPE_INDEX];
      const messageJson = JSON.parse(message);

      try {
        switch (topicType) {
          case 'data':
            db.insertData({
              idx: messageJson.idx,
              device_id: messageJson.device_id,
              temp: messageJson.temp,
              humidity: messageJson.humidity,
              light: messageJson.light,
              moisture: messageJson.moisture,
              created_at: messageJson.created_at,
            });
            break;
          default:
            console.log("This topic isn't assigned");
            break;
        }
      } catch (err) {
        console.log(err);
      }
    });
  }
}

export default mqttSetup;
