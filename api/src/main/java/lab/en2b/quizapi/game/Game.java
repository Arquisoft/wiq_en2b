package lab.en2b.quizapi.game;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lab.en2b.quizapi.commons.user.User;
import lab.en2b.quizapi.questions.answer.Answer;
import lab.en2b.quizapi.questions.question.Question;
import lab.en2b.quizapi.questions.question.QuestionRepository;
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
        setRoundStartTime(LocalDateTime.now());
    }

    private void increaseRound(){
        setActualRound(getActualRound() + 1);
    }

    public boolean isGameOver(){
        return getActualRound() > getRounds();
    }

    public Question getCurrentQuestion() {
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

    public void answerQuestion(Long answerId, QuestionRepository questionRepository){
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
    }
    public void setLanguage(String language){
        if(!isLanguageSupported(language))
            throw new IllegalArgumentException("The language you provided is not supported");
        this.language = language;
    }

    private boolean isLanguageSupported(String language) {
        return language.equals("en") || language.equals("es");
    }
}
