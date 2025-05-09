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

// 커피머신 세정명령
var count = 0;
client.on('message', function (topic, message) {
    // console.log(message.toString());
    // message is Buffer
    var keyWord = message.toString().split('/');
    if (keyWord[0] == "coffeeMachine" && keyWord[1] == "status") {
        console.log("상태확인");
        console.log(message.toString());
        // 1. 커피머신 상태확인
        count++;
        if (count == 1) {
            console.log("대기중");
            client.publish('middleServer1_Response', "coffeeMachine/status/true", { qos: 2 });
        } else {
            console.log("작동중");
            client.publish('middleServer1_Response', "coffeeMachine/status/false", { qos: 2 });
            count = 0;
        }
    }
    // 1. 커피머신 세정
    if (keyWord[0] == "coffeeMachine" && keyWord[1] == "cleaning") {
        console.log("세정시작");
        client.publish('middleServer1_Response', "coffeeMachine/status/false", { qos: 1 });
        setTimeout(function () {
            console.log("세정종료");
            client.publish('middleServer1_Response', "coffeeMachine/status/true", { qos: 1 });
        }, 10000);
    }
    // 2. 커피머신 하단부 세정
    if (keyWord[0] == "coffeeMachine" && keyWord[1] == "cleaningLower") {
        // 5초후에 세정완료 메세지 전송
        setTimeout(function () {
            client.publish('middleServer1_Response', "coffeeMachine/status/true", { qos: 1 });
        }, 5000);
    }
    if (keyWord[0] == "coffeeMachine" && keyWord[1] == "cleaningDecafCycle") {
        // 5초후에 세정완료 메세지 전송
        setTimeout(function () {
            client.publish('middleServer1_Response', "coffeeMachine/status/true", { qos: 1 });
        }, 5000);
    }
});

app.listen(8083, function () {
    console.log('포트 8083 서버실행 완료');
});
