package lab.en2b.quizapi.questions.question;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lab.en2b.quizapi.game.Game;
import lab.en2b.quizapi.questions.answer.Answer;
import lab.en2b.quizapi.questions.answer.AnswerCategory;
import lombok.*;

import java.util.List;

@SuppressWarnings("java:S1068")
@Entity
@Table(name = "questions")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
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
    @NotNull
    @JoinColumn(name = "correct_answer_id")
    private Answer correctAnswer;
    @Enumerated(EnumType.STRING)
    @Column(name = "question_category")
    private QuestionCategory questionCategory;
    @Enumerated(EnumType.STRING)
    private QuestionType type;

    @ManyToMany(mappedBy = "questions")
    private List<Game> games;

    public boolean isCorrectAnswer(Long answerId){
        return correctAnswer.getId().equals(answerId);
    }
    public AnswerCategory getAnswerCategory() {
        return correctAnswer.getCategory();
    }
    public String getLanguage(){
        return correctAnswer.getLanguage();
    }
}
