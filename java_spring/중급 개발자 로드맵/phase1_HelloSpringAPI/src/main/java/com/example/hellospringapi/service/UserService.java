package com.example.hellospringapi.service;

import com.example.hellospringapi.domain.User;
import com.example.hellospringapi.dto.UserCreateRequest;
import com.example.hellospringapi.dto.UserResponse;
import com.example.hellospringapi.dto.UserUpdateRequest;
import com.example.hellospringapi.exception.UserNotFoundException;
import com.example.hellospringapi.repository.UserRepository;
import com.example.hellospringapi.exception.UsernameAlreadyExistsException;
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
    public UserResponse createUser(UserCreateRequest request){
        log.info("Creating new uesr with username: {}", request.getUsername());

        // 중복 사용자명 체크
        userRepository.findByUsername(request.getUsername())
                .ifPresent(user -> {
                    throw new UsernameAlreadyExistsException        (
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
    public UserResponse getUserById(Long id){
        log.debug("Fetching user with id: {}");
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(
                        "User not found width id: " + id
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


//    ===================================================================================================
}
