# 🎯 Phase 1: Spring 기초 & 환경 설정 완전 가이드 (개선판)

> **이 문서의 목표**: Spring Boot 초보자도 각 단계를 **왜** 하는지, **어떻게** 동작하는지 완벽히 이해할 수 있도록 돕기

## 📋 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [개발 환경 설정](#개발-환경-설정)
3. [프로젝트 생성 및 구조 이해](#프로젝트-생성-및-구조-이해)
4. [핵심 개념 학습](#핵심-개념-학습)
5. [실습: Hello Spring API 구현](#실습-hello-spring-api-구현)
6. [Swagger 완전 정복](#swagger-완전-정복)
7. [테스트 코드 작성](#테스트-코드-작성)
8. [실행 및 테스트](#실행-및-테스트)
9. [자주 발생하는 문제와 해결법](#자주-발생하는-문제와-해결법)
10. [체크리스트](#체크리스트)

---

## 프로젝트 개요

### 🎯 학습 목표

**Phase 1의 위치**
```
전체 로드맵 (76-97일)
    ↓
Phase 1 (5-6일) ← 여기! 모든 것의 기초
    ↓
Phase 2-11 (나머지 70-91일)
```

**이번 Phase에서 배울 핵심:**
1. **IoC/DI**: Spring의 근본 원리 (Phase 11까지 계속 사용)
2. **계층 구조**: Controller → Service → Repository (표준 패턴)
3. **REST API**: 실무의 90%
4. **예외 처리**: 프로덕션 필수

### 📦 최종 결과물
간단한 User 관리 REST API 서버
- ✅ 사용자 CRUD 기능 (Create, Read, Update, Delete)
- ✅ 메모리 기반 데이터 저장 (Phase 2에서 DB로 변경)
- ✅ 전역 예외 처리
- ✅ Swagger API 문서 (브라우저에서 API 테스트 가능)

### 🆚 NestJS와 비교

| 기능 | NestJS | Spring Boot (Phase 1) |
|------|--------|----------------------|
| 의존성 주입 | `@Injectable()` | `@Service`, `@Repository` |
| 컨트롤러 | `@Controller()` | `@RestController` |
| DTO 검증 | `class-validator` | `@Valid` + Bean Validation |
| API 문서 | `@nestjs/swagger` | `springdoc-openapi` |
| 설정 파일 | `.env` | `application.yml` |

---

## 개발 환경 설정

### 1. Java 21 설치

```bash
# Mac - Homebrew 사용
brew install openjdk@17

# 환경변수 설정
export JAVA_HOME=$(/usr/libexec/java_home -v 21)
export PATH=$JAVA_HOME/bin:$PATH

# 확인
java -version
# 출력: openjdk version "21.0.x"
```

```bash
# Windows - Chocolatey 사용
choco install openjdk21

# 또는 Oracle 사이트에서 설치
# https://www.oracle.com/java/technologies/downloads/#java21
```

### 2. IDE 설정

**IntelliJ IDEA (강력 추천)**
- Community Edition (무료)도 Spring Boot 개발 가능
- 플러그인 필수 설치:
  1. **Lombok Plugin**: Annotation Processing 활성화 필수!
  2. **Spring Boot Assistant**: application.yml 자동완성
  3. **Key Promoter X**: 단축키 학습

**Lombok 설정 (매우 중요!)**
```
IntelliJ에서:
1. File > Settings > Plugins
   → "Lombok" 검색 후 설치

2. File > Settings > Build, Execution, Deployment
   → Compiler → Annotation Processors
   → ✅ Enable annotation processing 체크

이거 안 하면 @Getter, @Setter 등이 작동 안 함!
```

---

## 프로젝트 생성 및 구조 이해

### 1. Spring Initializr로 프로젝트 생성

**방법 1: 웹에서 생성**
1. [start.spring.io](https://start.spring.io) 접속
2. 아래 설정 입력
3. "Generate" 클릭 → ZIP 다운로드 → 압축 해제

**방법 2: IntelliJ에서 생성**
1. File > New > Project
2. "Spring Initializr" 선택
3. 아래 설정 입력

**설정값:**
```yaml
Project: Gradle - Kotlin  # 또는 Maven
Language: Java
Spring Boot: 3.2.x (최신 안정 버전)
Group: com.example
Artifact: hello-spring-api
Name: HelloSpringApi
Package name: com.example.hellospringapi
Packaging: Jar
Java: 17

Dependencies (중요!):
  - Spring Web           # REST API 개발
  - Spring Boot DevTools # 자동 재시작
  - Lombok              # 코드 자동 생성
  - Validation (I/O)    # 입력값 검증
```

### 2. 프로젝트 구조 상세 설명

```
hello-spring-api/
├── src/
│   ├── main/
│   │   ├── java/com/example/hellospringapi/
│   │   │   ├── HelloSpringApiApplication.java  # ⭐ 앱 진입점
│   │   │   │
│   │   │   ├── controller/          # HTTP 요청 처리
│   │   │   │   └── UserController.java
│   │   │   │
│   │   │   ├── service/            # 비즈니스 로직
│   │   │   │   └── UserService.java
│   │   │   │
│   │   │   ├── repository/         # 데이터 접근
│   │   │   │   └── UserRepository.java
│   │   │   │
│   │   │   ├── domain/             # 도메인 모델 (Entity)
│   │   │   │   └── User.java
│   │   │   │
│   │   │   ├── dto/                # 요청/응답 데이터 구조
│   │   │   │   ├── UserCreateRequest.java
│   │   │   │   ├── UserUpdateRequest.java
│   │   │   │   └── UserResponse.java
│   │   │   │
│   │   │   ├── exception/          # 커스텀 예외 & 전역 처리
│   │   │   │   ├── UserNotFoundException.java
│   │   │   │   ├── UsernameAlreadyExistsException.java
│   │   │   │   └── GlobalExceptionHandler.java
│   │   │   │
│   │   │   └── config/             # 설정 클래스
│   │   │       └── SwaggerConfig.java
│   │   │
│   │   └── resources/
│   │       ├── application.yml      # 설정 파일
│   │       └── static/             # HTML, CSS 등
│   │
│   └── test/                       # 테스트 코드
│       └── java/com/example/hellospringapi/
│           ├── controller/
│           └── service/
│
├── build.gradle.kts                # 의존성 관리 (Gradle)
└── README.md
```

**왜 이런 구조인가?**

```
계층형 아키텍처 (Layered Architecture)

Client (브라우저/앱)
      ↓
[Controller] ← HTTP 요청/응답만 처리
      ↓
[Service]    ← 비즈니스 로직 (핵심 가치)
      ↓
[Repository] ← 데이터 저장/조회
      ↓
Database (Phase 2부터)
```

**각 계층의 역할:**
- **Controller**: "택배 기사" → 요청 받아서 Service로 전달, 응답 포장해서 반환
- **Service**: "요리사" → 실제 비즈니스 로직 처리
- **Repository**: "창고 관리자" → 데이터 저장/조회만 담당

---

## 핵심 개념 학습

### 1. IoC & DI 깊이 이해하기

#### 전통적인 방식의 문제점

```java
// ❌ 문제 많은 코드
public class UserService {
    // UserService가 직접 UserRepository 생성
    private UserRepository userRepository = new UserRepository();

    public void createUser(User user) {
        userRepository.save(user);
    }
}
```

**문제점:**
1. **테스트 불가능**: 실제 UserRepository만 사용 가능, Mock 교체 불가
2. **유연성 없음**: UserRepository 구현체 변경하려면 코드 수정 필요
3. **결합도 높음**: UserService와 UserRepository가 강하게 결합

#### Spring IoC/DI 방식

```java
// ✅ Spring 방식
@Service  // Spring이 이 클래스의 인스턴스를 관리
public class UserService {
    private final UserRepository userRepository;

    // 생성자를 통해 외부에서 주입받음
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createUser(User user) {
        userRepository.save(user);
    }
}
```

**장점:**
1. **테스트 가능**: Mock 객체 주입 가능
2. **유연함**: 구현체 변경 쉬움
3. **낮은 결합도**: 인터페이스에만 의존

#### Spring 컨테이너가 하는 일

```java
// Spring 내부 동작 (의사 코드)
public class SpringContainer {
    private Map<Class, Object> beans = new HashMap<>();

    public void initialize() {
        // 1. @Service, @Repository 붙은 클래스 찾기
        UserRepository userRepo = new UserRepository();
        beans.put(UserRepository.class, userRepo);

        // 2. 의존성 주입하며 UserService 생성
        UserService userService = new UserService(userRepo);
        beans.put(UserService.class, userService);

        // 3. Controller에도 주입
        UserController controller = new UserController(userService);
        beans.put(UserController.class, controller);
    }

    public Object getBean(Class clazz) {
        return beans.get(clazz);
    }
}
```

**실제 Spring의 동작:**
```
1. @SpringBootApplication 실행
      ↓
2. @ComponentScan이 패키지 스캔
      ↓
3. @Component, @Service, @Repository, @Controller 붙은 클래스 찾기
      ↓
4. Bean 인스턴스 생성 (Singleton으로)
      ↓
5. 의존성 주입 (생성자, 필드, Setter 중 하나)
      ↓
6. 애플리케이션 실행 준비 완료
```

---

### 2. 왜 이 순서로 코드를 작성하는가?

```
Step 1: Domain (User)
  ↓ 이유: 비즈니스의 핵심 모델부터 정의

Step 2: DTO (Request/Response)
  ↓ 이유: API 계약 (외부와의 약속) 정의

Step 3: Repository
  ↓ 이유: 데이터 접근 방법 구현

Step 4: Service
  ↓ 이유: 비즈니스 로직 (Repository 사용)

Step 5: Controller
  ↓ 이유: HTTP 엔드포인트 (Service 사용)

Step 6: Exception Handling
  ↓ 이유: 에러를 일관되게 처리

Step 7: Configuration (Swagger 등)
  ↓ 이유: 부가 기능 추가
```

**의존성 방향:**
```
Controller → Service → Repository
   ↓           ↓          ↓
  DTO      Business     Data
          Logic
```

---

## 실습: Hello Spring API 구현

### 🔥 Step 0: 어노테이션 이해하기

> **중요!** 코드를 작성하기 전에 `어노테이션_완전정복.md`를 먼저 읽어주세요!

각 어노테이션의 역할:
- `@Getter`, `@Setter`: getter/setter 자동 생성
- `@Builder`: Builder 패턴 적용
- `@Service`, `@Repository`: Spring Bean 등록
- `@NotBlank`, `@Email`: 입력값 검증
- `@RestController`: REST API 컨트롤러 선언

---

### Step 1: Domain 모델 생성

**파일 위치:** `src/main/java/com/example/hellospringapi/domain/User.java`

```java
package com.example.hellospringapi.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * User 도메인 모델
 *
 * 🔍 왜 Domain이 먼저인가?
 * - 비즈니스의 핵심 개념을 표현
 * - 데이터베이스와 1:1 매핑 (Phase 2에서 @Entity 추가됨)
 * - 다른 모든 계층이 이 모델을 참조
 *
 * 📌 Lombok 어노테이션 설명:
 * @Getter/@Setter: 모든 필드의 getter/setter 자동 생성
 * @NoArgsConstructor: User() 기본 생성자 생성
 * @AllArgsConstructor: User(id, username, ...) 전체 생성자 생성
 * @Builder: User.builder().id(1L).username("john").build() 가능
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    /**
     * 사용자 고유 ID
     * Phase 1: 메모리에서 자동 생성
     * Phase 2: DB에서 자동 증가 (AUTO_INCREMENT)
     */
    private Long id;

    /**
     * 사용자명 (중복 불가)
     */
    private String username;

    /**
     * 이메일
     */
    private String email;

    /**
     * 비밀번호
     * ⚠️ Phase 1: 평문 저장 (학습용)
     * ⚠️ Phase 3: BCrypt 암호화 적용
     */
    private String password;

    /**
     * 나이
     */
    private Integer age;

    /**
     * 역할 ("USER", "ADMIN")
     * Phase 3: Enum으로 변경 예정
     */
    private String role;

    // 비즈니스 로직 메서드 예시
    public boolean isAdmin() {
        return "ADMIN".equals(this.role);
    }

    public boolean isAdult() {
        return this.age != null && this.age >= 19;
    }
}
```

**NestJS와 비교:**
```typescript
// NestJS - TypeORM Entity
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;
}

// Spring - Phase 2에서 이렇게 변경됨
@Entity
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true)
  private String username;
}
```

---

### Step 2: DTO 생성

**왜 DTO가 필요한가?**

```java
// ❌ DTO 없이 Domain 직접 사용하면?
@PostMapping
public User createUser(@RequestBody User user) {
    return userRepository.save(user);
}

// 문제점:
// 1. 클라이언트가 id를 임의로 설정 가능
// 2. password가 응답에 그대로 노출
// 3. 검증 규칙을 Domain에 섞어야 함
```

```java
// ✅ DTO 사용
@PostMapping
public UserResponse createUser(@Valid @RequestBody UserCreateRequest request) {
    // request: 필요한 필드만, 검증 규칙 포함
    // UserResponse: 민감 정보 제외한 응답
}
```

**파일 위치:** `src/main/java/com/example/hellospringapi/dto/UserCreateRequest.java`

```java
package com.example.hellospringapi.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 사용자 생성 요청 DTO
 *
 * 🎯 역할:
 * 1. 클라이언트 → 서버 데이터 전달
 * 2. 입력값 검증 (@NotBlank, @Email 등)
 * 3. Domain과 분리하여 API 계약 명확화
 *
 * 📌 Validation 어노테이션:
 * @NotBlank: null, "", "   " 모두 불허
 * @Email: 이메일 형식 검증
 * @Size: 문자열 길이 검증
 * @Min/@Max: 숫자 범위 검증
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

    // ⚠️ id 필드가 없음 → 클라이언트가 임의로 설정 불가
    // ⚠️ role 필드가 없음 → 서버에서만 설정 (보안)
}
```

**파일 위치:** `src/main/java/com/example/hellospringapi/dto/UserResponse.java`

```java
package com.example.hellospringapi.dto;

import com.example.hellospringapi.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 사용자 응답 DTO
 *
 * 🎯 역할:
 * 1. 서버 → 클라이언트 데이터 전달
 * 2. 민감한 정보(password) 제외
 * 3. 필요한 정보만 선택적으로 반환
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

    // ⚠️ password 필드가 없음 → 응답에서 제외

    /**
     * User Domain → UserResponse DTO 변환
     *
     * 🔍 왜 정적 메서드인가?
     * - UserResponse.from(user) 형태로 사용
     * - 변환 로직을 DTO에 캡슐화
     *
     * 💡 Phase 4에서 MapStruct로 자동화 가능
     */
    public static UserResponse from(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .age(user.getAge())
                .role(user.getRole())
                // password는 의도적으로 제외!
                .build();
    }
}
```

**파일 위치:** `src/main/java/com/example/hellospringapi/dto/UserUpdateRequest.java`

```java
package com.example.hellospringapi.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 사용자 수정 요청 DTO
 *
 * 🔍 Create vs Update 차이:
 * - Create: 모든 필드 @NotBlank (필수)
 * - Update: 일부 필드만 @NotBlank (선택적 수정 가능)
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {

    // username은 수정 불가 → 필드 없음

    @Email(message = "올바른 이메일 형식이 아닙니다")
    private String email;  // null 허용 → 수정 안 할 수도 있음

    @Size(min = 8, message = "비밀번호는 최소 8자 이상이어야 합니다")
    private String password;

    @Min(value = 1, message = "나이는 1세 이상이어야 합니다")
    @Max(value = 150, message = "나이는 150세 이하여야 합니다")
    private Integer age;
}
```

---

### Step 3: Repository 계층 구현

**파일 위치:** `src/main/java/com/example/hellospringapi/repository/UserRepository.java`

```java
package com.example.hellospringapi.repository;

import com.example.hellospringapi.domain.User;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

/**
 * 메모리 기반 User Repository 구현
 *
 * 🔍 왜 메모리 기반인가?
 * - Phase 1: DB 없이 Spring 개념 학습에 집중
 * - Phase 2: Spring Data JPA로 교체 (인터페이스만 선언하면 됨!)
 *
 * 🔍 왜 ConcurrentHashMap을 사용하는가?
 * - HashMap: Thread-safe 하지 않음 (동시 요청 시 데이터 손실)
 * - ConcurrentHashMap: Thread-safe (동시 요청 처리 가능)
 *
 * 🔍 @Repository 역할:
 * 1. Spring Bean으로 등록
 * 2. 데이터 접근 계층임을 명시
 * 3. 예외 변환 (SQLException → DataAccessException)
 */
@Repository
public class UserRepository {

    // 메모리 저장소: key=id, value=User 객체
    private final Map<Long, User> userStore = new ConcurrentHashMap<>();

    // ID 자동 증가 생성기 (1, 2, 3, ...)
    private final AtomicLong idGenerator = new AtomicLong(1L);

    /**
     * 사용자 저장
     *
     * @param user 저장할 사용자
     * @return 저장된 사용자 (ID 포함)
     *
     * 🔍 동작 흐름:
     * 1. ID가 null이면 새 ID 할당
     * 2. userStore에 저장
     * 3. 저장된 user 반환
     */
    public User save(User user) {
        if (user.getId() == null) {
            // 새로운 사용자 → ID 자동 생성
            user.setId(idGenerator.getAndIncrement());
        }
        userStore.put(user.getId(), user);
        return user;
    }

    /**
     * ID로 사용자 조회
     *
     * @param id 사용자 ID
     * @return Optional<User> - 있으면 User, 없으면 empty
     *
     * 🔍 왜 Optional을 사용하는가?
     * - null 반환 시 NullPointerException 위험
     * - Optional.empty() → 명시적으로 "값이 없음" 표현
     * - .orElseThrow()로 예외 처리 강제
     */
    public Optional<User> findById(Long id) {
        return Optional.ofNullable(userStore.get(id));
    }

    /**
     * 모든 사용자 조회
     *
     * @return 사용자 목록
     */
    public List<User> findAll() {
        // userStore.values(): Collection<User>
        // new ArrayList<>(...): List로 변환
        return new ArrayList<>(userStore.values());
    }

    /**
     * 사용자명으로 조회
     *
     * @param username 사용자명
     * @return Optional<User>
     *
     * 🔍 Stream API 설명:
     * userStore.values().stream() → User 객체들의 스트림
     * .filter(...) → 조건에 맞는 것만 필터링
     * .findFirst() → 첫 번째 결과 반환
     */
    public Optional<User> findByUsername(String username) {
        return userStore.values().stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst();
    }

    /**
     * 사용자 삭제
     *
     * @param id 사용자 ID
     */
    public void deleteById(Long id) {
        userStore.remove(id);
    }

    /**
     * 사용자 존재 여부 확인
     *
     * @param id 사용자 ID
     * @return 존재하면 true, 없으면 false
     */
    public boolean existsById(Long id) {
        return userStore.containsKey(id);
    }
}
```

**Phase 2에서의 변화:**
```java
// Phase 1 (지금)
@Repository
public class UserRepository {
    private final Map<Long, User> userStore = new ConcurrentHashMap<>();

    public User save(User user) {
        // 직접 구현...
    }
}

// Phase 2 (Spring Data JPA)
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    // 구현 코드 없어도 Spring이 자동 생성!
}
```

---

### Step 4: Service 계층 구현

**파일 위치:** `src/main/java/com/example/hellospringapi/service/UserService.java`

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
 *
 * 🎯 Service 계층의 역할:
 * 1. 비즈니스 로직 구현 (중복 체크, 권한 설정 등)
 * 2. 트랜잭션 관리 (Phase 2에서 @Transactional 추가)
 * 3. DTO ↔ Domain 변환
 *
 * 📌 어노테이션 설명:
 * @Service: Spring Bean으로 등록 (비즈니스 로직 계층)
 * @RequiredArgsConstructor: final 필드 생성자 자동 생성
 * @Slf4j: log.info(...) 사용 가능
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    /**
     * 생성자 주입 (권장 방식)
     *
     * 🔍 왜 생성자 주입인가?
     * 1. final 사용 가능 → 불변성 보장
     * 2. 테스트 시 Mock 주입 쉬움
     * 3. 순환 참조 방지
     *
     * 🔍 @RequiredArgsConstructor가 하는 일:
     * public UserService(UserRepository userRepository) {
     *     this.userRepository = userRepository;
     * }
     * ↑ 이 생성자를 자동으로 생성해줌!
     */
    private final UserRepository userRepository;

    /**
     * 사용자 생성
     *
     * @param request 생성 요청 DTO
     * @return 생성된 사용자 응답 DTO
     * @throws UsernameAlreadyExistsException 중복된 사용자명일 경우
     *
     * 🔍 동작 흐름:
     * 1. 로그 기록
     * 2. 중복 사용자명 체크
     * 3. DTO → Domain 변환
     * 4. Repository로 저장
     * 5. Domain → DTO 변환하여 반환
     */
    public UserResponse createUser(UserCreateRequest request) {
        log.info("Creating new user with username: {}", request.getUsername());

        // 1. 비즈니스 규칙: 중복 사용자명 체크
        userRepository.findByUsername(request.getUsername())
                .ifPresent(user -> {
                    // Optional.ifPresent: 값이 있으면 실행
                    throw new UsernameAlreadyExistsException(
                        "Username already exists: " + request.getUsername()
                    );
                });

        // 2. DTO → Domain 변환
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(request.getPassword())  // ⚠️ Phase 3: BCrypt 암호화 추가
                .age(request.getAge())
                .role("USER")  // 기본 권한 (서버에서 설정, 클라이언트는 못함!)
                .build();

        // 3. 저장
        User savedUser = userRepository.save(user);

        log.info("User created successfully with id: {}", savedUser.getId());

        // 4. Domain → DTO 변환하여 반환
        return UserResponse.from(savedUser);
    }

    /**
     * 모든 사용자 조회
     *
     * @return 사용자 목록
     *
     * 🔍 Stream API 설명:
     * userRepository.findAll() → List<User>
     * .stream() → Stream<User>
     * .map(UserResponse::from) → Stream<UserResponse>
     *   (각 User를 UserResponse로 변환)
     * .collect(Collectors.toList()) → List<UserResponse>
     */
    public List<UserResponse> getAllUsers() {
        log.debug("Fetching all users");

        return userRepository.findAll().stream()
                .map(UserResponse::from)  // 메서드 참조
                .collect(Collectors.toList());
    }

    /**
     * ID로 사용자 조회
     *
     * @param id 사용자 ID
     * @return 사용자 응답 DTO
     * @throws UserNotFoundException 사용자가 없을 경우
     *
     * 🔍 Optional.orElseThrow() 설명:
     * - 값이 있으면: User 반환
     * - 값이 없으면: 예외 던지기
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
     *
     * @param id 사용자 ID
     * @param request 수정 요청 DTO
     * @return 수정된 사용자 응답 DTO
     * @throws UserNotFoundException 사용자가 없을 경우
     *
     * 🔍 Partial Update (부분 수정):
     * - 클라이언트가 email만 보내면 email만 수정
     * - null인 필드는 수정하지 않음
     */
    public UserResponse updateUser(Long id, UserUpdateRequest request) {
        log.info("Updating user with id: {}", id);

        // 1. 기존 사용자 조회
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(
                    "User not found with id: " + id
                ));

        // 2. 수정할 필드만 업데이트
        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }
        if (request.getPassword() != null) {
            user.setPassword(request.getPassword());
        }
        if (request.getAge() != null) {
            user.setAge(request.getAge());
        }

        // 3. 저장
        User updatedUser = userRepository.save(user);

        log.info("User updated successfully with id: {}", id);

        return UserResponse.from(updatedUser);
    }

    /**
     * 사용자 삭제
     *
     * @param id 사용자 ID
     * @throws UserNotFoundException 사용자가 없을 경우
     */
    public void deleteUser(Long id) {
        log.info("Deleting user with id: {}", id);

        // 존재 여부 확인
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("User not found with id: " + id);
        }

        userRepository.deleteById(id);

        log.info("User deleted successfully with id: {}", id);
    }
}
```

**비즈니스 로직 예시 (Phase 3 이후):**
```java
// 관리자만 삭제 가능하도록 확장
public void deleteUser(Long id, User currentUser) {
    if (!currentUser.isAdmin()) {
        throw new ForbiddenException("Only admin can delete users");
    }
    // ...
}
```

---

### Step 5: Controller 계층 구현

**파일 위치:** `src/main/java/com/example/hellospringapi/controller/UserController.java`

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
 *
 * 🎯 Controller의 역할:
 * 1. HTTP 요청 받기
 * 2. 요청 데이터 검증 (@Valid)
 * 3. Service 호출
 * 4. HTTP 응답 반환
 *
 * ⚠️ Controller에서 하지 말아야 할 것:
 * - 비즈니스 로직 (Service에서!)
 * - 데이터베이스 접근 (Repository에서!)
 * - 복잡한 계산 (Service에서!)
 *
 * 📌 어노테이션 설명:
 * @RestController = @Controller + @ResponseBody
 *   → 모든 메서드의 반환값을 JSON으로 변환
 * @RequestMapping("/api/users")
 *   → 이 Controller의 모든 엔드포인트는 /api/users로 시작
 */
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    /**
     * 모든 사용자 조회
     *
     * HTTP: GET /api/users
     * 응답: 200 OK + JSON 배열
     *
     * 🔍 @GetMapping:
     * - GET 메서드로 매핑
     * - 값이 없으면 기본 경로 (@RequestMapping 값 사용)
     *
     * 🔍 ResponseEntity<T>:
     * - HTTP 상태 코드 + 응답 Body를 함께 반환
     * - ResponseEntity.ok(users) = 200 OK + users
     */
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        log.info("GET /api/users - 모든 사용자 조회 요청");
        List<UserResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    /**
     * 특정 사용자 조회
     *
     * HTTP: GET /api/users/123
     * 응답: 200 OK + User JSON
     *
     * 🔍 @PathVariable:
     * - URL 경로에서 값 추출
     * - GET /api/users/123 → id = 123
     *
     * @param id 사용자 ID (URL에서 추출)
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
     *
     * HTTP: POST /api/users
     * 요청 Body:
     * {
     *   "username": "john",
     *   "email": "john@example.com",
     *   "password": "password123",
     *   "age": 30
     * }
     * 응답: 201 Created + User JSON
     *
     * 🔍 @Valid:
     * - request 객체의 검증 어노테이션 실행
     * - @NotBlank, @Email 등 체크
     * - 검증 실패 → MethodArgumentNotValidException 발생
     *
     * 🔍 @RequestBody:
     * - HTTP Body의 JSON을 객체로 변환
     * - Jackson 라이브러리가 자동으로 변환
     *
     * @param request 사용자 생성 요청 DTO
     * @return 생성된 사용자 정보
     */
    @PostMapping
    public ResponseEntity<UserResponse> createUser(
            @Valid @RequestBody UserCreateRequest request) {
        log.info("POST /api/users - 사용자 생성 요청: {}", request.getUsername());
        UserResponse createdUser = userService.createUser(request);

        // 201 Created 응답
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdUser);
    }

    /**
     * 사용자 정보 수정
     *
     * HTTP: PUT /api/users/123
     * 요청 Body:
     * {
     *   "email": "newemail@example.com",
     *   "age": 31
     * }
     * 응답: 200 OK + 수정된 User JSON
     *
     * 🔍 PUT vs PATCH:
     * - PUT: 전체 교체
     * - PATCH: 부분 수정 (이 예제는 실제로 PATCH 방식)
     *
     * @param id 사용자 ID
     * @param request 수정 요청 DTO
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
     *
     * HTTP: DELETE /api/users/123
     * 응답: 204 No Content (Body 없음)
     *
     * 🔍 ResponseEntity<Void>:
     * - 응답 Body가 없음을 명시
     *
     * 🔍 204 No Content:
     * - 성공했지만 반환할 데이터 없음
     * - DELETE, PUT 등에서 주로 사용
     *
     * @param id 사용자 ID
     * @return 응답 상태만 반환
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        log.info("DELETE /api/users/{} - 사용자 삭제 요청", id);
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * 헬스 체크 엔드포인트
     *
     * HTTP: GET /api/users/health
     * 응답: 200 OK + "User API is running!"
     *
     * 🔍 실무 활용:
     * - 로드 밸런서가 서버 상태 체크용
     * - Kubernetes Liveness Probe
     */
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("User API is running!");
    }
}
```

**HTTP 상태 코드 정리:**
| 코드 | 의미 | 사용 시점 |
|------|------|----------|
| 200 OK | 성공 | GET, PUT 성공 시 |
| 201 Created | 생성됨 | POST 성공 시 |
| 204 No Content | 내용 없음 | DELETE 성공 시 |
| 400 Bad Request | 잘못된 요청 | 검증 실패 시 |
| 404 Not Found | 없음 | 리소스를 찾을 수 없을 때 |
| 409 Conflict | 충돌 | 중복된 데이터 |
| 500 Internal Server Error | 서버 오류 | 예상치 못한 에러 |

---

### Step 6: 예외 처리 구현

#### 6-1. 커스텀 예외 클래스

**파일 위치:** `src/main/java/com/example/hellospringapi/exception/UserNotFoundException.java`

```java
package com.example.hellospringapi.exception;

/**
 * 사용자를 찾을 수 없을 때 발생하는 예외
 *
 * 🔍 왜 커스텀 예외를 만드는가?
 * 1. 예외 종류를 명확히 구분
 * 2. GlobalExceptionHandler에서 각각 다른 응답 반환
 * 3. 비즈니스 의미를 코드에 표현
 *
 * 🔍 RuntimeException vs Exception:
 * - RuntimeException: Unchecked Exception (try-catch 강제 X)
 * - Exception: Checked Exception (try-catch 강제 O)
 *
 * Spring에서는 RuntimeException 권장!
 */
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}
```

**파일 위치:** `src/main/java/com/example/hellospringapi/exception/UsernameAlreadyExistsException.java`

```java
package com.example.hellospringapi.exception;

/**
 * 중복된 사용자명일 때 발생하는 예외
 */
public class UsernameAlreadyExistsException extends RuntimeException {
    public UsernameAlreadyExistsException(String message) {
        super(message);
    }
}
```

#### 6-2. 전역 예외 처리기

**파일 위치:** `src/main/java/com/example/hellospringapi/exception/GlobalExceptionHandler.java`

```java
package com.example.hellospringapi.exception;

import lombok.*;
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
 *
 * 🎯 역할:
 * 1. 모든 Controller에서 발생한 예외를 한 곳에서 처리
 * 2. 일관된 에러 응답 형식 제공
 * 3. Controller 코드를 깔끔하게 유지
 *
 * 📌 어노테이션 설명:
 * @RestControllerAdvice = @ControllerAdvice + @ResponseBody
 *   → 모든 @RestController에서 발생한 예외 처리
 * @ExceptionHandler(XxxException.class)
 *   → 특정 예외 타입을 처리하는 메서드 지정
 *
 * 🔍 동작 흐름:
 * 1. Controller → Service → Exception 발생
 * 2. Spring이 GlobalExceptionHandler에서 해당 예외 핸들러 찾기
 * 3. 핸들러 메서드 실행 → ErrorResponse 반환
 * 4. 클라이언트에게 JSON 응답
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    /**
     * 사용자를 찾을 수 없을 때
     *
     * @param ex UserNotFoundException 객체
     * @return 404 Not Found + 에러 상세 정보
     *
     * 🔍 처리 흐름:
     * 1. Service에서 new UserNotFoundException(...) 던짐
     * 2. Spring이 이 메서드를 찾아서 실행
     * 3. ErrorResponse 생성 후 반환
     */
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(UserNotFoundException ex) {
        log.error("User not found: {}", ex.getMessage());

        ErrorResponse error = ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.NOT_FOUND.value())  // 404
                .error("Not Found")
                .message(ex.getMessage())
                .build();

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    /**
     * 중복된 사용자명일 때
     *
     * @return 409 Conflict
     */
    @ExceptionHandler(UsernameAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleUsernameAlreadyExistsException(UsernameAlreadyExistsException ex) {
        log.error("Username already exists: {}", ex.getMessage());

        ErrorResponse error = ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.CONFLICT.value())  // 409
                .error("Conflict")
                .message(ex.getMessage())
                .build();

        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    /**
     * 유효성 검증 실패 (@Valid에서 발생)
     *
     * @param ex MethodArgumentNotValidException
     * @return 400 Bad Request + 필드별 에러 메시지
     *
     * 🔍 언제 발생하는가?
     * - @Valid @RequestBody UserCreateRequest request
     * - @NotBlank, @Email 등 검증 실패 시
     *
     * 🔍 BindingResult:
     * - 검증 결과를 담고 있는 객체
     * - 어떤 필드가 어떤 이유로 실패했는지 포함
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
            MethodArgumentNotValidException ex) {
        log.error("Validation failed: {}", ex.getMessage());

        // 필드별 에러 메시지 추출
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        ErrorResponse error = ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.BAD_REQUEST.value())  // 400
                .error("Validation Failed")
                .message("입력값 검증에 실패했습니다")
                .validationErrors(errors)
                .build();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    /**
     * 기타 모든 예외 (Fallback)
     *
     * @param ex 예상치 못한 예외
     * @return 500 Internal Server Error
     *
     * 🔍 언제 실행되는가?
     * - 위에서 처리하지 않은 모든 예외
     * - NullPointerException, IllegalArgumentException 등
     *
     * ⚠️ 실무에서는:
     * - 상세 에러 스택을 로그에만 기록
     * - 클라이언트에게는 "서버 오류가 발생했습니다"만 반환
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex) {
        log.error("Unexpected error: ", ex);

        ErrorResponse error = ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())  // 500
                .error("Internal Server Error")
                .message("서버 오류가 발생했습니다")
                .build();

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}

/**
 * 에러 응답 DTO
 *
 * 🎯 역할:
 * - 클라이언트에게 일관된 에러 형식 제공
 * - 디버깅에 필요한 정보 포함
 *
 * 응답 예시:
 * {
 *   "timestamp": "2025-01-15T10:30:00",
 *   "status": 400,
 *   "error": "Validation Failed",
 *   "message": "입력값 검증에 실패했습니다",
 *   "validationErrors": {
 *     "username": "사용자명은 3-20자 사이여야 합니다",
 *     "email": "올바른 이메일 형식이 아닙니다"
 *   }
 * }
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
class ErrorResponse {
    private LocalDateTime timestamp;  // 에러 발생 시각
    private int status;               // HTTP 상태 코드
    private String error;             // 에러 유형
    private String message;           // 에러 메시지
    private Map<String, String> validationErrors;  // 필드별 검증 에러
}
```

**예외 처리 흐름 전체:**
```
1. Client: POST /api/users {"username": "ab"}
      ↓
2. Controller: @Valid가 검증 실행
      ↓ (검증 실패)
3. MethodArgumentNotValidException 발생
      ↓
4. Spring이 GlobalExceptionHandler 찾기
      ↓
5. handleValidationException() 메서드 실행
      ↓
6. ErrorResponse 생성 및 반환
      ↓
7. Client: 400 Bad Request + JSON 응답
```

---

### Step 7: 설정 파일 작성

**파일 위치:** `src/main/resources/application.yml`

```yaml
# application.yml - Spring Boot 설정 파일
#
# 🔍 왜 application.yml인가?
# - application.properties 보다 가독성 좋음
# - 계층 구조 표현 쉬움
# - 리스트 표현 가능
#
# 🔍 설정 우선순위:
# 1. 명령행 인수 (--server.port=9000)
# 2. application.yml
# 3. application-{profile}.yml (dev, prod 등)

# 서버 설정
server:
  port: 8080  # 서버 포트 (기본값: 8080)
  servlet:
    context-path: /  # 애플리케이션 기본 경로
    # context-path: /api → 모든 경로가 /api/... 가 됨

# 애플리케이션 이름
spring:
  application:
    name: hello-spring-api  # 앱 식별자 (로그, 모니터링에서 사용)

  # DevTools 설정 (개발 편의 기능)
  devtools:
    restart:
      enabled: true  # 코드 변경 시 자동 재시작
    livereload:
      enabled: true  # 브라우저 자동 새로고침

  # Jackson (JSON 직렬화/역직렬화)
  jackson:
    serialization:
      write-dates-as-timestamps: false  # 날짜를 ISO-8601 형식으로
      indent-output: true  # JSON 예쁘게 출력 (들여쓰기)
    deserialization:
      fail-on-unknown-properties: false  # 모르는 필드 무시

# 로깅 설정
logging:
  level:
    root: INFO  # 기본 로그 레벨
    com.example.hellospringapi: DEBUG  # 우리 패키지만 DEBUG 레벨
    org.springframework.web: DEBUG  # Spring Web 디버깅
  pattern:
    console: '%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n'
    # 출력 예: "14:30:45.123 [main] INFO  UserService - Creating user..."
  file:
    name: ./logs/application.log  # 로그 파일 경로
    max-size: 10MB  # 파일 최대 크기
    max-history: 30  # 최대 30일 보관

# Swagger/OpenAPI 설정
springdoc:
  swagger-ui:
    path: /swagger-ui.html  # Swagger UI 경로
    enabled: true  # Swagger UI 활성화
    operations-sorter: method  # HTTP 메서드별 정렬 (GET, POST, ...)
  api-docs:
    path: /v3/api-docs  # OpenAPI 스펙 JSON 경로
```

**application.properties 버전 (같은 내용):**
```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/

# Application Name
spring.application.name=hello-spring-api

# DevTools
spring.devtools.restart.enabled=true
spring.devtools.livereload.enabled=true

# Jackson
spring.jackson.serialization.write-dates-as-timestamps=false
spring.jackson.serialization.indent-output=true

# Logging
logging.level.root=INFO
logging.level.com.example.hellospringapi=DEBUG

# Swagger
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.swagger-ui.enabled=true
springdoc.api-docs.path=/v3/api-docs
```

---

### Step 8: 메인 애플리케이션 클래스

**파일 위치:** `src/main/java/com/example/hellospringapi/HelloSpringApiApplication.java`

```java
package com.example.hellospringapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Spring Boot 애플리케이션 진입점
 *
 * 🔍 @SpringBootApplication의 비밀:
 * 이 어노테이션 하나가 3개의 어노테이션을 포함함!
 *
 * @SpringBootApplication =
 *   @Configuration +
 *   @EnableAutoConfiguration +
 *   @ComponentScan
 *
 * 1. @Configuration:
 *    - 이 클래스가 설정 클래스임을 명시
 *    - @Bean 메서드 정의 가능
 *
 * 2. @EnableAutoConfiguration:
 *    - Spring Boot의 자동 설정 활성화
 *    - 클래스패스를 보고 필요한 Bean 자동 생성
 *    - 예: spring-boot-starter-web 있으면 → DispatcherServlet 자동 설정
 *
 * 3. @ComponentScan:
 *    - 이 클래스가 있는 패키지와 하위 패키지를 스캔
 *    - @Component, @Service, @Repository, @Controller 찾아서 Bean 등록
 *
 * 🔍 ComponentScan 범위:
 * com.example.hellospringapi/  ← 여기서 스캔 시작
 *   ├── controller/  ✅ 스캔됨
 *   ├── service/     ✅ 스캔됨
 *   └── repository/  ✅ 스캔됨
 *
 * com.other.package/  ❌ 스캔 안 됨! (다른 패키지)
 */
@SpringBootApplication
public class HelloSpringApiApplication {

    /**
     * 애플리케이션 시작점
     *
     * 🔍 SpringApplication.run()이 하는 일:
     * 1. ApplicationContext 생성 (Spring Container)
     * 2. ComponentScan 실행 (Bean 찾기)
     * 3. AutoConfiguration 실행 (자동 설정)
     * 4. Bean 인스턴스 생성 및 의존성 주입
     * 5. 내장 Tomcat 서버 시작
     * 6. 애플리케이션 실행 준비 완료!
     *
     * 출력 예:
     * Started HelloSpringApiApplication in 2.3 seconds
     * Tomcat started on port(s): 8080 (http)
     */
    public static void main(String[] args) {
        SpringApplication.run(HelloSpringApiApplication.class, args);
    }
}
```

**main 메서드 실행 로그 분석:**
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.1)

2025-01-15T14:30:45.123 INFO  --- [main] c.e.h.HelloSpringApiApplication : Starting HelloSpringApiApplication
2025-01-15T14:30:45.456 INFO  --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat initialized with port(s): 8080 (http)
2025-01-15T14:30:46.789 INFO  --- [main] c.e.h.HelloSpringApiApplication : Started HelloSpringApiApplication in 2.3 seconds
```

---

## Swagger 완전 정복

> **이 섹션이 가장 중요합니다!** Swagger가 어떻게 동작하는지 완벽히 이해하세요.

### 1. Swagger란 무엇인가?

**Swagger (현재는 OpenAPI)**
- REST API를 **자동으로 문서화**해주는 도구
- 브라우저에서 **API를 직접 테스트** 가능
- Postman 없이도 API 테스트 가능!

**비교:**
| 도구 | 용도 |
|------|------|
| Postman | 수동으로 요청 작성 후 테스트 |
| Swagger UI | 자동으로 문서 생성 + 브라우저에서 테스트 |
| curl | 터미널에서 테스트 |

---

### 2. SpringDoc 의존성 추가

**파일 위치:** `build.gradle.kts` 또는 `pom.xml`

```kotlin
// build.gradle.kts (Gradle + Kotlin DSL)
dependencies {
    // 기존 의존성들...
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")
    developmentOnly("org.springframework.boot:spring-boot-starter-devtools")

    // 👇 Swagger 의존성 추가
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.7.0")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
}
```

```xml
<!-- pom.xml (Maven) -->
<dependencies>
    <!-- 기존 의존성들... -->

    <!-- Swagger 의존성 -->
    <dependency>
        <groupId>org.springdoc</groupId>
        <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
        <version>2.7.0</version>
    </dependency>
</dependencies>
```

**🔍 이 의존성이 하는 일:**
1. **Swagger UI** 웹 페이지 제공
2. **OpenAPI 3.0 스펙** 자동 생성
3. Spring MVC Controller를 자동으로 스캔하여 API 문서화

---

### 3. SwaggerConfig 클래스 작성

**파일 위치:** `src/main/java/com/example/hellospringapi/config/SwaggerConfig.java`

```java
package com.example.hellospringapi.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Swagger/OpenAPI 설정
 *
 * 🔍 왜 Config 클래스를 만드는가?
 *
 * 1. SpringDoc이 기본 제공하는 것:
 *    - /swagger-ui.html 경로
 *    - 자동으로 Controller 스캔
 *    - 기본 UI
 *
 * 2. 우리가 추가로 설정하는 것:
 *    - API 문서 제목, 설명, 버전
 *    - 개발자 연락처
 *    - 라이센스 정보
 *
 * 📌 @Configuration:
 * - 이 클래스가 설정 클래스임을 Spring에게 알림
 * - @Bean 메서드를 스캔하여 Bean 등록
 *
 * 📌 @Bean:
 * - 이 메서드의 반환값을 Spring Bean으로 등록
 * - Spring이 OpenAPI 객체를 관리
 */
@Configuration
public class SwaggerConfig {

    /**
     * OpenAPI Bean 생성
     *
     * 🔍 왜 Bean으로 등록하는가?
     * - SpringDoc이 이 Bean을 찾아서 사용
     * - Swagger UI에 표시할 정보 설정
     *
     * @return OpenAPI 설정 객체
     */
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Hello Spring API")  // API 문서 제목
                        .version("1.0.0")           // API 버전
                        .description("Spring Boot REST API 학습 프로젝트")  // 설명
                        .contact(new Contact()      // 개발자 정보
                                .name("Your Name")
                                .email("your-email@example.com")
                                .url("https://github.com/yourusername"))
                        .license(new License()      // 라이센스 (선택사항)
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0.html")));
    }
}
```

**🔍 이 설정이 없으면?**
- Swagger UI는 작동함!
- 하지만 문서 제목이 "OpenAPI definition", 버전이 "v0"으로 표시됨
- 개발자 정보 없음

---

### 4. Swagger가 URL을 자동으로 생성하는 원리

**핵심 질문: "왜 Config만 만들었는데 http://localhost:8080/swagger-ui.html 경로가 생기나?"**

#### 4-1. Spring Boot Auto-Configuration의 마법

```java
// SpringDoc 라이브러리 내부 (springdoc-openapi-starter-webmvc-ui)
@Configuration
@AutoConfiguration  // Spring Boot가 자동으로 실행
public class SpringDocWebMvcConfiguration {

    @Bean
    @ConditionalOnMissingBean  // 사용자가 만들지 않았으면 자동 생성
    public SwaggerIndexPageTransformer swaggerIndexPageTransformer() {
        // Swagger UI HTML 페이지 제공
    }

    @Bean
    public SwaggerWelcomeWebMvc swaggerWelcomeWebMvc() {
        // /swagger-ui.html 경로 등록
    }
}
```

**동작 흐름:**
```
1. build.gradle에 springdoc-openapi-starter-webmvc-ui 추가
      ↓
2. Spring Boot 시작 시 클래스패스 스캔
      ↓
3. SpringDocWebMvcConfiguration 발견
      ↓
4. @AutoConfiguration이 자동으로 이 클래스 실행
      ↓
5. Swagger UI 관련 Bean 생성
      ↓
6. /swagger-ui.html, /v3/api-docs 경로 자동 등록!
```

#### 4-2. 어떻게 Controller를 자동으로 찾는가?

```java
// SpringDoc 내부 동작 (의사 코드)
@Component
public class OpenApiScanner {

    @Autowired
    private ApplicationContext context;

    public void scanControllers() {
        // 1. Spring Container에서 모든 Bean 가져오기
        Map<String, Object> beans = context.getBeansWithAnnotation(RestController.class);

        // 2. 각 Controller의 메서드 분석
        for (Object controller : beans.values()) {
            Method[] methods = controller.getClass().getMethods();

            for (Method method : methods) {
                // 3. @GetMapping, @PostMapping 등 찾기
                if (method.isAnnotationPresent(GetMapping.class)) {
                    GetMapping mapping = method.getAnnotation(GetMapping.class);

                    // 4. OpenAPI 스펙에 추가
                    addToSpec("GET", mapping.value(), method);
                }
            }
        }
    }
}
```

**실제 예시:**
```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping  // ← SpringDoc이 이걸 찾음!
    public List<UserResponse> getAllUsers() { ... }
}

// SpringDoc이 자동으로 생성하는 OpenAPI 스펙:
{
  "paths": {
    "/api/users": {
      "get": {
        "summary": "getAllUsers",
        "operationId": "getAllUsers",
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": { "$ref": "#/components/schemas/UserResponse" }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

---

### 5. Swagger UI 접속 및 사용법

#### 5-1. 접속 방법

```bash
# 1. 애플리케이션 실행
./gradlew bootRun

# 2. 브라우저에서 접속
http://localhost:8080/swagger-ui.html
```

#### 5-2. Swagger UI 화면 구성

```
┌─────────────────────────────────────────────────────┐
│  Hello Spring API - Swagger UI                     │
│  version: 1.0.0                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  user-controller                                    │
│    GET  /api/users          모든 사용자 조회         │
│    POST /api/users          새 사용자 생성           │
│    GET  /api/users/{id}     특정 사용자 조회         │
│    PUT  /api/users/{id}     사용자 수정             │
│    DELETE /api/users/{id}   사용자 삭제             │
│    GET  /api/users/health   헬스 체크               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### 5-3. API 테스트 실습

**예시: POST /api/users (새 사용자 생성)**

1. Swagger UI에서 `POST /api/users` 클릭
2. "Try it out" 버튼 클릭
3. Request body 입력:
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "age": 30
}
```
4. "Execute" 버튼 클릭
5. 응답 확인:
```json
// 201 Created
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "age": 30,
  "role": "USER"
}
```

---

### 6. Controller에 Swagger 어노테이션 추가 (선택사항)

**더 상세한 문서를 원하면:**

```java
package com.example.hellospringapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

/**
 * @Tag: Controller 그룹핑 및 설명
 */
@Tag(name = "User API", description = "사용자 관리 API")
@RestController
@RequestMapping("/api/users")
public class UserController {

    /**
     * @Operation: API 엔드포인트 설명
     * @ApiResponses: 가능한 응답 상태 코드 설명
     */
    @Operation(
        summary = "모든 사용자 조회",
        description = "시스템에 등록된 모든 사용자를 조회합니다."
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "조회 성공",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = UserResponse.class)
            )
        ),
        @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        // ...
    }

    /**
     * @Parameter: 파라미터 설명
     */
    @Operation(summary = "특정 사용자 조회", description = "ID로 사용자를 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "조회 성공"),
        @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없음")
    })
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(
            @Parameter(description = "사용자 ID", required = true, example = "1")
            @PathVariable Long id) {
        // ...
    }
}
```

**Swagger UI에서 변화:**
- API 설명이 더 상세해짐
- 파라미터 예시값 표시됨
- 응답 스키마 자동 생성됨

---

### 7. Swagger 관련 자주 발생하는 문제

#### 문제 1: 404 Not Found

```
브라우저: http://localhost:8080/swagger-ui.html
응답: 404 Not Found
```

**원인 & 해결:**
```bash
# 1. 의존성이 제대로 추가되었는지 확인
./gradlew dependencies | grep springdoc

# 2. 애플리케이션 재시작
./gradlew bootRun

# 3. 올바른 URL인지 확인
# ✅ 맞는 URL: http://localhost:8080/swagger-ui.html
# ❌ 틀린 URL: http://localhost:8080/swagger-ui/
```

#### 문제 2: API가 Swagger UI에 안 보임

```java
// ❌ 잘못된 패키지 구조
com.other.project/
  └── controller/
      └── UserController.java  // 다른 패키지!

com.example.hellospringapi/
  └── HelloSpringApiApplication.java
```

**해결:**
```java
// ✅ 올바른 패키지 구조
com.example.hellospringapi/
  ├── HelloSpringApiApplication.java
  └── controller/
      └── UserController.java  // 같은 패키지 하위!
```

#### 문제 3: Swagger UI가 느림

**원인:**
- 모든 요청마다 OpenAPI 스펙 재생성

**해결:**
```yaml
# application.yml
springdoc:
  swagger-ui:
    path: /swagger-ui.html
  api-docs:
    enabled: true
  cache:
    disabled: false  # 캐싱 활성화
```

---

### 8. Swagger vs Postman 비교

| 기능 | Swagger UI | Postman |
|------|-----------|---------|
| 설치 필요 | ❌ (브라우저만) | ✅ (앱 설치) |
| 자동 문서화 | ✅ | ❌ (수동 작성) |
| 팀 공유 | ✅ (URL만 공유) | ⚠️ (Collection 내보내기) |
| 환경 변수 | ❌ | ✅ |
| 테스트 자동화 | ❌ | ✅ |
| 실무 추천 | 개발 중 테스트 | API 통합 테스트 |

**실무에서는 둘 다 사용:**
- **개발 중**: Swagger UI로 빠르게 테스트
- **QA/배포**: Postman으로 정식 테스트

---

## 자주 발생하는 문제와 해결법

### 문제 1: Lombok이 작동 안 함

```java
@Getter
@Setter
public class User {
    private String username;
}

// 컴파일 에러:
// error: cannot find symbol
//   user.getUsername()
```

**원인:**
- Lombok Annotation Processing이 비활성화됨

**해결:**
```
IntelliJ:
1. File > Settings > Build > Compiler > Annotation Processors
2. ✅ Enable annotation processing 체크
3. 프로젝트 재빌드: Build > Rebuild Project
```

---

### 문제 2: Bean을 찾을 수 없음

```
Error creating bean with name 'userController':
Unsatisfied dependency expressed through field 'userService'
...
NoSuchBeanDefinitionException: No qualifying bean of type 'UserService'
```

**원인 1: @Service 어노테이션 누락**
```java
// ❌ 어노테이션 없음
public class UserService { }

// ✅ 수정
@Service
public class UserService { }
```

**원인 2: 패키지 구조 문제**
```
❌ 잘못된 구조:
com.other.package/
  └── UserService.java  // 스캔 안 됨!

com.example.hellospringapi/
  └── HelloSpringApiApplication.java

✅ 올바른 구조:
com.example.hellospringapi/
  ├── HelloSpringApiApplication.java
  └── service/
      └── UserService.java  // 스캔됨!
```

---

### 문제 3: 순환 참조 (Circular Dependency)

```
The dependencies of some of the beans in the application context form a cycle:

┌─────┐
│  userService
↑     ↓
│  orderService
└─────┘
```

**원인:**
```java
@Service
public class UserService {
    private final OrderService orderService;  // UserService → OrderService
}

@Service
public class OrderService {
    private final UserService userService;  // OrderService → UserService
}
```

**해결 1: 설계 개선 (권장)**
```java
// 중간에 Facade 도입
@Service
public class UserOrderFacade {
    private final UserService userService;
    private final OrderService orderService;
}
```

**해결 2: @Lazy 사용 (임시방편)**
```java
@Service
public class UserService {
    private final OrderService orderService;

    public UserService(@Lazy OrderService orderService) {
        this.orderService = orderService;
    }
}
```

---

### 문제 4: 포트 이미 사용 중

```
***************************
APPLICATION FAILED TO START
***************************

Description:
Web server failed to start. Port 8080 was already in use.
```

**해결 1: 포트 변경**
```yaml
# application.yml
server:
  port: 8081  # 다른 포트 사용
```

**해결 2: 기존 프로세스 종료**
```bash
# Mac/Linux
lsof -i :8080
kill -9 <PID>

# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

---

## 테스트 코드 작성

> **Phase 6**에서 자세히 다루지만, 기본적인 테스트는 Phase 1에서도 작성 가능

### Controller 테스트 (간단한 버전)

**파일 위치:** `src/test/java/com/example/hellospringapi/controller/UserControllerTest.java`

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
 *
 * 📌 @WebMvcTest:
 * - Controller만 테스트 (Service, Repository는 Mock)
 * - Spring MVC 인프라만 로드 (빠른 테스트)
 *
 * 📌 MockMvc:
 * - 실제 HTTP 요청 없이 Controller 테스트
 * - perform(), andExpect() 메서드 체인으로 검증
 */
@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;  // HTTP 요청 시뮬레이션

    @MockBean  // Service를 Mock으로 대체
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;  // JSON ↔ 객체 변환

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

        // userService.getAllUsers()가 호출되면 위 리스트 반환
        given(userService.getAllUsers()).willReturn(users);

        // When & Then (실행 & 검증)
        mockMvc.perform(get("/api/users"))  // GET /api/users 요청
                .andExpect(status().isOk())  // 200 OK 검증
                .andExpect(jsonPath("$", hasSize(2)))  // 배열 크기 2
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
                .andExpect(status().isCreated())  // 201 Created
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.username").value("newuser"))
                .andExpect(jsonPath("$.role").value("USER"));
    }

    @Test
    void createUser_WithInvalidData_ShouldReturnBadRequest() throws Exception {
        // Given - 잘못된 데이터
        UserCreateRequest request = new UserCreateRequest();
        request.setUsername("ab");  // 3자 미만 → @Size 위반!
        request.setEmail("invalid-email");  // @Email 위반!
        request.setPassword("pass");  // 8자 미만 → @Size 위반!

        // When & Then
        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())  // 400 Bad Request
                .andExpect(jsonPath("$.validationErrors").exists());
    }
}
```

**테스트 실행:**
```bash
# Gradle
./gradlew test

# Maven
./mvnw test

# 특정 테스트만 실행
./gradlew test --tests UserControllerTest
```

---

## 실행 및 테스트

### 1. 애플리케이션 실행

```bash
# Gradle
./gradlew bootRun

# Maven
./mvnw spring-boot:run

# JAR 빌드 후 실행
./gradlew build
java -jar build/libs/hello-spring-api-0.0.1-SNAPSHOT.jar
```

### 2. curl로 API 테스트

```bash
# 1. 헬스 체크
curl http://localhost:8080/api/users/health
# 출력: "User API is running!"

# 2. 모든 사용자 조회 (처음엔 빈 배열)
curl http://localhost:8080/api/users
# 출력: []

# 3. 새 사용자 생성
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john",
    "email": "john@example.com",
    "password": "password123",
    "age": 30
  }'
# 출력:
# {
#   "id": 1,
#   "username": "john",
#   "email": "john@example.com",
#   "age": 30,
#   "role": "USER"
# }

# 4. 생성한 사용자 조회
curl http://localhost:8080/api/users/1
# 출력: (위와 동일)

# 5. 사용자 정보 수정
curl -X PUT http://localhost:8080/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newemail@example.com",
    "age": 31
  }'

# 6. 사용자 삭제
curl -X DELETE http://localhost:8080/api/users/1
# 응답 없음 (204 No Content)

# 7. 검증 실패 테스트
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "ab",
    "email": "invalid",
    "password": "123"
  }'
# 출력:
# {
#   "timestamp": "2025-01-15T10:30:00",
#   "status": 400,
#   "error": "Validation Failed",
#   "message": "입력값 검증에 실패했습니다",
#   "validationErrors": {
#     "username": "사용자명은 3-20자 사이여야 합니다",
#     "email": "올바른 이메일 형식이 아닙니다",
#     "password": "비밀번호는 최소 8자 이상이어야 합니다"
#   }
# }
```

### 3. Swagger UI로 테스트

```
1. 브라우저 열기: http://localhost:8080/swagger-ui.html
2. "POST /api/users" 클릭
3. "Try it out" 버튼 클릭
4. Request body 입력 후 "Execute"
5. 응답 확인
```

---

## 체크리스트

### ✅ 개념 이해

- [ ] IoC와 DI의 개념을 설명할 수 있다
- [ ] Spring Container(ApplicationContext)의 역할을 이해한다
- [ ] @Component, @Service, @Repository, @Controller의 차이를 안다
- [ ] 생성자 주입이 권장되는 이유 3가지를 말할 수 있다
- [ ] DTO와 Domain을 분리하는 이유를 설명할 수 있다
- [ ] 계층형 아키텍처의 장점을 안다

### ✅ 구현 능력

- [ ] Spring Boot 프로젝트를 생성하고 실행할 수 있다
- [ ] REST API를 설계하고 구현할 수 있다
- [ ] @Valid를 이용한 입력값 검증을 구현할 수 있다
- [ ] GlobalExceptionHandler로 예외를 처리할 수 있다
- [ ] Swagger를 설정하고 API 문서를 생성할 수 있다

### ✅ 어노테이션 이해

- [ ] @Getter, @Setter, @Builder의 역할을 안다
- [ ] @NotBlank, @Email, @Size의 검증 규칙을 안다
- [ ] @RestController = @Controller + @ResponseBody 임을 안다
- [ ] @RequestMapping, @GetMapping, @PostMapping의 차이를 안다
- [ ] @PathVariable과 @RequestBody의 역할을 안다
- [ ] @RestControllerAdvice와 @ExceptionHandler의 동작을 이해한다

### ✅ 테스트

- [ ] @WebMvcTest를 사용한 Controller 테스트를 작성할 수 있다
- [ ] MockMvc로 HTTP 요청을 시뮬레이션할 수 있다
- [ ] curl로 API를 테스트할 수 있다
- [ ] Swagger UI로 API를 테스트할 수 있다

### ✅ 문제 해결

- [ ] "Bean을 찾을 수 없음" 에러를 해결할 수 있다
- [ ] Lombok이 작동 안 할 때 해결할 수 있다
- [ ] 포트 충돌 문제를 해결할 수 있다
- [ ] Swagger UI가 안 보일 때 원인을 찾을 수 있다

---

## 다음 단계: Phase 2 - 데이터베이스 연동

Phase 1을 완료하셨다면, 다음 단계에서는:

### 변경되는 부분

```java
// Phase 1 (지금)
@Repository
public class UserRepository {
    private final Map<Long, User> userStore = new ConcurrentHashMap<>();
    // 직접 구현...
}

// Phase 2 (다음)
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    // 구현 코드 없음! Spring Data JPA가 자동 생성
}
```

```java
// Phase 1
public class User {
    private Long id;
    private String username;
}

// Phase 2
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;
}
```

**Phase 2에서 배울 내용:**
1. **JPA/Hibernate**: 객체-관계 매핑
2. **Spring Data JPA**: Repository 인터페이스만 선언하면 구현체 자동 생성
3. **연관관계 매핑**: User ↔ Post (1:N), Post ↔ Comment (1:N)
4. **@Transactional**: 트랜잭션 관리
5. **Query Methods**: 메서드 이름으로 쿼리 자동 생성

---

## 🎉 축하합니다!

Phase 1을 완료하셨습니다!

**지금까지 배운 내용:**
✅ Spring Boot 프로젝트 구조
✅ IoC/DI 개념과 실전 적용
✅ REST API 개발 (CRUD)
✅ 계층형 아키텍처
✅ 예외 처리 전략
✅ Swagger를 이용한 API 문서화
✅ 기본 테스트 작성

**다음 단계 준비:**
- [ ] Phase 1 프로젝트를 GitHub에 푸시
- [ ] README.md 작성 (API 엔드포인트 설명)
- [ ] 어노테이션_완전정복.md 복습
- [ ] Phase 2 예습 (JPA 기본 개념)

궁금한 점이나 막히는 부분이 있다면 언제든 질문해주세요! 💪

---

## 📚 추가 학습 자료

### 필수 읽기
1. [Spring Boot Reference](https://docs.spring.io/spring-boot/docs/current/reference/html/)
2. [Baeldung Spring Tutorial](https://www.baeldung.com/spring-tutorial)
3. [SpringDoc OpenAPI 가이드](https://springdoc.org/)

### 동영상 강의
1. Inflearn: "스프링 입문 - 코드로 배우는 스프링 부트" (김영한) ⭐⭐⭐⭐⭐
2. YouTube: "Spring Boot Tutorial for Beginners" by Amigoscode

### 실습 과제
1. User API에 검색 기능 추가 (`GET /api/users?username=john`)
2. Post 도메인 추가 (User와 연관 없이 독립적으로)
3. 커스텀 검증 어노테이션 만들기 (`@UniqueUsername`)

---

**문서 버전:** 1.0
**최종 수정일:** 2025-01-15
**작성자:** Claude Code Assistant
