# Homebrew 확인
    brew -v
# Homebrew 설치
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# JDK21 설치
    brew install openjdk@21
# 설치경로 등록(zsh기준)
    echo 'export PATH="/opt/homebrew/opt/openjdk@21/bin:$PATH"' >> ~/.zshrc
    source ~/.zshrc

# 자바 버전 확인(동작확인)
    java -version
    예시 출력
    openjdk version "21.0.2" 2024-01-16
    OpenJDK Runtime Environment ...
    OpenJDK 64-Bit Server VM ...