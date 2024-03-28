package lab.en2b.quizapi.game;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lab.en2b.quizapi.commons.user.User;
import lab.en2b.quizapi.questions.question.Question;
import lombok.*;

import java.time.LocalDateTime;
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

    private int rounds = 9;
    private int actualRound = 0;

    private int correctlyAnsweredQuestions = 0;
    private String language;
    private LocalDateTime roundStartTime;
    @NonNull
    private Integer roundDuration;
    private boolean currentQuestionAnswered;

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

    public void newRound(Question question){
        if(getActualRound() != 0){
            if (isGameOver())
                throw new IllegalStateException("You can't start a round for a finished game!");
            if(!currentRoundIsOver())
                throw new IllegalStateException("You can't start a new round when the current round is not over yet!");
        }

        setCurrentQuestionAnswered(false);
        getQuestions().add(question);
        increaseRound();
        setRoundStartTime(LocalDateTime.now());
    }

    private void increaseRound(){
        setActualRound(getActualRound() + 1);
    }

    public boolean isGameOver(){
        return getActualRound() > getRounds();
    }

    public Question getCurrentQuestion() {
        if(getQuestions().isEmpty())
            throw new IllegalStateException("The game hasn't started yet!");
        if(currentRoundIsOver())
            throw new IllegalStateException("The current round is over!");
        if(isGameOver())
            throw new IllegalStateException("The game is over!");
        return getQuestions().get(getQuestions().size()-1);
    }

    private boolean currentRoundIsOver(){
        return currentQuestionAnswered || roundTimeHasExpired();
    }

    private boolean roundTimeHasExpired(){
        return LocalDateTime.now().isAfter(getRoundStartTime().plusSeconds(getRoundDuration()));
    }

    public void answerQuestion(){
        if(currentRoundIsOver())
            throw new IllegalStateException("You can't answer a question when the current round is over!");
        setCurrentQuestionAnswered(true);
    }
}
