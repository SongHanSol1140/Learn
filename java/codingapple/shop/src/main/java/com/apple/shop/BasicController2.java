package com.apple.shop;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Controller
public class BasicController2 {
    // 접속테스트
    @GetMapping("/2")
    @ResponseBody
    String hello() {
        return "안녕하쇼2";
    }

    // 정적파일 제공해보기
    @GetMapping("/page2")
    String hello2() {
        return "index.html";
    }

    // 시간 보여주기
    @GetMapping("/date2")
    @ResponseBody
//    String hello3() {
//        var date = LocalDate.now().toString();
//        return date;
//    }

    String hello4() {
        // 한국 시간 기준 현재 날짜와 시간 가져오기
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        // 원하는 포맷 지정 (예: 2025/03/26 14:30 ss)
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm ss" + "초");
        return now.format(formatter);
    }
}
