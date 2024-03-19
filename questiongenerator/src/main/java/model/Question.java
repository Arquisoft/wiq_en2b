package model;

import repositories.Storable;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "questions")
public class Question implements Storable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
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
    @Column(name = "question_category")
    private QuestionCategory questionCategory;
    private QuestionType type;

    public Question() {
    }

    public Question(Answer correctAnswer, QuestionCategory questionCategory, QuestionType type) {
        this.correctAnswer = correctAnswer;
        this.questionCategory = questionCategory;
        this.type = type;
        this.answers = new ArrayList<>();
        this.answers.add(correctAnswer);
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public AnswerCategory getAnswerCategory() {
        return correctAnswer.getCategory();
    }
}
