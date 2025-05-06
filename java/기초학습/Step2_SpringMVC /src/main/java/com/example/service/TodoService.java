package com.example.service;

import com.example.model.Task;

import java.util.List;
import java.util.Optional; // 값이 없을 수도 있음을 명시적으로 나타내는 컨테이너 객체

/*
 *  서비스 계층의 기능을 정의하는 인터페이스를 먼저 만듭니다. 이는 구현체와의 결합도를 낮추고 테스트 용이성을 높입니다.
 */
public interface TodoService {
    /*
     *  새로운 할일을 추가합니다.
     *  @param task 추가할 Task 객체(ID는 서비스 내부에서 할당될 수 있음)
     *  @return 추가된 Task 객체(ID포함)
     */
    Task addTask(Task task);
    /*
     *  모든 할 일 목록을 조회합니다
     *  @return Task 객체 리스트
     */
    List<Task> findAllTasks();

    /*
     *   특정 ID의 할 일을 조회합니다.
     *   @param id 조회할 할 일의 id
     *   @return 해당 ID의 Task 객체를 담은 Optional (없으면 Optional.empty())
     */
    Optional<Task> findTaskById(long id);

    /*
     *   특정 ID의 할 일을 완료 상태로 변경합니다.
     *   @param id 완료 처리할 할 일의 ID
     *   @return 완료 처리된 Task 객체를 담은 Optional(해당 ID가 없으면 Optional.mepty())
     */
    Optional<Task> markTaskComplete(long id);


    /*
     *  특정 ID의 할 일을 삭제합니다. (추후 확장 기능)
     *  @param id 삭제할 할 일의 ID
     *  @return 삭제 성공 여부
     */
    boolean deleteTask(long id); // 예시: 삭제 기능 인터페이스
}
