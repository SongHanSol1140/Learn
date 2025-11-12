package com.example.hellospringapi.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;
/**
 * User 도메인 모델
 * - Lombok을 사용하여 보일러플레이트 코드 최소화
 * - Builder 패턴으로 객체 생성 편의성 제공
 * - 주의 : Builder 사용시 IntelliJ IDEA Settings - Plugins - lombok 설치
 */
@Getter
@Setter
@NoArgsConstructor  // 기본 생성자
@AllArgsConstructor // 모든 필드를 받는 생성자
@Builder           // 빌더 패턴 적용
/*

    @NoArgsContructor? @AllArgsContructor?

    @NoArgsConstructor - 기본 생성자
        // Lombok 사용 전 => 기본 생성자를 직접 작성
        public class User {
            private Long id;
            private String username;
            private String email;
            public User() {
            }
        }
        // Lombok 사용 후 => 기본 생성자가 자동 생성됨!
        @NoArgsConstructor
        public class User {
            private Long id;
            private String username;
            private String email;

        }
    @AllArgsConstructor - 모든 필드 생성자

        // Lombok 사용 전 => 모든 필드를 받는 생성자를 직접 작성
        public class User {
            private Long id;
            private String username;
            private String email;

            public User(Long id, String username, String email) {
                this.id = id;
                this.username = username;
                this.email = email;
            }
        }

        // Lombok 사용 후 => 모든 필드를 받는 생성자가 자동 생성됨!
        @AllArgsConstructor
        public class User {
            private Long id;
            private String username;
            private String email;

        }


    @Builder의 사용
    기존 패턴
    // ❌ 생성자 - 뭐가 뭔지 모름
    User user = new User(null, "john", "john@email.com", null, 25, "USER");
    // ✅ 빌더 - 명확함
    User user = User.builder()
        .username("john")
        .email("john@email.com")
        .age(25)
        .role("USER")
        .build();
*/
public class User {
    private Long id;
    private String username;
    private String email;
    private String password;
    private Integer age;
    private String role; // "USER", "ADMIN"

    // 비즈니스 로직 메서드도 포함 가능
    public boolean isAdmin() {
        return "ADMIN".equals(this.role);
    }

}
