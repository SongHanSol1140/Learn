// Task.java
import java.util.Objects;

public class Task {
    private String description; // 할 일 설명
    private boolean completed; // 완료 여부

    // 생성자
    public Task(String description) {
        // this.description = description; // 직접 필드에 할당하거나
        this.setDescription(description); // Se
        this.completed = false;
    }

    // Getter
    public String getDescription() {
        return description;
    }
    public boolean isCompleted() { // boolean 타입은 is...
        return completed;
    }


    // Setter
    public void setDescription(String description) {
    // 간단한 유효성 검사 예시
        if (description!= null &&!description.trim().isEmpty()) {
            this.description = description;
        } else {
            System.out.println("오류: 할 일 설명은 비워둘 수 없습니다.");
        }
    }
    public void setCompleted(boolean completed) {
        this.completed = completed;
    }



    // 객체 toString Override
    @Override
    public String toString(){
        // 모든 클래스는 기본적으로 Object로 toString 메소드가 정의되어 있으며
        // println(객체)를 할경우 객체의 toString()이 자동으로 반환됩니다.
        // 따라서 Override toString()을 할 경우 리턴될 값을 바꿀 수 있음(안할경우 객체의 시스템 주소값이 반환됨)
        // 객체를 System.out.println(객체)시 return될 값을 변환할 수 있습니다.

        return "할 일 - " + description + "(완료 : " +  (completed? "Y" : "N") + ")";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Task task = (Task) o;
        return completed == task.completed && Objects.equals(description, task.description);
    }

    @Override
    public int hashCode(){
        return Objects.hash(description, completed);
    }


}
