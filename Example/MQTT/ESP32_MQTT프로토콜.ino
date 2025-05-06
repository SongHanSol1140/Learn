#include <WiFi.h>      // 와이파이를 사용하기 위해
#include <WebServer.h> // 웹서버를 사용하기 위해

// SSID & Password
const char *ssid = "NNX2-2.4G";
const char *password = "$@43skshslrtm";
bool autoMode = false;
String receivedData = "";

unsigned long startTime = 0;
WebServer server(80); // Object of WebServer(HTTP port, 80 is defult)
//---------------------------------------------------------------
//---------------------------------------------------------------
void handle_root();
// HTML 페이지
#if 1
const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html>
  <head>
    <!-- 한글 깨짐방지 -->
    <meta charset="UTF-8">
  </head>
  <body>
    20초마다 문자열을 출력할 수 있을까
  </body>
</html>
)rawliteral";
#endif

void handle_root(){
    server.send(200, "text/html", index_html);
//---------------------------------------------------------------
//---------------------------------------------------------------
}
// 자동 모드
void onAuto(){
  autoMode = true;
  server.send(200, "text/plain", "AutoMode ON");
}

// 수동 모드
void offAuto(){
  autoMode = false;
  startTime = millis();
  server.send(200, "text/plain", "AutoMode OFF");
}

void InitWebServer(){
    // 요청 처리 함수 등록
    server.on("/", handle_root);
    server.on("/onauto", onAuto);
    server.on("/offauto", offAuto);
    server.begin();
}


//---------------------------------------------------------------
//---------------------------------------------------------------

void setup(){                       // 실행시
    Serial.begin(115200); // 시리얼 통신 초기화(실행), 전송속도 설정
    Serial.println("ESP32 WEB Start");
    Serial.println(ssid);

    // WiFi 접속
    WiFi.begin(ssid, password);
    // 접속 완료 할때까지 재시도
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.println("접속시도중");
        delay(1000);
    }
    // WIFI에 접속이 된다면 IP번호 출력
    Serial.print("Wifi IP: ");
    Serial.println(WiFi.localIP());

    InitWebServer();

    Serial.println("HTTP server started");
    delay(3000);



  // UART1 초기화(RX: GPIO 16, TX: GPIO 17)
  Serial1.begin(115200, SERIAL_8N1, 16, 17);

  // UART2 초기화(RX: GPIO 18, TX: GPIO 19)
  Serial2.begin(115200, SERIAL_8N1, 18, 19);
}

//---------------------------------------------------------------
// 바퀴에 속도 데이터 전송
void sendBytes(const byte* sequence, size_t size) {
  for (size_t i = 0; i < size; ++i) {
    Serial2.write(sequence[i]);
  }
}
//---------------------------------------------------------------

void loop(){
  server.handleClient();
// --------------------------------------------
  if(autoMode){
    // UART1(본체)에서 데이터를 읽어서 모터로 전송
    while (Serial1.available()) {
      char data = Serial1.read();
      Serial2.write(data);
      if (data == 0xD5) {
        receivedData.toUpperCase();
        Serial.println(receivedData);
        receivedData = "";
      }
      receivedData += String(data, HEX);
      receivedData += " ";
    }

    
    // UART2(모터)에서 데이터를 읽어서 본체로 전송
    while (Serial2.available()) {
      char data = Serial2.read();
      Serial1.write(data);
      if (data == 0xD5) {
        receivedData.toUpperCase();
        Serial.println(receivedData);
        receivedData = "";
      }
      receivedData += String(data, HEX);
      receivedData += " ";
    }
  
// --------------------------------------------
  }else{
// --------------------------------------------
    // 수동 회피
    byte Speed[] = {0xD5, 0x5D, 0xFE, 0x0A, 0x83, 0x20, 0x02, 0x0A, 0x49, 0x80, 0x0B, 0x49, 0x00, 0xD4};
    sendBytes(Speed, sizeof(Speed));
    delay(10);

    // UART1(본체)에서 데이터를 읽어서 모터로 전송
    while (Serial1.available()) {
      char data = Serial1.read();

      if (data == 0xD5) {
        receivedData.toUpperCase();
        Serial.println(receivedData);
        receivedData = "";
        
      }
      receivedData += String(data, HEX);
    }    
  }
// --------------------------------------------
}



//---------------------------------------------------------------
//---------------------------------------------------------------
void setup_wifi() {
    // 먼저 WiFi 네트워크에 연결합니다.
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print("연결 시도중!");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}