package com.example.model;

import java.util.Objects;

public class DeadlineTask extends Task{
    private String deadline; // 마감일 필드

    // 기본 생성자(필요한 경우)
    public DeadlineTask(){
        super(); // 부모 클래스(Task)의 기본 생성자 호출
    }

    // 생성자 : 부모 클래스 생성자 호출 및 deadline 필드 초기화
    public DeadlineTask(String description, String deadline){
        // super(description): 부모 클래스(Task)의 생성자 호출하여 description 등 초기화
        super(description);
        this.deadline = deadline;
    }

    // ID 필드 추가에 따른 생성자 수정
    public DeadlineTask(long id, String description, String deadline){
        super(id, description); // 부모 클래스의 ID 받는 생성자 호출
        this.deadline = deadline;
    }

    // Getter
    public String getDeadline(){
        return deadline;
    }

    // Setter
    public void setDeadline(String deadline){
        this.deadline = deadline;
    }

    // 객체 표현 및 비교 (Override)
    @Override
    public String toString(){
        // super.toString(): 부모 클래스 (Task)의 toString() 메소드 결과 활용
        // 마감일 정보 추가
        return super.toString().replace("]", "deadline=" + deadline + "]");
    }

    @Override
    public boolean equals(Object o){
        if(this == o) return true;
        if(o == null || getClass() != o.getClass()) return false;
        // super.equals(o): 부모 클래스(Task)의 필드(id, description, completed) 비교
        if(!super.equals(o)) return false;
        DeadlineTask that = (DeadlineTask) o;
        // Objects.equals(): deadline 필드 비교 (null-safe)
        return Objects.equals(deadline, that.deadline);
    }

    @Override
    public int hashCode(){
        // Objects.hash(): 부모 클래스 해시코드와 deadline 필드를 조합하여 해시코드 생성
        return Objects.hash(super.hashCode(), deadline);
    }
}
