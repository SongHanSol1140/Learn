// subscribe Test
const fs = require('fs');
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
// var client = mqtt.connect('mqtt://172.20.10.11:1883', Options);
// var client = mqtt.connect('mqtt://127.0.0.1:1883');

// 일반 메세지 전송
client.on('connect', function () {
    console.log('Connected to MQTT broker');
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


var message = {
    tableNumber: 1,
    cleaningRobotState: false
}

// client.publish('temperature', JSON.stringify(message));
client.publish("DoorModule", "openDoor");

// setInterval(() => {

//     client.publish("Door/", "1");
    
//     setTimeout(() => {
//         client.publish("Door", "pos2");
//     }, 3000);
// }, 6000);


// setInterval(() => {
//     client.publish("gripper", "pos9");
// },100);


// var client2 = mqtt.connect('wss://nanonix.help:8083'); // 웹소켓 연결 사용
// // var client2 = mqtt.connect('ws://192.168.0.210:8083', Options); // 웹소켓 연결 사용
// client2.on('connect', function () {
//     console.log("test!");
//     client2.publish('websocket_test', 'Hello from WebSocket!');
    
// });
// client2.on('error', function (err) {
//     console.log('MQTT Error: ', err);
// });

// client2.on('offline', function () {
//     console.log('MQTT client2 is offline');
// });

// client2.on('reconnect', function () {
//     console.log('MQTT client2 is trying to reconnect');
// });

