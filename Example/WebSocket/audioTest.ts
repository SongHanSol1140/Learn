import WebSocket from 'ws'; // ws 패키지에서 WebSocket을 가져옵니다.

const ws = new WebSocket("wss://nanonix.lol/aiorder");

ws.on('open', () => {
  console.log("WebSocket 연결이 성공적으로 열렸습니다.");

  // 서버로 테스트 메시지 전송
  ws.send(JSON.stringify({ type: "test", message: "안녕하세요, 서버!" }));
});

ws.on('message', (data) => {
  console.log("서버로부터 메시지를 받았습니다:", data.toString());

  try {
    const parsedData = JSON.parse(data.toString());
    console.log("파싱된 데이터:", parsedData);
  } catch (error) {
    console.error("JSON 파싱 에러:", error);
  }
});

ws.on('error', (error) => {
  console.error("WebSocket 오류:", error);
});

ws.on('close', (code, reason) => {
  console.log(`WebSocket 연결이 종료되었습니다. 코드: ${code}, 이유: ${reason}`);
});
