import WebSocket from 'ws';

// 웹소켓 서버 생성
const wss = new WebSocket.Server({ port: 8083 });
let connectionCount = 0;
let count = 0;

wss.on('connection', function connection(ws) {
  connectionCount++;
  console.log('Connected clients:', connectionCount);

  ws.on('message', function incoming(message) {
    const msgString = message.toString(); // Buffer를 문자열로 변환
    console.log('Received:', msgString);

    // 특정 메시지를 수신했을 때 응답 메시지 보내기
    if (msgString === '특정메세지') {
      ws.send('특정메세지 받음');
    }
  });

  ws.on('close', function close() {
    connectionCount--;
    console.log('Connected clients:', connectionCount);
  });
});

// 1초마다 count를 +1씩 해서 모든 클라이언트에게 전송
setInterval(() => {
  count++;
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(`Count: ${count}`);
    }
  });
}, 1000);

console.log('WebSocket server is running on ws://localhost:8083');
