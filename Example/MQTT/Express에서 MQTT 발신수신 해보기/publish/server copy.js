const fs = require('fs');
var express = require('express');
var mqtt = require('mqtt');
var app = express();
// 모든 접속허용시 IP만 입력
// var client = mqtt.connect('mqtt://127.0.0.1:1883');

// MQTT 브로커에 연결할 때 사용자 이름과 패스워드를 포함한 옵션 설정
var options = {
    clientId: 'admin' ,
    username: 'admin', // 사용자 이름
    password: 'admin',  // 패스워드
    // clientId: 'coldbrewESP32_1' ,
    // username: 'coldbrewESP32_1', // 사용자 이름
    // password: 'coldbrewESP32_1',  // 패스워드
    host: '192.168.0.49',
    port: 1883

};
var client = mqtt.connect(options);

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
client.publish('packing1', "/30");
// client.publish('coldbrewMachineSetup', "timer4/60");
