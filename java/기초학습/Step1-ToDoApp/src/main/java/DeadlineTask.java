// DeadlineTask.java
import java.util.Objects;

public class DeadlineTask extends Task {
    // 마감일 필드
    private String deadline;

    public DeadlineTask(String description, String deadline) {
        super(description);
        this.deadline = deadline;
    }

    @Override
    public String toString() {
        // 부모 클래스(Task)의 toString() 결과를 활용하여 마감일 정보 추가
        return super.toString() + ", 마감일 : " + deadline;
    }

    // Getter and
    public String getDeadline() {
        return deadline;
    }
    // Setter
    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false; // Check parent fields
        DeadlineTask that = (DeadlineTask) o;
        return Objects.equals(deadline, that.deadline);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), deadline);
    }
}
