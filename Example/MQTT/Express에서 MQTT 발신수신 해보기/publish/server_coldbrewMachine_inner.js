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
    host: '192.168.0.44',
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

// client.publish('middleServer1_Response', "coffeeMachine/status/3", { qos: 2 });
// }, 200)



// ESP32_1 설정변경 MQTT메세지
// 설정값 받기
// client.publish('coldbrewMachineSetup', "initInfo");

// client.publish('coldbrewMachineSetup', "tmpSetDecafP/35");
client.publish('coldbrewMachineSetup', "tmpSetCBP/33");
// client.publish('coldbrewMachineSetup', "tmpDecafOLimit/55");
// client.publish('coldbrewMachineSetup', "tmpCBOLimit/80");
// client.publish('coldbrewMachineSetup', "coolingStatus/true");
// client.publish('coldbrewMachineSetup', "coldbrewCoolingStatus/false");

// client.publish('coldbrewMachineSetup', "ctDecafScale/1");
// client.publish('coldbrewMachineSetup', "ctCBScale/120");
// client.publish('coldbrewMachineSetup', "ctCoolerScale/120");
// client.publish('coldbrewMachineSetup', "ctDecafLimit/30");
// client.publish('coldbrewMachineSetup', "ctCoolerLimit/60");
// client.publish('coldbrewMachineSetup', "limitScale2/60");
// client.publish('coldbrewMachineSetup', "totalFlow1/0.0");
// client.publish('coldbrewMachineSetup', "totalFlow2/0.0");
// client.publish('coldbrewMachineSetup', "flowLimit1/500");
// client.publish('coldbrewMachineSetup', "flowLimit2/1000")
;
// client.publish('coldbrewMachineSetup', "limitLevel/200");
// client.publish('coldbrewMachineSetup', "limitLevelMin/300");
// client.publish('coldbrewMachineSetup', "limitLevelMax/100");
// client.publish('coldbrewMachineSetup', "decafCleanCount/2");
// client.publish('coldbrewMachineSetup', "decafCleanTime/60");
// client.publish('coldbrewMachineSetup', "cbCleanCount/2");
// client.publish('coldbrewMachineSetup', "cbCleanTime/60");
// client.publish('coldbrewMachineSetup', "timer1/1");
// client.publish('coldbrewMachineSetup', "timer2/10");
// client.publish('coldbrewMachineSetup', "timer3/30");
// client.publish('coldbrewMachineSetup', "timer4/60");
