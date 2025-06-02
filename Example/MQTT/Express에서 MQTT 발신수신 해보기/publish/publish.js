// publish Test
var express = require('express');
var mqtt = require('mqtt');
var app = express();
const Options = {
    clientId: `publish_test${Math.random().toString(16).substr(2, 8)}`, // 랜덤 클라이언트 ID 생성
    username: 'nanonix', // 브로커 로그인 아이디
    password: '$@43nanonix', // 브로커 로그인 비밀번호
    reconnectPeriod: 1000, // 재연결 간격(ms)
    connectTimeout: 30 * 1000, // 연결 타임아웃(ms)
};
// var client = mqtt.connect('mqtt://192.168.0.230:9001', Options);
var client = mqtt.connect('wss://nanonix.lat:8083', Options);

// 일반 메세지 전송

// const msg = {
//     1: [123, 124],
//     2: [125],
//     3: [126]
// };
const msg = "asdf"
const payload = JSON.stringify(msg);
client.on('connect', function () {
    console.log("MQTT Publisher 연결");
    client.publish("Module", payload, { qos: 2 });
});
client.on('error', function (err) {
    console.log('MQTT Error: ', err);
});

client.on('offline', function () {
    console.log('MQTT client is offline');
});

client.on('reconnect', function () {
    console.log('MQTT client is trying to reconnect');

});

client.publish('test', "asdfasdfasdfsadf");
