package spring.study.step_2_java_value_objects;

import org.springframework.util.StringUtils;

public record Email(String value) {
    // 이것이 record의 '소형 생성자(Compact Constructor)'입니다.
    // 필드에 값이 할당되기 전에 유효성 검증 로직을 넣기 완벽한 장소입니다.
    public Email {
        // 1. 이메일 값이 비어있는지 확인
        if (!StringUtils.hasText(value)) {
            throw new IllegalArgumentException("이메일 값은 비어 있을 수 없습니다.");
        }
        // 2. '@' 문자를 포함하는지 확인
        if (!value.contains("@")) {
            throw new IllegalArgumentException("유효하지 않은 이메일 형식입니다.");
        }
    }
}