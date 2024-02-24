package lab.en2b.quizapi.questions.answer;

import jakarta.persistence.*;
import lab.en2b.quizapi.questions.question.Question;
import lombok.AccessLevel;
import lombok.Setter;

import java.util.List;

@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;
    private String text;
    private AnswerCategory category;
    @OneToMany(mappedBy = "answer")
    private List<Question> questions;

}
