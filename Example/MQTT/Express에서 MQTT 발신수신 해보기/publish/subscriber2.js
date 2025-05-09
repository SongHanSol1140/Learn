var express = require('express');
var mqtt = require('mqtt');
var app = express();
const Options = {
    clientId: `test${Math.random().toString(16).substr(2, 8)}`, // 랜덤 클라이언트 ID 생성
    username: 'nanonix', // 브로커 로그인 아이디
    password: '$@43nanonix', // 브로커 로그인 비밀번호
    reconnectPeriod: 1000, // 재연결 간격(ms)
    connectTimeout: 30 * 1000, // 연결 타임아웃(ms)
};
var client = mqtt.connect('mqtt://192.168.0.230:1883', Options);


client.on('connect', function () {
    // // 여기에 구독명입력
    client.subscribe('DoorServer', { qos: 2 }, function (err) {
        if (!err) {
            console.log('Connected to MQTT broker');
        }
    });
});

// // 설정값 받기
client.on('message', function (topic, message) {
    // message is Buffer
    // if(topic == "coldbrewController") {
    console.log(message.toString());
    // }
});