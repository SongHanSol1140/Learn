package com.example.hellospringapi.contoller;

import com.example.hellospringapi.dto.UserResponse;
import com.example.hellospringapi.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/** User REST API Controller
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
    @Operation(summary = "모든 사용자 조회", description = "시스템에 등록된 모든 사용자를 조회합니다")
    @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "조회 성공"),
    @ApiResponse(responseCode = "500", description = "서버 오류")
    })
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
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id){
            log.info("Get /api/users/{} - 사용자 조회 요청", id);
            UserResponse user = userService.getUserById(id);
            return ResponseEntity.ok(user);
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
