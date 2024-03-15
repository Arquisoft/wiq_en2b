package lab.en2b.quizapi.game;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lab.en2b.quizapi.commons.user.User;
import lab.en2b.quizapi.questions.question.Question;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "games")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name="games_questions",
            joinColumns=
            @JoinColumn(name="game_id", referencedColumnName="id"),
            inverseJoinColumns=
            @JoinColumn(name="question_id", referencedColumnName="id")
    )
    private List<Question> questions;
}
