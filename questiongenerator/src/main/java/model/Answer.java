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
    @Enumerated(EnumType.STRING)
    private AnswerCategory category;
    private String language;
    @OneToMany(mappedBy = "correctAnswer", fetch = FetchType.EAGER)
    private List<Question> questions;

    @ManyToMany(mappedBy = "answers", fetch = FetchType.EAGER)
    private List<Question> questionsWithThisAnswer;

    public Answer(String text, AnswerCategory category, String language) {
        this.text = text;
        this.category = category;
        this.language = language;
    }

    public Answer() {
    }

    public AnswerCategory getCategory() {
        return category;
    }
}
