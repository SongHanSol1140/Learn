import WebSocket from 'ws'
const ws = new WebSocket('wss://nanonix.lat/aiorder');

ws.on('open', function open() {
  console.log('Connected to server');
});

ws.on('close', function close() {
  console.log('Disconnected from server');
});
ws.on('message', function incoming(data) {
  console.log(data);
});