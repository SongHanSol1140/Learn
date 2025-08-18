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
