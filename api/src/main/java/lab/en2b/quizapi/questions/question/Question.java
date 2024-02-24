package lab.en2b.quizapi.questions.question;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
    private Answer correctAnswer;
    @ManyToOne
    private QuestionCategory category;
    private String language;
    @ManyToOne
    private QuestionType type;


}
