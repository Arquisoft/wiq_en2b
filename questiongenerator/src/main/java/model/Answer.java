package model;

import repositories.Storable;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "answers")
public class Answer implements Storable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String text;
    private AnswerCategory category;
    @OneToMany(mappedBy = "correctAnswer", fetch = FetchType.EAGER)
    private List<Question> questions;

    @ManyToMany(mappedBy = "answers", fetch = FetchType.EAGER)
    private List<Question> questionsWithThisAnswer;

    public Answer(String text, AnswerCategory category) {
        this.text = text;
        this.category = category;
    }

    public Answer() {
    }

    public AnswerCategory getCategory() {
        return category;
    }
}
