# 홈브루 설치
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 모스키토 설치
    brew install mosquitto

# 모스키토 버전 확인
    mosquitto -v

# 모스키토 실행
    brew services start mosquitto
# 모스키토 종료
    brew services stop mosquitto
# 모스키토 재시작
    brew services restart mosquitto


# 모스키토 수동 실행(테스트용)
    mosquitto -c /opt/homebrew/etc/mosquitto/mosquitto.conf

# 홈브루 모스키토 경로확인
    ls /opt/homebrew/etc/mosquitto
# 설정파일 편집
    nano /opt/homebrew/etc/mosquitto/mosquitto.conf
    혹은
    open /opt/homebrew/etc/mosquitto
    접속후 파일찾아서 코드편집기로 실행

# 1. 비밀번호 설정
    첫 사용자 등록
    cd /opt/homebrew/etc/mosquitto
    mosquitto_passwd -c /opt/homebrew/etc/mosquitto/passwd your_username
    mosquitto_passwd -c /opt/homebrew/etc/mosquitto/auth.txt nanonix
    -c: 새 비밀번호 파일을 생성합니다. 기존 파일이 있으면 덮어씁니다.
    your_username: 원하는 사용자 이름으로 대체합니다.
    비밀번호 두번입력
    추가 사용자 등록시 -c만 빼면 됩니다. (-c => 파일생성)
# 2. 비밀번호 사용 설정
    nano /opt/homebrew/etc/mosquitto/mosquitto.conf
    설정 파일에 아래 내용을 추가
    allow_anonymous false
    password_file /opt/homebrew/etc/mosquitto/passwd



# MQTT WebSocket https 사용방법
    mosquitto.conf 수정
    
    구문추가
    # WSS
    listener 8083
    allow_anonymous false
    protocol websockets
    cafile   /opt/homebrew/etc/mosquitto/https/domain.cert.pem
    certfile /opt/homebrew/etc/mosquitto/https/domain.cert.pem
    keyfile /opt/homebrew/etc/mosquitto/https/private.key.pem
    
    단, '/opt/homebrew/etc/mosquitto/https/' 링크에 제대로된 인증서가 있어야함