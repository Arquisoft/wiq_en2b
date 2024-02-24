package lab.en2b.quizapi.questions.question;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lab.en2b.quizapi.questions.answer.Answer;
import lab.en2b.quizapi.questions.answer.AnswerCategory;
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
    @NotNull
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name="questions_answers",
            joinColumns=
            @JoinColumn(name="question_id", referencedColumnName="id"),
            inverseJoinColumns=
            @JoinColumn(name="answer_id", referencedColumnName="id")
    )
    private List<Answer> answers;
    @ManyToOne
    @JoinColumn(name = "answer_id")
    private Answer correctAnswer;
    private QuestionCategory questionCategory;
    private AnswerCategory answerCategory;
    private String language;
    private QuestionType type;


}
