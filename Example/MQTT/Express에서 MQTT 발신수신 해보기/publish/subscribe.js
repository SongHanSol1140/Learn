// subscribe Test
var express = require('express');
var mqtt = require('mqtt');


const Options = {
  clientId: `subscribe_test`, // 랜덤 클라이언트 ID 생성
  username: 'nanonix', // 브로커 로그인 아이디
  password: '$@43nanonix', // 브로커 로그인 비밀번호
  reconnectPeriod: 1000, // 재연결 간격(ms)
  connectTimeout: 30 * 1000, // 연결 타임아웃(ms)
  clean: false,
};
var client = mqtt.connect('mqtt://192.168.0.230:1883', Options);


client.on('connect', function () {
  // 여기에 구독명
  console.log("MQTT Subscriber 연결");
  client.subscribe('DoorModule', { qos: 2 }, (err) => {
    if (!err) {
      console.log('Connected to MQTT broker');
    }
  });

});
client.on('error', function (err) {
  console.error('연결 오류:', err);
});


client.on('message', function (topic, message) {
  console.log(message.toString());
});

