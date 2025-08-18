package spring.study.step_2_java_value_objects;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.*;

class EmailTest {

    @Test
    @DisplayName("유효한 이메일 주소로 Email 객체를 생성한다")
    void createEmailWithValidAddress() {
        // given
        String validEmailAddress = "test@example.com";

        // when
        Email email = new Email(validEmailAddress);

        // then
        assertThat(email.value()).isEqualTo(validEmailAddress);
    }

    @Test
    @DisplayName("이메일 주소에 '@'가 없으면 예외가 발생한다")
    void createEmailWithInvalidAddress() {
        // given
        String invalidEmailAddress = "testexample.com";

        // when & then
        assertThatThrownBy(() -> new Email(invalidEmailAddress))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("유효하지 않은 이메일 형식입니다.");
    }

    @Test
    @DisplayName("이메일 주소가 비어있으면 예외가 발생한다")
    void createEmailWithEmptyAddress() {
        // given
        String emptyEmailAddress = "";

        // when & then
        assertThatThrownBy(() -> new Email(emptyEmailAddress))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("이메일 값은 비어 있을 수 없습니다.");
    }
}