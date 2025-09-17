# visx 다운로드
https://github.com/earlephilhower/arduino-littlefs-upload?tab=readme-ov-file

하단 버튼눌러서 링크 이동 후 arduino-littlefs-upload-1.5.4.vsix 다운로드
# 설치폴더 열기
open ~/.arduinoIDE
# 새로운 폴더만들기 (이미 있을경우 그대로 사용)
~/.arduinoIDE/plugins 폴더 생성
# 해당 plugins 폴더에 .visx파일 옮기기
이후 아두이노 재부팅

# 업로드 방법

# 커맨드라인 호출
command(Ctrl) + Shift + P
# 명령어 입력 - 선택
Upload LittleFS to Pico/ESP8266/ESP32 
이후 .ino폴더 기준 ./data 경로에 있는 파일들이 전송됨
<!-- 시리얼모니터를 꺼야 업로드가 가능합니다.-->

# 라이브러리 재확인
Arduino Library Manager에서 아래 이름 그대로 설치:
기존 ESPAsyncWebServer 삭제
라이브러리 설치
ESP Async WebServer (제작자: ESP32Async)
Async TCP (제작자: ESP32Async)