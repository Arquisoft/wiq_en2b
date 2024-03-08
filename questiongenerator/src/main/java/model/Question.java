package model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name="questions_answers",
            joinColumns=
            @JoinColumn(name="question_id", referencedColumnName="id"),
            inverseJoinColumns=
            @JoinColumn(name="answer_id", referencedColumnName="id")
    )
    private List<Answer> answers;
    @ManyToOne
    @JoinColumn(name = "correct_answer_id")
    private Answer correctAnswer;
    private QuestionCategory questionCategory;
    private AnswerCategory answerCategory;
    private String language;
    private QuestionType type;

    public Question() {
    }

    public Question(String content, Answer correctAnswer, QuestionCategory questionCategory, AnswerCategory answerCategory, String language, QuestionType type) {
        this.content = content;
        this.correctAnswer = correctAnswer;
        this.questionCategory = questionCategory;
        this.answerCategory = answerCategory;
        this.language = language;
        this.type = type;
    }
}
