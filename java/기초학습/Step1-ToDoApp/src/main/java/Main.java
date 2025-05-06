// Main.java
/*
    학습 후기
    1. 첫번째 학습 후기
        문서의 가이드를 따라서 학습하다보면 사전에 기입되지 않은 함수를 사용한뒤 추후에 추가하는 설명이 있음
        (예시 : saveTasksToFile 함수의 line += "," + ((DeadlineTask) task).getDeadline(); 부분)
        문서를따라서 코드를 만드는데 작성한적 없는 함수가 나오면 굉장히 당혹스러움,
        사용될 함수가 있다면 먼저 작성하는 과정을 거친뒤 그것을 사용하는 식으로 다음 챕터에는 이런일이 없었으면 좋겠습니다.

        먼저 개념을 설명하고 코드를 설명하거나
        코드를 설명하고 개념을 설명하거나 하는데,
        둘다 좋지만 정작 코드에는 최소한의 설명이 적혀있지않아 연결이 안됨

        예시로 instanceof의 경우 코드 이후에 설명이 기입되어있는데,
        처음에 무작정 코드만보다가 instanceof를 보고 "이게 뭐지?" 하고 검색한다음에 하단의 설명을 보았습니다.
        자바의 기본 메서드나 함수(직접 만든 함수제외)를 사용할때 주석으로 설명을 기입해주세요.
        그리고 필요하다면 그 뒤에 추가 설명구간이 존재햇으면 좋겠습니다.
*/
import java.io.*;
import java.util.Scanner;
import java.util.ArrayList;
/*
ArrayList 주요 메소드
    add(object) 객체를 리스트에 추가
    get(index): 지정된 인덱스의 요소를 반환합니다. 인덱스는 0부터 시작합니다.
    size(): 리스트에 저장된 요소의 개수를 반환합니다.
    remove(index): 지정된 인덱스의 요소를 삭제합니다.
    remove(object):
        지정된 객체와 동일한 첫 번째 요소를 삭제합니다. 객체 비교를
        위해 Task 클래스에 equals() 메소드가 오버라이드되어 있어야 정확하게
        동작합니다.
    isEmpty(): 리스트가 비어있는지 확인합니다.
    clear(): 리스트의 모든 요소를 삭제합니다.
 */


/*
stream 연산 종류
    stream()	소스 생성 / 컬렉션으로부터 스트림 생성    / tasks.stream()
    filter()	중간 연산 / 조건에 맞는 요소 선택       / t ->!t.isCompleted()
    map()	    중간 연산	/ 각 요소를 다른 형태로 변환   / Task::getDescription
    collect()	최종 연산	/ 결과를 컬렉션 등으로 수집    / Collectors.toList()
    forEach()	최종 연산	/ 각 요소에 대해 특정 작업 수행 / System.out::println
*/


import java.util.List;

public class Main {

    public static List<Task> tasks = new ArrayList<>();
    private static final String FILENAME = "todolist.txt";

    public static void main(String[] args) {
        System.out.println("Hello, World!");
        loadTasksFromFile(FILENAME); // 앱 시작 시 파일 로드

        Scanner scanner = new Scanner(System.in);
        boolean isRunning = true;

        System.out.println("콘솔 할 일 목록 관리 앱 시작!");
        while (isRunning) {
            printMenu();

            int choice = scanner.nextInt();
            scanner.nextLine(); // nextInt() 후의 줄바꿈 문자 소비

            switch (choice) {
                case 1: // case 1: 할 일 추가 로직 수정 예시
                    addTask(scanner);
                    break;
                case 2:
                    viewTasks();
                    break;
                case 3:
                    markTaskComplete(scanner);
                    break;
                case 4:
                    viewIncompleteTasks();
                    break;
                case 5: // 저장 기능 추가
                    saveTasksToFile(FILENAME);
                    break;
                case 6: // 종료 기능 번호 변경
                    System.out.println("앱을 종료합니다.");
                    saveTasksToFile(FILENAME); // 종료 시 자동 저장
                    isRunning = false;
                    break;
                default:
                    System.out.println("잘못된 입력입니다. 다시 선택해주세요.");
                    break;
            }
        }

        scanner.close(); // Scanner 자원 해제
    }

    private static void printMenu() {
        System.out.println("\n1. 할 일 추가");
        System.out.println("2. 할 일 목록 보기");
        System.out.println("3. 할 일 완료 처리");
        System.out.println("4. 미완료 할 일 보기");
        System.out.println("5. 파일에 저장");
        System.out.println("6. 종료");
        System.out.print("메뉴를 선택하세요: ");
    }

