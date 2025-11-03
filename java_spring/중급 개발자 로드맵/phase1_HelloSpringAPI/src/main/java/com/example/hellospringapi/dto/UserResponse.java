package com.example.hellospringapi.dto;

import com.example.hellospringapi.domain.User;
import lombok.*;
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
