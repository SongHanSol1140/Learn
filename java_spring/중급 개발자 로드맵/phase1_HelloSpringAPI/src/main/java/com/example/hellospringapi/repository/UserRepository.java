package com.example.hellospringapi.repository;

import com.example.hellospringapi.domain.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
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
    public Optional<User> findById(Long id){
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
    public void deleteById(Long id){
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
