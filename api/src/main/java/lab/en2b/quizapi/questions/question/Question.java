package lab.en2b.quizapi.questions.question;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Setter;

import java.util.List;

@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;
    private String content;
    private List<Answer> answers;
    private Answer correctAnswer;
    private QuestionCategory category;
    private String language;
    private QuestionType type;


}
