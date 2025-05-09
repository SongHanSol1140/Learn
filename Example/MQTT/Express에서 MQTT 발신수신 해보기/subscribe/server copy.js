var express = require('express');
var mqtt = require('mqtt');
var app = express();

var client = mqtt.connect('mqtt://192.168.0.44:1883');


client.on('connect', function () {
    // 여기에 구독명
    client.subscribe('DoorServer', function (err) {
        if (!err) {
        console.log('Connected to MQTT broker');
        }
    });

});


client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    client.publish('coldbrewMachineSetup', "initInfo");
});

app.listen(8083, function () {
console.log('포트 8083 서버실행 완료');
});