/*
 *    핵심 개념:
 * @Service: 이 클래스가 비즈니스 로직을 처리하는 서비스 컴포넌트임을 스프링에게 알립니다.
 * 스프링 컨테이너는 이 클래스의 인스턴스(빈)를 생성하고 관리합니다.
 *
 * 의존성 주입 (Dependency Injection - DI): Controller가 Service를 직접 생성하는 대신,
 * 스프링 컨테이너가 생성된 Service 빈(Bean)을 Controller에 주입해줍니다.
 * 이는 클래스 간의 결합도를 낮추고 유연성과 테스트 용이성을 높입니다. (Controller 구현 시 자세히 설명)
 *
 * In-Memory Store: ConcurrentHashMap과 AtomicLong을 사용하여 간단한 메모리 기반 데이터 저장소를 구현했습니다.
 * 여러 사용자가 동시에 접근하는 웹 환경을 고려하여 동시성(Concurrency)에 안전한 자료구조를 사용했습니다.
 * 실제 애플리케이션에서는 데이터베이스를 사용하는 것이 일반적입니다.
 * Optional<T>: 값이 존재할 수도, 존재하지 않을 수도 있는 경우를 명확하게 표현하기 위해 사용됩니다.
 * null을 직접 반환하는 것보다 NullPointerException(NPE)을 방지하고 코드의 가독성을 높이는 데 도움이 됩니다.
 */
package com.example.service;

import com.example.model.Task;
import org.springframework.stereotype.Service; // 이 클래스가 서비스 계층의 컴포넌트임을 나타냄

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

/*
 *
 * @Service: 스프링 컨테이너가 이 클래스의 인스턴스를 빈(Bean)으로 관리하도록 지정합니다.
 * 이는 컴포넌트 스캔(Component Scan)의 대상이 되며, 다른 컴포넌트에서 의존성 주입(Dependency Injection)을 통해 사용할 수 있게 됩니다.
 */
@Service
public class TodoServiceImpl implements TodoService {
    private final Map<Long, Task> taskStore = new ConcurrentHashMap<>();
    private final AtomicLong idCounter = new AtomicLong();

    /*
     *  새로운 할일을 추가합니다.
     *  @param task 추가할 Task 객체(ID는 서비스 내부에서 할당될 수 있음)
     *  @return 추가된 Task 객체(ID포함)
     */
    @Override
    public Task addTask(Task task) {
        // idCounter.incrementAndGet(): 현재 값을 1 증가시키고 그 결과를 반환(원자적 연산)
        long newId = idCounter.incrementAndGet();
        task.setId(newId);
        return task;
    }

    ;

    /*
     *  모든 할 일 목록을 조회합니다
     *  @return Task 객체 리스트
     */
    public List<Task> findAllTasks() {
        // taskStore.values(): Map의 모든 값(Task 객체들을 Collection 형태로 변환)
        // new ArrayList<>(...): Collection을 사용하여 새로운 ArrayList 생성 (수정 가능한 리스트 반환 목적)
        // 또는 Stream API 사용
        // return taskSTore.values().stream().collect(Collectiors.toList())
        return new ArrayList<>(taskStore.values());
    }

    ;

    /*
     *   특정 ID의 할 일을 조회합니다.
     *   @param id 조회할 할 일의 id
     *   @return 해당 ID의 Task 객체를 담은 Optional (없으면   Optional.empty())
     */
    public Optional<Task> findTaskById(long id) {

        // taskStore.get(key): Map에서 주어진 키에 해당하는 값을 반환 (없으면 null)
        // Optional.ofNullable(value): 주어진 값이 null이 아니면 값을 포함하는 Optional을, null이면 비어있는 Optional을 반환
        return Optional.ofNullable(taskStore.get(id));
    }

    ;

    /*
     *   특정 ID의 할 일을 완료 상태로 변경합니다.
     *   @param id 완료 처리할 할 일의 ID
     *   @return 완료 처리된 Task 객체를 담은 Optional(해당 ID가 없으면 Optional.mepty())
     */
    public Optional<Task> markTaskComplete(long id) {
        // ID로 Task 조회
        Optional<Task> taskOptional = findTaskById(id);
        // taskOptional.ifPresent(lambda): Optional 객체가 값을 포함하고 있을 경우에만 주어진 람다식 실행
        // taskOptional.ifPresent(task -> { task.setCompleted(true); // 완료 상태로 변경
        // taskStore.put(id, task); // 변경된 Task 객체로 Map 업데이트
        // });
        return taskOptional; // 변경되었거나 찾지 못한 Optional 반환
    }

    ;

    /*
     *  특정 ID의 할 일을 삭제합니다. (추후 확장 기능)
     *  @param id 삭제할 할 일의 ID
     *  @return 삭제 성공 여부
     */
    public boolean deleteTask(long id) {
        // taskStore.remove(key): Map에서 주어진 키에 해당하는 항목을 삭제하고, 삭제된 값을 반환 (없으면 null)
        // 삭제 성공 여부 반환 (삭제된 객체가 null이 아니면 true)
        return taskStore.remove(id) != null;
    }


}
