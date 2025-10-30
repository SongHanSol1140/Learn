# 🎯 Phase 1: Spring 기초 & 환경 설정 완전 가이드

## 📋 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [개발 환경 설정](#개발-환경-설정)
3. [프로젝트 생성 및 구조 이해](#프로젝트-생성-및-구조-이해)
4. [핵심 개념 학습](#핵심-개념-학습)
5. [실습: Hello Spring API 구현](#실습-hello-spring-api-구현)
6. [추가 학습 자료](#추가-학습-자료)
7. [체크리스트](#체크리스트)

---

## 프로젝트 개요

### 🎯 학습 목표
- Spring Boot 프로젝트 구조 완벽 이해
- REST API 설계 및 구현
- IoC/DI 개념 체득
- Spring 계층 구조 패턴 적용

### 📦 최종 결과물
간단한 User 관리 REST API 서버
- 사용자 CRUD 기능
- 메모리 기반 데이터 저장
- 기본 예외 처리
- Swagger API 문서

---

## 개발 환경 설정

### 필수 도구 설치
```bash
# Java 17 설치 확인
java -version

# 설치되어 있지 않다면 (Mac 기준)
brew install openjdk@17

# 환경변수 설정
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export PATH=$JAVA_HOME/bin:$PATH
```

### IDE 설정
1. **IntelliJ IDEA** (추천) 또는 VS Code
2. IntelliJ 플러그인 설치:
   - Spring Boot Assistant
   - Lombok Plugin
   - Key Promoter X (단축키 학습용)

---

## 프로젝트 생성 및 구조 이해

### 1. Spring Initializr로 프로젝트 생성

[start.spring.io](https://start.spring.io) 접속 또는 IntelliJ에서 직접 생성

**설정값:**
```yaml
Project: Maven (또는 Gradle)
Language: Java
Spring Boot: 3.2.x (최신 안정 버전)
Group: com.example
Artifact: hello-spring-api
Name: HelloSpringApi
Package name: com.example.hellospringapi
Packaging: Jar
Java: 17

Dependencies:
  - Spring Web
  - Spring Boot DevTools
  - Lombok
  - Spring Validation
```

### 2. 프로젝트 구조 이해

```
hello-spring-api/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/hellospringapi/
│   │   │       ├── HelloSpringApiApplication.java  # 메인 클래스
│   │   │       ├── controller/                     # 컨트롤러 계층
│   │   │       ├── service/                        # 서비스 계층
│   │   │       ├── repository/                     # 레포지토리 계층
│   │   │       ├── domain/                         # 도메인 모델
│   │   │       ├── dto/                           # DTO 클래스
│   │   │       ├── exception/                      # 예외 처리
│   │   │       └── config/                        # 설정 클래스
│   │   └── resources/
│   │       ├── application.yml                     # 애플리케이션 설정
│   │       └── static/                            # 정적 리소스
│   └── test/                                      # 테스트 코드
├── pom.xml (또는 build.gradle)                     # 의존성 관리
└── README.md
```

---

## 핵심 개념 학습

### 1. IoC (Inversion of Control) & DI (Dependency Injection)

#### 개념 설명
```java
// ❌ 전통적인 방식 - 강한 결합
public class UserService {
    // UserService가 직접 UserRepository를 생성하고 제어
    private UserRepository userRepository = new UserRepository();
    
    public void saveUser(User user) {
        userRepository.save(user);
    }
}

// ✅ Spring IoC/DI 방식 - 느슨한 결합
@Service  // Spring이 이 클래스의 인스턴스를 생성하고 관리
public class UserService {
    // Spring이 UserRepository 인스턴스를 주입(DI)
    private final UserRepository userRepository;
    
    // 생성자 주입 (권장 방식)
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public void saveUser(User user) {
        userRepository.save(user);
    }
}
```

#### IoC 컨테이너의 동작 원리
```java
/*
 * Spring IoC 컨테이너 (ApplicationContext)의 역할:
 * 1. 빈(Bean) 생성: @Component, @Service, @Repository 등이 붙은 클래스를 스캔
 * 2. 의존성 주입: 필요한 곳에 자동으로 객체 주입
 * 3. 생명주기 관리: 객체의 생성부터 소멸까지 관리
 */
```

### 2. Spring 계층 구조와 어노테이션

```java
// 1️⃣ Controller 계층 - 요청/응답 처리
@RestController  // @Controller + @ResponseBody
@RequestMapping("/api/users")  // 기본 URL 매핑
public class UserController {
    // HTTP 요청을 받아 처리하고 응답 반환
}

// 2️⃣ Service 계층 - 비즈니스 로직
@Service  // @Component의 특수화, 서비스 계층 명시
public class UserService {
    // 비즈니스 로직 처리
}

// 3️⃣ Repository 계층 - 데이터 접근
@Repository  // @Component의 특수화, 데이터 접근 계층 명시
public class UserRepository {
    // 데이터 저장/조회 로직
}

// 4️⃣ Component - 일반적인 Spring Bean
@Component  // Spring이 관리하는 컴포넌트
public class UserValidator {
    // 유틸리티나 헬퍼 클래스
}
```

---

## 실습: Hello Spring API 구현

### Step 1: Domain 모델 생성

```java
package com.example.hellospringapi.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * User 도메인 모델
 * - Lombok을 사용하여 보일러플레이트 코드 최소화
 * - Builder 패턴으로 객체 생성 편의성 제공
 */
@Getter
@Setter
@NoArgsConstructor  // 기본 생성자
@AllArgsConstructor // 모든 필드를 받는 생성자
@Builder           // 빌더 패턴 적용
public class User {
    private Long id;
    private String username;
    private String email;
    private String password;
    private Integer age;
    private String role;  // "USER", "ADMIN"
    
    // 비즈니스 로직 메서드도 포함 가능
    public boolean isAdmin() {
        return "ADMIN".equals(this.role);
    }
}
```

### Step 2: DTO (Data Transfer Object) 생성

```java
package com.example.hellospringapi.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 사용자 생성 요청 DTO
 * - 클라이언트로부터 받는 데이터 구조 정의
 * - 유효성 검증 규칙 포함
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateRequest {
    
    @NotBlank(message = "사용자명은 필수입니다")
    @Size(min = 3, max = 20, message = "사용자명은 3-20자 사이여야 합니다")
    private String username;
    
    @NotBlank(message = "이메일은 필수입니다")
    @Email(message = "올바른 이메일 형식이 아닙니다")
    private String email;
    
    @NotBlank(message = "비밀번호는 필수입니다")
    @Size(min = 8, message = "비밀번호는 최소 8자 이상이어야 합니다")
    private String password;
    
    @Min(value = 1, message = "나이는 1세 이상이어야 합니다")
    @Max(value = 150, message = "나이는 150세 이하여야 합니다")
    private Integer age;
}

/**
 * 사용자 응답 DTO
 * - 클라이언트에게 반환할 데이터 구조
 * - 민감한 정보(비밀번호 등) 제외
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private Integer age;
    private String role;
    
    // User 엔티티를 DTO로 변환하는 정적 팩토리 메서드
    public static UserResponse from(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .age(user.getAge())
                .role(user.getRole())
                .build();
    }
}

/**
 * 사용자 수정 요청 DTO
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {
    
    @Email(message = "올바른 이메일 형식이 아닙니다")
    private String email;
    
    @Size(min = 8, message = "비밀번호는 최소 8자 이상이어야 합니다")
    private String password;
    
    @Min(value = 1, message = "나이는 1세 이상이어야 합니다")
    @Max(value = 150, message = "나이는 150세 이하여야 합니다")
    private Integer age;
}
```

### Step 3: Repository 계층 구현

```java
package com.example.hellospringapi.repository;

import com.example.hellospringapi.domain.User;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

/**
 * 메모리 기반 User Repository 구현
 * - 실제 프로젝트에서는 JPA/데이터베이스 사용
 * - Thread-safe를 위해 ConcurrentHashMap 사용
 */
@Repository
public class UserRepository {
    
    // 메모리 저장소 (Thread-safe)
    private final Map<Long, User> userStore = new ConcurrentHashMap<>();
    
    // ID 생성기 (Thread-safe)
    private final AtomicLong idGenerator = new AtomicLong(1L);
    
    /**
     * 사용자 저장
     * @param user 저장할 사용자
     * @return 저장된 사용자 (ID 포함)
     */
    public User save(User user) {
        // 새로운 사용자인 경우 ID 할당
        if (user.getId() == null) {
            user.setId(idGenerator.getAndIncrement());
        }
        userStore.put(user.getId(), user);
        return user;
    }
    
    /**
     * ID로 사용자 조회
     * @param id 사용자 ID
     * @return Optional<User>
     */
    public Optional<User> findById(Long id) {
        return Optional.ofNullable(userStore.get(id));
    }
    
    /**
     * 모든 사용자 조회
     * @return 사용자 목록
     */
    public List<User> findAll() {
        return new ArrayList<>(userStore.values());
    }
    
    /**
     * 사용자명으로 조회
     * @param username 사용자명
     * @return Optional<User>
     */
    public Optional<User> findByUsername(String username) {
        return userStore.values().stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst();
    }
    
    /**
     * 사용자 삭제
     * @param id 사용자 ID
     */
    public void deleteById(Long id) {
        userStore.remove(id);
    }
    
    /**
     * 사용자 존재 여부 확인
     * @param id 사용자 ID
     * @return 존재 여부
     */
    public boolean existsById(Long id) {
        return userStore.containsKey(id);
    }
}
```

### Step 4: Service 계층 구현

```java
package com.example.hellospringapi.service;

import com.example.hellospringapi.domain.User;
import com.example.hellospringapi.dto.UserCreateRequest;
import com.example.hellospringapi.dto.UserResponse;
import com.example.hellospringapi.dto.UserUpdateRequest;
import com.example.hellospringapi.exception.UserNotFoundException;
import com.example.hellospringapi.exception.UsernameAlreadyExistsException;
import com.example.hellospringapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * User 비즈니스 로직 처리 서비스
 * - @Service: Spring의 서비스 컴포넌트로 등록
 * - @RequiredArgsConstructor: final 필드에 대한 생성자 자동 생성
 * - @Slf4j: 로깅을 위한 Logger 자동 생성
 */
@Service
@RequiredArgsConstructor  // final 필드에 대한 생성자 자동 생성
@Slf4j  // Lombok이 제공하는 로깅 어노테이션
public class UserService {
    
    // 생성자 주입 (권장 방식)
    private final UserRepository userRepository;
    
    /**
     * 사용자 생성
     * @param request 생성 요청 DTO
     * @return 생성된 사용자 응답 DTO
     */
    public UserResponse createUser(UserCreateRequest request) {
        log.info("Creating new user with username: {}", request.getUsername());
        
        // 중복 사용자명 체크
        userRepository.findByUsername(request.getUsername())
                .ifPresent(user -> {
                    throw new UsernameAlreadyExistsException(
                        "Username already exists: " + request.getUsername()
                    );
                });
        
        // User 엔티티 생성
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(request.getPassword())  // 실제로는 암호화 필요
                .age(request.getAge())
                .role("USER")  // 기본 권한
                .build();
        
        // 저장
        User savedUser = userRepository.save(user);
        
        log.info("User created successfully with id: {}", savedUser.getId());
        
        // DTO로 변환하여 반환
        return UserResponse.from(savedUser);
    }
    
    /**
     * 모든 사용자 조회
     * @return 사용자 목록
     */
    public List<UserResponse> getAllUsers() {
        log.debug("Fetching all users");
        
        return userRepository.findAll().stream()
                .map(UserResponse::from)  // 메서드 참조
                .collect(Collectors.toList());
    }
    
    /**
     * ID로 사용자 조회
     * @param id 사용자 ID
     * @return 사용자 응답 DTO
     */
    public UserResponse getUserById(Long id) {
        log.debug("Fetching user with id: {}", id);
        
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(
                    "User not found with id: " + id
                ));
        
        return UserResponse.from(user);
    }
    
    /**
     * 사용자 정보 수정
     * @param id 사용자 ID
     * @param request 수정 요청 DTO
     * @return 수정된 사용자 응답 DTO
     */
    public UserResponse updateUser(Long id, UserUpdateRequest request) {
        log.info("Updating user with id: {}", id);
        
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(
                    "User not found with id: " + id
                ));
        
        // 수정할 필드만 업데이트 (Partial Update)
        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }
        if (request.getPassword() != null) {
            user.setPassword(request.getPassword());  // 실제로는 암호화 필요
        }
        if (request.getAge() != null) {
            user.setAge(request.getAge());
        }
        
        User updatedUser = userRepository.save(user);
        
        log.info("User updated successfully with id: {}", id);
        
        return UserResponse.from(updatedUser);
    }
    
    /**
     * 사용자 삭제
     * @param id 사용자 ID
     */
    public void deleteUser(Long id) {
        log.info("Deleting user with id: {}", id);
        
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("User not found with id: " + id);
        }
        
        userRepository.deleteById(id);
        
        log.info("User deleted successfully with id: {}", id);
    }
}
```

### Step 5: Controller 계층 구현

```java
package com.example.hellospringapi.controller;

import com.example.hellospringapi.dto.UserCreateRequest;
import com.example.hellospringapi.dto.UserResponse;
import com.example.hellospringapi.dto.UserUpdateRequest;
import com.example.hellospringapi.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * User REST API Controller
 * - RESTful API 엔드포인트 제공
 * - HTTP 요청/응답 처리
 */
@RestController  // @Controller + @ResponseBody
@RequestMapping("/api/users")  // 기본 URL 경로
@RequiredArgsConstructor
@Slf4j
public class UserController {
    
    private final UserService userService;
    
    /**
     * 모든 사용자 조회
     * GET /api/users
     * 
     * @return 사용자 목록
     */
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        log.info("GET /api/users - 모든 사용자 조회 요청");
        List<UserResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(users);  // 200 OK
    }
    
    /**
     * 특정 사용자 조회
     * GET /api/users/{id}
     * 
     * @param id 사용자 ID (Path Variable)
     * @return 사용자 정보
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        log.info("GET /api/users/{} - 사용자 조회 요청", id);
        UserResponse user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
    
    /**
     * 새 사용자 생성
     * POST /api/users
     * 
     * @param request 사용자 생성 요청 (Request Body)
     * @return 생성된 사용자 정보
     */
    @PostMapping
    public ResponseEntity<UserResponse> createUser(
            @Valid @RequestBody UserCreateRequest request) {
        log.info("POST /api/users - 사용자 생성 요청: {}", request.getUsername());
        UserResponse createdUser = userService.createUser(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)  // 201 Created
                .body(createdUser);
    }
    
    /**
     * 사용자 정보 수정
     * PUT /api/users/{id}
     * 
     * @param id 사용자 ID
     * @param request 수정 요청
     * @return 수정된 사용자 정보
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserUpdateRequest request) {
        log.info("PUT /api/users/{} - 사용자 수정 요청", id);
        UserResponse updatedUser = userService.updateUser(id, request);
        return ResponseEntity.ok(updatedUser);
    }
    
    /**
     * 사용자 삭제
     * DELETE /api/users/{id}
     * 
     * @param id 사용자 ID
     * @return 응답 상태
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        log.info("DELETE /api/users/{} - 사용자 삭제 요청", id);
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();  // 204 No Content
    }
    
    /**
     * 헬스 체크 엔드포인트
     * GET /api/users/health
     */
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("User API is running!");
    }
}
```

### Step 6: 예외 처리 구현

```java
package com.example.hellospringapi.exception;

/**
 * 사용자를 찾을 수 없을 때 발생하는 예외
 */
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}

/**
 * 중복된 사용자명일 때 발생하는 예외
 */
public class UsernameAlreadyExistsException extends RuntimeException {
    public UsernameAlreadyExistsException(String message) {
        super(message);
    }
}
```

```java
package com.example.hellospringapi.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * 전역 예외 처리기
 * - @RestControllerAdvice: 모든 컨트롤러에서 발생하는 예외를 처리
 * - @ExceptionHandler: 특정 예외 타입을 처리
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    
    /**
     * 사용자를 찾을 수 없을 때
     */
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(
            UserNotFoundException ex) {
        log.error("User not found: {}", ex.getMessage());
        
        ErrorResponse error = ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.NOT_FOUND.value())
                .error("Not Found")
                .message(ex.getMessage())
                .build();
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    /**
     * 중복된 사용자명일 때
     */
    @ExceptionHandler(UsernameAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleUsernameAlreadyExistsException(
            UsernameAlreadyExistsException ex) {
        log.error("Username already exists: {}", ex.getMessage());
        
        ErrorResponse error = ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.CONFLICT.value())
                .error("Conflict")
                .message(ex.getMessage())
                .build();
        
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }
    
    /**
     * 유효성 검증 실패
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
            MethodArgumentNotValidException ex) {
        log.error("Validation failed: {}", ex.getMessage());
        
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        ErrorResponse error = ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.BAD_REQUEST.value())
                .error("Validation Failed")
                .message("입력값 검증에 실패했습니다")
                .validationErrors(errors)
                .build();
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
    
    /**
     * 기타 모든 예외
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex) {
        log.error("Unexpected error: ", ex);
        
        ErrorResponse error = ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .error("Internal Server Error")
                .message("서버 오류가 발생했습니다")
                .build();
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}

/**
 * 에러 응답 DTO
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
class ErrorResponse {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private Map<String, String> validationErrors;
}
```

### Step 7: 설정 파일 작성

```yaml
# application.yml
server:
  port: 8080
  servlet:
    context-path: /

spring:
  application:
    name: hello-spring-api
    
  # 개발 편의 설정
  devtools:
    restart:
      enabled: true  # 코드 변경 시 자동 재시작
    livereload:
      enabled: true  # 브라우저 자동 새로고침
      
  # JSON 직렬화 설정
  jackson:
    serialization:
      write-dates-as-timestamps: false  # 날짜를 ISO 형식으로
      indent-output: true  # Pretty print
    deserialization:
      fail-on-unknown-properties: false  # 알 수 없는 속성 무시

# 로깅 설정
logging:
  level:
    root: INFO
    com.example.hellospringapi: DEBUG  # 우리 패키지는 DEBUG 레벨
    org.springframework.web: DEBUG  # Spring Web 디버그 로그
  pattern:
    console: "%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n"
    file: "%d %p %c{1.} [%t] %m%n"
  file:
    name: ./logs/application.log
```

### Step 8: 메인 애플리케이션 클래스

```java
package com.example.hellospringapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Spring Boot 애플리케이션 진입점
 * 
 * @SpringBootApplication은 다음 3개의 어노테이션을 포함:
 * - @Configuration: 설정 클래스임을 명시
 * - @EnableAutoConfiguration: 자동 설정 활성화
 * - @ComponentScan: 컴포넌트 스캔 활성화
 */
@SpringBootApplication
public class HelloSpringApiApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(HelloSpringApiApplication.class, args);
    }
}
```

### Step 9: Swagger API 문서화 추가

```xml
<!-- pom.xml에 의존성 추가 -->
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.3.0</version>
</dependency>
```

```java
package com.example.hellospringapi.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Swagger/OpenAPI 설정
 */
@Configuration
public class SwaggerConfig {
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Hello Spring API")
                        .version("1.0.0")
                        .description("Spring Boot REST API 학습 프로젝트")
                        .contact(new Contact()
                                .name("Your Name")
                                .email("your-email@example.com")));
    }
}

// Controller에 Swagger 어노테이션 추가 예시
@Operation(summary = "모든 사용자 조회", description = "시스템에 등록된 모든 사용자를 조회합니다")
@ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "조회 성공"),
    @ApiResponse(responseCode = "500", description = "서버 오류")
})
@GetMapping
public ResponseEntity<List<UserResponse>> getAllUsers() {
    // ...
}
```

---

## 테스트 코드 작성

### Controller 테스트

```java
package com.example.hellospringapi.controller;

import com.example.hellospringapi.dto.UserCreateRequest;
import com.example.hellospringapi.dto.UserResponse;
import com.example.hellospringapi.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

/**
 * UserController 단위 테스트
 * - @WebMvcTest: MVC 관련 컴포넌트만 로드하여 빠른 테스트
 * - MockMvc: HTTP 요청을 시뮬레이션
 */
@WebMvcTest(UserController.class)
class UserControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean  // Service를 Mock으로 대체
    private UserService userService;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Test
    void getAllUsers_ShouldReturnUserList() throws Exception {
        // Given (준비)
        List<UserResponse> users = Arrays.asList(
            UserResponse.builder()
                .id(1L)
                .username("user1")
                .email("user1@example.com")
                .build(),
            UserResponse.builder()
                .id(2L)
                .username("user2")
                .email("user2@example.com")
                .build()
        );
        
        given(userService.getAllUsers()).willReturn(users);
        
        // When & Then (실행 & 검증)
        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].username").value("user1"))
                .andExpect(jsonPath("$[1].username").value("user2"));
    }
    
    @Test
    void createUser_ShouldReturnCreatedUser() throws Exception {
        // Given
        UserCreateRequest request = new UserCreateRequest();
        request.setUsername("newuser");
        request.setEmail("newuser@example.com");
        request.setPassword("password123");
        request.setAge(25);
        
        UserResponse response = UserResponse.builder()
                .id(1L)
                .username("newuser")
                .email("newuser@example.com")
                .age(25)
                .role("USER")
                .build();
        
        given(userService.createUser(any(UserCreateRequest.class)))
                .willReturn(response);
        
        // When & Then
        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.username").value("newuser"))
                .andExpect(jsonPath("$.role").value("USER"));
    }
    
    @Test
    void createUser_WithInvalidData_ShouldReturnBadRequest() throws Exception {
        // Given - 잘못된 데이터 (이메일 형식 오류)
        UserCreateRequest request = new UserCreateRequest();
        request.setUsername("user");
        request.setEmail("invalid-email");  // 잘못된 이메일
        request.setPassword("pass");  // 너무 짧은 비밀번호
        
        // When & Then
        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.validationErrors").exists());
    }
}
```

### Service 테스트

```java
package com.example.hellospringapi.service;

import com.example.hellospringapi.domain.User;
import com.example.hellospringapi.dto.UserCreateRequest;
import com.example.hellospringapi.dto.UserResponse;
import com.example.hellospringapi.exception.UsernameAlreadyExistsException;
import com.example.hellospringapi.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

/**
 * UserService 단위 테스트
 */
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @InjectMocks
    private UserService userService;
    
    private UserCreateRequest createRequest;
    private User user;
    
    @BeforeEach
    void setUp() {
        createRequest = new UserCreateRequest();
        createRequest.setUsername("testuser");
        createRequest.setEmail("test@example.com");
        createRequest.setPassword("password123");
        createRequest.setAge(25);
        
        user = User.builder()
                .id(1L)
                .username("testuser")
                .email("test@example.com")
                .password("password123")
                .age(25)
                .role("USER")
                .build();
    }
    
    @Test
    void createUser_ShouldCreateNewUser() {
        // Given
        given(userRepository.findByUsername("testuser"))
                .willReturn(Optional.empty());
        given(userRepository.save(any(User.class)))
                .willReturn(user);
        
        // When
        UserResponse response = userService.createUser(createRequest);
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getUsername()).isEqualTo("testuser");
        assertThat(response.getRole()).isEqualTo("USER");
        
        verify(userRepository).findByUsername("testuser");
        verify(userRepository).save(any(User.class));
    }
    
    @Test
    void createUser_WithExistingUsername_ShouldThrowException() {
        // Given
        given(userRepository.findByUsername("testuser"))
                .willReturn(Optional.of(user));
        
        // When & Then
        assertThatThrownBy(() -> userService.createUser(createRequest))
                .isInstanceOf(UsernameAlreadyExistsException.class)
                .hasMessageContaining("Username already exists");
    }
}
```

---

## 실행 및 테스트

### 애플리케이션 실행

```bash
# Maven
./mvnw spring-boot:run

# Gradle
./gradlew bootRun

# 또는 IDE에서 main 메서드 실행
```

### API 테스트 (curl 명령어)

```bash
# 1. 헬스 체크
curl http://localhost:8080/api/users/health

# 2. 모든 사용자 조회
curl http://localhost:8080/api/users

# 3. 새 사용자 생성
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john",
    "email": "john@example.com",
    "password": "password123",
    "age": 30
  }'

# 4. 특정 사용자 조회
curl http://localhost:8080/api/users/1

# 5. 사용자 정보 수정
curl -X PUT http://localhost:8080/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newemail@example.com",
    "age": 31
  }'

# 6. 사용자 삭제
curl -X DELETE http://localhost:8080/api/users/1
```

### Swagger UI 접속
브라우저에서 http://localhost:8080/swagger-ui.html 접속

---

## 추가 학습 자료

### 📚 필수 읽기 자료

1. **Spring 공식 문서**
   - [Spring Boot Reference](https://docs.spring.io/spring-boot/docs/current/reference/html/)
   - [Spring Framework Core](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html)

2. **블로그 & 튜토리얼**
   - [Baeldung Spring Tutorials](https://www.baeldung.com/spring-tutorial)
   - [Spring Guides](https://spring.io/guides)

3. **동영상 강의**
   - YouTube: "Spring Boot Tutorial for Beginners" by Amigoscode
   - Inflearn: "스프링 입문 - 코드로 배우는 스프링 부트" (김영한)

### 🎯 심화 학습 주제

1. **Spring Boot Auto-configuration 원리**
   - @EnableAutoConfiguration 동작 방식
   - spring.factories 파일 역할
   - Conditional 어노테이션들

2. **Bean Scope와 생명주기**
   - Singleton, Prototype, Request, Session
   - @PostConstruct, @PreDestroy
   - BeanPostProcessor

3. **Profile 관리**
   - 환경별 설정 분리 (dev, prod)
   - @Profile 어노테이션 활용

4. **AOP (Aspect-Oriented Programming)**
   - 횡단 관심사 처리
   - @Aspect, @Before, @After

---

## 체크리스트

### 개념 이해
- [ ] IoC와 DI의 개념을 설명할 수 있다
- [ ] Spring Bean과 컨테이너의 역할을 이해한다
- [ ] @Component, @Service, @Repository, @Controller의 차이를 안다
- [ ] 생성자 주입이 권장되는 이유를 설명할 수 있다

### 구현 능력
- [ ] Spring Boot 프로젝트를 생성하고 실행할 수 있다
- [ ] REST API를 설계하고 구현할 수 있다
- [ ] 계층형 아키텍처를 적용할 수 있다
- [ ] DTO 패턴을 활용할 수 있다
- [ ] 예외 처리를 구현할 수 있다

### 테스트
- [ ] Controller 테스트를 작성할 수 있다
- [ ] Service 테스트를 작성할 수 있다
- [ ] MockMvc를 사용할 수 있다
- [ ] Mockito를 활용한 Mocking을 할 수 있다

### 도구 활용
- [ ] application.yml 설정을 할 수 있다
- [ ] Swagger를 통해 API 문서를 생성할 수 있다
- [ ] 로깅을 효과적으로 활용할 수 있다
- [ ] curl이나 Postman으로 API를 테스트할 수 있다

---

## 다음 단계 예고: Phase 2 - 데이터베이스 연동

Phase 1을 완료하셨다면, 다음 단계에서는:

1. **JPA/Hibernate** 활용
   - Entity 설계 및 매핑
   - 연관관계 설정 (1:N, N:1, N:M)
   
2. **Spring Data JPA**
   - Repository 인터페이스
   - Query Methods
   - Custom Query 작성
   
3. **트랜잭션 관리**
   - @Transactional 활용
   - 격리 수준 이해
   
4. **데이터베이스 마이그레이션**
   - Flyway 또는 Liquibase

이제 메모리 저장소에서 실제 데이터베이스로 전환하여 영속성을 구현하게 됩니다!

---

## 🎉 축하합니다!

Phase 1을 완료하셨습니다. Spring Boot의 기초를 탄탄히 다지셨으니, 
이제 더 복잡하고 실용적인 기능들을 구현할 준비가 되었습니다.

궁금한 점이나 막히는 부분이 있다면 언제든 질문해주세요! 💪
