# Step_2_ReactPageHosting
# Spring Initializr
    https://start.spring.io/
    
    Package name : spring.study.step_1_helloworld
    Packaging : Jar
    Java : 21

    Dependencies
        Spring Web
        Spring Book DevTools
        Spring Data JPA(DB연결을 안해주면 실행에러가남)
        Validation
        LOMbok
# ------------------------------------------------------------------------
# 인텔리제이 DB연결 해주기
# src/main/resources/application.properties 파일을 열고 아래 내용을 추가
    # PostgreSQL DATABASE 연결 설정
    spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
    spring.datasource.username=[YOUR_DB_USERNAME]
    spring.datasource.password=[YOUR_DB_PASSWORD]
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

# ------------------------------------------------------------------------
이제 localhost:8080/helloworld로 접속이 가능합니다.
