package lab.en2b.quizapi.questions.answer;

import jakarta.persistence.*;
import lab.en2b.quizapi.questions.question.Question;
import lombok.*;

import java.util.List;

@SuppressWarnings("java:S1068")
@Entity
@Table(name = "answers")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;
    private String text;
    @Enumerated(EnumType.STRING)
    private AnswerCategory category;
    private String language;

    @OneToMany(mappedBy = "correctAnswer", fetch = FetchType.EAGER)
    private List<Question> questions;

    @ManyToMany(mappedBy = "answers", fetch = FetchType.EAGER)
    private List<Question> questionsWithThisAnswer;

}
