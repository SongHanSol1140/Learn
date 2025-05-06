#include <WiFi.h>      // 와이파이를 사용하기 위해
#include <WebServer.h> // 웹서버를 사용하기 위해
#include <PubSubClient.h>

// 밑의 mqttCallback에서 JSON형식 데이터를 파싱하기 위함
// JSON으로 보내고 싶다면 sendMqttJson함수 참조
#include <ArduinoJson.h>

// SSID & Password
const char *ssid = "NNX-2.4G";
const char *password = "$@43skshslrtm";
const char *mqttServer = "192.168.0.137";
const int mqttPort = 1883;

// 고정 IP 설정
IPAddress ip(192, 168, 0, 2);
IPAddress gateway(192, 168, 0, 1);
IPAddress subnet(255, 255, 255, 0);

// 포트 설정
const int serverPort = 8083;
WebServer server(serverPort);

WiFiClient espClient;
PubSubClient client(espClient);

void handle_root();

// HTML 페이지
#if 1
const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html>
  <meta charset="UTF-8"><!-- 한글을 출력하기 위한 인코딩설정 -->
  <head>
  <script>
    function sendRequest(action) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/" + action, true);
        xhr.send();
    }
    function sendInputValue(){
      var input = document.getElementById("inputValue").value;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "/input?value=" + input, true);
      xhr.send();
    }   

  </script>
  </head>
  <body>
    <section>
        <h2>함수 실행해보기</h2>
        <p><button onclick="sendRequest('on')">ON버튼</button> </p>
        <p><button onclick="sendRequest('off')">OFF버튼</button> </p>
    </section>
    <section>
        <h2>input값 시리얼 모니터에 전송하기</h2>
        <input type="text" id="inputValue" placeholder="전송할 값 입력">
        <button onclick="sendInputValue()">전송</button>
    </section>
  </body>
</html>
)rawliteral";
#endif

//---------------------------------------------------------------
// 페이지 요청이 들어 오면 처리 하는 함수
void handle_root()
{
    server.send(200, "text/html", index_html);
}
//---------------------------------------------------------------
// HTML 조작 함수
void setLedStatusOn()
{
    Serial.println("ON 함수 실행");
}
void setLedStatusOff()
{
    Serial.println("OFF 함수 실행");
}

void handleInput()
{
    if (server.hasArg("value"))
    {
        String value = server.arg("value");
        Serial.println("input값 출력");
        Serial.println(value);
    }
    server.send(200, "text/html", index_html);
}

// MQTT JSON 포맷으로 데이터 전송하기
void sendMqttJson()
{
    StaticJsonDocument<200> doc;
    // JSON 오브젝트에 cleaningRobotState 값을 추가
    doc["cleaningRobotState"] = "true";
    // JSON 형식의 문자열로 변환
    char json[200];
    serializeJson(doc, json);
    // MQTT 브로커에 데이터 전송
    client.publish("outTopic", json);
}

//---------------------------------------------------------------
void InitWebServer()
{
    // 페이지 요청 처리 함수 등록
    server.on("/", handle_root);
    server.on("/on", HTTP_GET, setLedStatusOn);
    server.on("/off", HTTP_GET, setLedStatusOff);
    server.on("/input", HTTP_GET, handleInput);
    server.begin();
}

//---------------------------------------------------------------

void setup()
{
    Serial.begin(9600);
    // WIFI 접속
    setup_wifi();
    InitWebServer();
    Serial.println("HTTP server started");

    // MQTT 브로커 접속
    client.setServer(mqttServer, mqttPort);
    client.setCallback(mqttCallback);
    setup_mqtt();
    delay(100);
    client.subscribe("outTopic");
    // client.publish("outTopic", "hello world");
    // 이거 json형식 아니라서 json으로 받을때 보내면 오류로 장치 멈춤
}

void loop()
{
    server.handleClient();
    client.loop();
}

// 와이파이 접속
void setup_wifi()
{
    // 시리얼 통신 초기화(실행), 전송속도 설정

    // 고정 IP 설정
    if (!WiFi.config(ip, gateway, subnet))
    {
        Serial.println("STA Failed to configure");
    }
    // 먼저 WiFi 네트워크에 연결합니다.
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);

    WiFi.begin(ssid, password);

    // 와이파이가 접속이 됬는지 확인
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print("연결 시도중!");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
    Serial.print("Port address: ");
    Serial.println(serverPort);
}
// MQTT 수신 콜백 함수
// void mqttCallback(char *topic, byte *payload, unsigned int length){
//     Serial.print("메시지 도착 [");
//     Serial.print(topic);
//     Serial.print("] ");
//     for (int i = 0; i < length; i++){
//         Serial.print((char)payload[i]);
//     }
//     Serial.println();
// }

// JSON파싱을 위한 MQTT 콜백함수
// MQTT JSON 받기
void mqttCallback(char *topic, byte *payload, unsigned int length){
    Serial.print("Topic Name [");
    Serial.print(topic);
    Serial.println("] ");

    char json[length + 1];
    for (int i = 0; i < length; i++){
        json[i] = (char)payload[i];
    }
    json[length] = '\0';
    Serial.println(json);
    
    // Parse JSON
    StaticJsonDocument<200> doc;
    DeserializationError error = deserializeJson(doc, json);
    // json형식이 아닐때를 위한 에러 핸들링
    if (error) {
        Serial.print(F("deserializeJson() failed: "));
        Serial.println(error.f_str());
        return;
    }

    // Extract values
    bool cleaningRobotState = doc["cleaningRobotState"];

    if (cleaningRobotState == false){
        cleaningRobotState = false;
        Serial.println("청소봇 호출 끝");
    }
}

// MQTT 재접속
void setup_mqtt()
{
    while (!client.connected())
    {
        if (client.connect("ESP32MQTTBrokerClient"))
        {
            Serial.println("MQTT 브로커에 연결됨");
            client.publish("outTopic", "hello world");
            client.subscribe("outTopic");
        }
        else
        {
            Serial.print("MQTT 브로커 연결 실패, 상태코드: rc =  ");
            Serial.print(client.state());
            Serial.println(" 3초 후 재시도...");
            delay(3000);
        }
    }
}