    private static void addTask(Scanner scanner) {
        System.out.println("할 일 종류를 선택하세요 (1: 일반, 2: 마감일): ");
        int taskType = scanner.nextInt();
        scanner.nextLine(); // Consume newline

        System.out.print("할 일 내용을 입력하세요: ");
        String description = scanner.nextLine();

        if (taskType == 1) {
            tasks.add(new Task(description));
            System.out.println("일반 할 일이 추가되었습니다.");
        } else if (taskType == 2) {
            System.out.print("마감일을 입력하세요 (YYYY-MM-DD): ");
            String deadline = scanner.nextLine();
            tasks.add(new DeadlineTask(description, deadline));
            System.out.println("마감일 있는 할 일이 추가되었습니다.");
        } else {
            System.out.println("잘못된 할 일 종류입니다.");
        }
    }
    private static void viewTasks() {
        System.out.println("\n--- 전체 할 일 목록 ---");
        if (tasks.isEmpty()) {
            System.out.println("등록된 할 일이 없습니다.");
        } else {
            for (int i = 0; i < tasks.size(); i++) {
                System.out.println((i + 1) + ". " + tasks.get(i));
            }
        }
        System.out.println("--------------------");
    }
    private static void markTaskComplete(Scanner scanner) {
        viewTasks(); // 완료할 목록을 먼저 보여줌
        if (tasks.isEmpty()) return;

        System.out.print("완료 처리할 할 일 번호를 입력하세요: ");
        int taskNumberToComplete = scanner.nextInt();
        scanner.nextLine(); // Consume newline

        if (taskNumberToComplete > 0 && taskNumberToComplete <= tasks.size()) {
            Task taskToComplete = tasks.get(taskNumberToComplete - 1);
            if (!taskToComplete.isCompleted()) {
                taskToComplete.setCompleted(true);
                System.out.println("'" + taskToComplete.getDescription() + "' 할 일을 완료 처리했습니다.");
            } else {
                System.out.println("이미 완료된 할 일입니다.");
            }
        } else {
            System.out.println("잘못된 번호입니다.");
        }
    }
    private static void viewIncompleteTasks() {
        List<Task> incompleteTasks = tasks.stream()
                .filter(task ->!task.isCompleted())
                .toList();
                // .collect(Collectors.toList());

        System.out.println("\n--- 미완료 할 일 목록 ---");
        if (incompleteTasks.isEmpty()) {
            System.out.println("모든 할 일을 완료했습니다!");
        } else {
            for (int i = 0; i < incompleteTasks.size(); i++) {
                // 원본 리스트에서의 인덱스가 아닌, 미완료 목록에서의 순번 표시
                System.out.println((i + 1) + ". " + incompleteTasks.get(i));
            }
        }
        System.out.println("-----------------------");
    }
    private static void saveTasksToFile(String filename) {
        // try-with-resources : 블록 종료시 자동으로 write.close() 호출
        // try-with-resources: try 괄호 안에 생성된 리소스(BufferedWriter)는 try 블록이 끝나면 자동으로 close() 메소드가 호출됩니다.
        // 이는 리소스 누수를 방지하는 가장 안전하고 권장되는 방법입니다.
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename))) {
            for (Task task : tasks) {
                // instanceof : 객체가 특정 클래스의 인스턴스인지 확인합니다.
                String taskType = (task instanceof DeadlineTask) ? "D" : "T";
                String completedStatus = task.isCompleted() ? "true" : "false";
                String line = taskType + "," + task.getDescription() + "," + completedStatus;

                if (task instanceof DeadlineTask) {
                    line += "," + ((DeadlineTask) task).getDeadline(); // 마감일 추가
                }
                writer.write(line);
                writer.newLine();

            }
            System.out.println("할 일 목록을 " + filename + " 파일에 저장했습니다.");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    // ToDoApp.java에 추가할 메소드 예시
    private static void loadTasksFromFile(String filename) {
        File file = new File(filename);
        if (!file.exists()) {
            System.out.println("저장된 할 일 파일이 없습니다.");
            return;
        }

        // try-with-resources : 블록 종료시 자동으로 write.close() 호출
        // try-with-resources: try 괄호 안에 생성된 리소스(BufferedWriter)는 try 블록이 끝나면 자동으로 close() 메소드가 호출됩니다.
        // 이는 리소스 누수를 방지하는 가장 안전하고 권장되는 방법입니다.
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            tasks.clear(); // 기존 목록 초기화 후 불러오기
            while ((line = reader.readLine())!= null) { // 파일 끝까지 한 줄씩 읽기
                String[] parts = line.split(","); // 쉼표로 데이터 분리
                if (parts.length >= 3) {
                    String taskType = parts[0];
                    String description = parts[1];
                    boolean completed = Boolean.parseBoolean(parts[2]);

                    Task task;
                    if ("D".equals(taskType) && parts.length >= 4) { // DeadlineTask
                        String deadline = parts[3];
                        task = new DeadlineTask(description, deadline);
                    } else { // 일반 Task
                        task = new Task(description);
                    }
                    task.setCompleted(completed); // 완료 상태 설정
                    tasks.add(task);
                }
            }
            System.out.println("'" + filename + "' 파일에서 할 일 목록을 불러왔습니다.");
        } catch (IOException e) {
            System.err.println("파일 로딩 중 오류 발생: " + e.getMessage());
        }
    }
}