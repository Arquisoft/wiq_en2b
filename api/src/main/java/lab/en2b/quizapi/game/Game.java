package lab.en2b.quizapi.game;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lab.en2b.quizapi.commons.user.User;
import lab.en2b.quizapi.questions.answer.Answer;
import lab.en2b.quizapi.questions.question.Question;
import lombok.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
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

    private Long rounds = 9L;
    private Long actualRound = 0L;

    private Long correctlyAnsweredQuestions = 0L;
    private String language;
    private Long roundStartTime = 0L;
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

    @OrderColumn
    private List<Question> questions;
    private boolean isGameOver;

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
        setRoundStartTime(Instant.now().toEpochMilli());
    }

    private void increaseRound(){
        setActualRound(getActualRound() + 1);
    }

    public boolean isGameOver(){
        return isGameOver && getActualRound() >= getRounds();
    }


    public Question getCurrentQuestion() {
        if(getRoundStartTime() == null){
            throw new IllegalStateException("The round is not active!");
        }
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
        return getRoundStartTime()!= null && Instant.now().isAfter(Instant.ofEpochMilli(getRoundStartTime()).plusSeconds(getRoundDuration()));
    }

    public boolean answerQuestion(Long answerId){
        if(currentRoundIsOver())
            throw new IllegalStateException("You can't answer a question when the current round is over!");
        if (isGameOver())
            throw new IllegalStateException("You can't answer a question when the game is over!");
        Question q = getCurrentQuestion();
        if (q.getAnswers().stream().map(Answer::getId).noneMatch(i -> i.equals(answerId)))
            throw new IllegalArgumentException("The answer you provided is not one of the options");
        if(q.isCorrectAnswer(answerId)){
            setCorrectlyAnsweredQuestions(getCorrectlyAnsweredQuestions() + 1);
        }
        setCurrentQuestionAnswered(true);
        return q.isCorrectAnswer(answerId);
    }
    public void setLanguage(String language){
        if(!isLanguageSupported(language))
            throw new IllegalArgumentException("The language you provided is not supported");
        this.language = language;
    }

    private boolean isLanguageSupported(String language) {
        return language.equals("en") || language.equals("es");
    }

    public boolean shouldBeGameOver() {
        return getActualRound() >= getRounds() && !isGameOver;
    }
}
