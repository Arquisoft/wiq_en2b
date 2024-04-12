package lab.en2b.quizapi.game;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lab.en2b.quizapi.commons.user.User;
import lab.en2b.quizapi.game.dtos.CustomGameDto;
import lab.en2b.quizapi.questions.answer.Answer;
import lab.en2b.quizapi.questions.question.Question;
import lab.en2b.quizapi.questions.question.QuestionCategory;
import lombok.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import static lab.en2b.quizapi.game.GameMode.*;

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
    @Enumerated(EnumType.STRING)
    private GameMode gamemode;
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
    private List<QuestionCategory> questionCategoriesForCustom;

    public Game(User user,GameMode gamemode,String lang, CustomGameDto gameDto){
        this.user = user;
        this.questions = new ArrayList<>();
        this.actualRound = 0L;
        this.language = lang;
        if(gamemode == CUSTOM)
            setCustomGameMode(gameDto);
        else
            setGamemode(gamemode);
    }

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
        if(language == null){
            language = "en";
        }
        if(!isLanguageSupported(language))
            throw new IllegalArgumentException("The language you provided is not supported");
        this.language = language;
    }
    public void setCustomGameMode(CustomGameDto gameDto){
        setRounds(gameDto.getRounds());
        setRoundDuration(gameDto.getRoundDuration());
        setQuestionCategoriesForCustom(gameDto.getCategories());
        this.gamemode = CUSTOM;
    }
    public void setGamemode(GameMode gamemode){
        if(gamemode == null){
            gamemode = KIWI_QUEST;
        }
        setGamemodeParams(gamemode);
    }

    private void setGamemodeParams(GameMode gamemode){ //This could be moved to a GameMode entity if we have time
        switch(gamemode){
            case KIWI_QUEST:
                setRounds(9L);
                setRoundDuration(30);
                break;
            case FOOTBALL_SHOWDOWN:
                setRounds(9L);
                setRoundDuration(30);
                break;
            case GEO_GENIUS:
                setRounds(9L);
                setRoundDuration(30);
                break;
            case VIDEOGAME_ADVENTURE:
                setRounds(9L);
                setRoundDuration(30);
                break;
            case ANCIENT_ODYSSEY:
                setRounds(9L);
                setRoundDuration(30);
                break;
            case RANDOM:
                setRounds(9L);
                setRoundDuration(30);
                break;
            default:
                throw new IllegalStateException("Invalid gamemode!");
        }
        this.gamemode = gamemode;
    }

    public void setQuestionCategoriesForCustom(List<QuestionCategory> questionCategoriesForCustom) {
        if(gamemode != CUSTOM)
            throw new IllegalStateException("You can't set custom categories for a non-custom gamemode!");
        if(questionCategoriesForCustom == null || questionCategoriesForCustom.isEmpty())
            throw new IllegalArgumentException("You can't set an empty list of categories for a custom gamemode!");
        this.questionCategoriesForCustom = questionCategoriesForCustom;
    }

    public List<QuestionCategory> getQuestionCategoriesForGamemode(){
        return switch (gamemode) {
            case KIWI_QUEST -> List.of(QuestionCategory.ART, QuestionCategory.MUSIC, QuestionCategory.GEOGRAPHY);
            case FOOTBALL_SHOWDOWN -> List.of(QuestionCategory.SPORTS);
            case GEO_GENIUS -> List.of(QuestionCategory.GEOGRAPHY);
            case VIDEOGAME_ADVENTURE -> List.of(QuestionCategory.VIDEOGAMES);
            case ANCIENT_ODYSSEY -> List.of(QuestionCategory.MUSIC,QuestionCategory.ART);
            case RANDOM -> List.of(QuestionCategory.values());
            case CUSTOM -> questionCategoriesForCustom;
        };
    }
    private boolean isLanguageSupported(String language) {
        return language.equals("en") || language.equals("es");
    }

    public boolean shouldBeGameOver() {
        return getActualRound() >= getRounds() && !isGameOver;
    }
}
