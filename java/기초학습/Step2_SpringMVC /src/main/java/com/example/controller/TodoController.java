package com.example.controller;

import com.example.service.TodoService; // 사용할 서비스 인터페이스 import
import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위해서 사용(생성자 주입 시 생략 가능)
import org.springframework.stereotype.Controller; // 이 클레스가 웹 컨트롤러임을 나타냄
import org.springframework.web.bind.annotation.GetMapping; // HTTP GET 요청을 특정 메서드에 매핑


/*
 * @Controller: 이 클래스가 Spring MVC 컨트롤러임을 나타냅니다.
 * 스프링은 이 어노테이션이 붙은 클래스에서 @RequestMapping (또는 @GetMapping, @PostMapping 등)을 찾아 요청을 처리할 메소드를 결정합니다.
 * 주로 HTML 뷰를 반환하는 웹 애플리케이션에 사용됩니다.
 * REST API처럼 데이터(JSON/XML) 자체를 반환하려면 @RestController를 사용합니다.
 * @RestController는 @Controller와 @ResponseBody를 합친 것 입니다.
 */
@Controller
public class TodoController {
    // 서비스 계층 의존성 선언(final 키워드로 불변성 확보 권장)



    private final TodoService todoService;

    // 의존성 주입(Dependency Injection)
    // @Autowired: 스프링 컨테이너에게 해당 타입(TodoService)의 빈(Bean)을 찾아 자동으로 주입하도록 지시합니다.
    // 생성자가 하나만 있는 경우, 스프링 4.3 버전부터는 @Autowired를 생략해도 자동으로 주입됩니다 (권장 방식).
    // 이를 '생성자 주입(Constructor Injection)'이라고 하며, 필드 주입(Field Injection)이나 세터 주입(Setter Injection)보다 권장됩니다.
    // 이유: 의존성 불변성 확보, 순환 참조 방지, 테스트 용이성 등
    // @Autowired // 생성자가 하나이므로 생략 가능
    @Autowired
    public TodoController(TodoService todoService, TodoService todoService2) {
        this.todoService = todoService;
    }
    // --- 요청 핸들러 메소드 ---
    // @GetMapping("/"): HTTP GET 요청 중 루트 경로("/")를 이 메소드와 매핑합니다.
    // 사용자가 웹사이트의 기본 주소로 접속했을 때 이 메소드가 호출됩니다.
    @GetMapping("/")
    public String showHomePage(){
        // "index"라는 이름의 뷰(View)를 반환하도록 지정합니다.
        // 스프링 부트는 Thymeleaf 설정에 따라 src/main/resources/templates 디렉토리에서
        // "index.html" 파일을 찾아 렌더링합니다.
        return "index"; // 논리적 뷰 이름 반환
    }

    // 여기에 할 일 목록 조회, 추가, 완료 처리 등을 위한 핸들러 메소드들을 추가할 예정입니다.

}