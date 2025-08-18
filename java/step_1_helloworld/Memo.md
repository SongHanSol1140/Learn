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
# ------------------------------------------------------------------------
# Postgress 설치
    brew install postgresql@17
# PATH 등록(zshrc)
    echo 'export PATH="/opt/homebrew/opt/postgresql@17/bin:$PATH"' >> ~/.zshrc
    source ~/.zshrc
# 서비스 시작
    brew services start postgresql@17
# 버전 확인
    psql --version

# DB 접속
    psql postgres
    처음 실행 시 현재 macOS 사용자 이름과 동일한 DB 유저로 접속됩니다.
# ------------------------------------------------------------------------
# Spring Initializr
    https://start.spring.io/
    
    Package name : spring.study.step_1_helloworld
    Packaging : Jar
    Java : 21

    Dependencies
        Spring Web
        Validation
        Spring Data JPA(DB연결을 안해주면 실행에러가남)
# ------------------------------------------------------------------------
# 인텔리제이 DB연결 해주기
# src/main/resources/application.properties 파일을 열고 아래 내용을 추가
    # PostgreSQL DATABASE 연결 설정
    spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
    spring.datasource.username=[YOUR_DB_USERNAME]
    spring.datasource.username=[YOUR_DB_PASSWORD]
    spring.jpa.hibernate.ddl-auto=update

    # 콘솔에 JPA/SQL 쿼리 로그 보기 (선택 사항)
    spring.jpa.show-sql=true

# build.gradle에 추가
    dependencies {
	    ...
        // 이 줄을 추가하세요
	    runtimeOnly 'org.postgresql:postgresql'
    }

# /helloworld 엔드포인트 추가
    package spring.study.step_1_helloworld;

    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.RestController;

    @RestController
    public class HelloWorld {
        @GetMapping("/helloworld")
        public String sayHello(){
        return "Hello World!";
        };
    }

이제 localhost:8080/helloworld로 접속이 가능합니다.