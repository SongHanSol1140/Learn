// subscribe Test
var express = require('express');
var mqtt = require('mqtt');


const Options = {
    clientId: `test${Math.random().toString(16).substr(2, 8)}`, // 랜덤 클라이언트 ID 생성
    username: 'nanonix', // 브로커 로그인 아이디
    password: '$@43nanonix', // 브로커 로그인 비밀번호
    reconnectPeriod: 1000, // 재연결 간격(ms)
    connectTimeout: 30 * 1000, // 연결 타임아웃(ms)
};
var client = mqtt.connect('mqtt://192.168.0.230:1883', Options);


client.on('connect', function () {
    // 여기에 구독명
    console.log("1883 MQTT 연결");
    client.subscribe('controller', function (err) {
        if (!err) {
            console.log('Connected to MQTT broker');
        }
    });
    client.subscribe('gripper')

});
client.on('error', function (err) {
  console.error('연결 오류:', err);
});


client.on('message', function (topic, message) {
    // message is Buffer
    if(topic == "gripper"){
      console.log("gripper : " + message.toString())
    };
    if(topic == "controller"){
      console.log("controller : " + message.toString())
    };
});


var client2 = mqtt.connect('wss://nanonix.help:8083');

client2.on('connect', function () {
  console.log('8083 WSS 연결.');
  // 'Test' 토픽 구독
  client2.subscribe('test', function (err) {
    if (!err) {
      console.log('websocket_test 토픽을 구독했습니다.');
    } else {
      console.log('구독 오류: ', err);
    }
  });
});

client2.on('message', function (topic, message) {
  // 메시지를 수신하면 처리하는 부분입니다.
  console.log('토픽:', topic, '메시지:', message.toString());
});


client2.on('error', function (err) {
    console.error('WebSocket Error:', err);
});

client2.on('offline', function () {
    console.log('MQTT client2 via WebSocket is offline');
});

client2.on('reconnect', function () {
    console.log('MQTT client2 is trying to reconnect');
});