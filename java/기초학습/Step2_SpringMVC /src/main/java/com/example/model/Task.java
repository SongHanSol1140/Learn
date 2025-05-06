package com.example.model;

import java.util.Objects;

public class Task extends Object {
    // 원자적 ID 생성을 위한 정적 카운터
    // private static final AtomicLong counter = new AtomicLong(); // ID 자동 생성을 위해 추가

    private long id; // 할일 고유 ID
    private String description; // 할 일 설명
    private boolean completed; // 완료 여부

    // 기본 생성자(필요한 경우 수정)
    public Task() {}

    // 생성자 : ID 자동 할당 제거 (Service에서 관리하도록 변경)
    public Task(String description){
        // this.id = counter.incrementAndGet(); // ID 자동 생성 로직 제거
        this.setDescription(description);
        this.completed = false;
    }
    public Task(long id, String description) {
        this.id = id;
        this.setDescription(description);
        this.completed = false;
    }

    // Getter
    public long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public boolean isCompleted() {
        return completed;
    }

    // Setter
    public void setId(long id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // 객체 표현 및 비교
    @Override
    public String toString() {
        // 객체를 System.out.println()등으로 출력할 때 보여질 문자열 형식
        // 삼항 연산자(condition? value_if_true : value_if_false) 사용
        return "Task[id=" + id + ", description=" + description + ", completed=" + (completed ? "Y" : "N") + "]";
    }

    @Override
    public boolean equals(Object o) {
        // 객체 동등성 비교 로직 정의(주로 ID 기반으로 비교)
        if (this == o) return true;
        // instanceof : 객체가 특정클래스(또는 하위클래스)의 인스턴스인지 확인
        // getClass() : 객체의 런타임 클래스를 반환
        if (o == null || getClass() != o.getClass()) return false; // null 또는 다른 클래스 타입 확인
        Task task = (Task) o; // 비교 대상 객체를 Task 타입으로 형변환
        return id == task.id && completed == task.completed && Objects.equals(description, task.description);
    }
    @Override
    public int hashCode(){
        // 객체의 해시 코드 생성 로직 정의 (equals에서 사용된 필드 기반)
        // Objects.hash(): 주어진 값들을 기반으로 해시코드 생성
        return Objects.hash(id, description, completed);
    }

}


