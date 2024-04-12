package lab.en2b.quizapi.game;

import lab.en2b.quizapi.commons.user.UserService;
import lab.en2b.quizapi.game.dtos.AnswerGameResponseDto;
import lab.en2b.quizapi.game.dtos.GameAnswerDto;
import lab.en2b.quizapi.game.dtos.GameResponseDto;
import lab.en2b.quizapi.game.mappers.GameResponseDtoMapper;
import lab.en2b.quizapi.questions.question.QuestionCategory;
import lab.en2b.quizapi.questions.question.QuestionRepository;
import lab.en2b.quizapi.questions.question.QuestionService;
import lab.en2b.quizapi.questions.question.dtos.QuestionResponseDto;
import lab.en2b.quizapi.questions.question.mappers.QuestionResponseDtoMapper;
import lab.en2b.quizapi.statistics.Statistics;
import lab.en2b.quizapi.statistics.StatisticsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;
    private final GameResponseDtoMapper gameResponseDtoMapper;
    private final UserService userService;
    private final QuestionService questionService;
    private final QuestionRepository questionRepository;
    private final QuestionResponseDtoMapper questionResponseDtoMapper;
    private final StatisticsRepository statisticsRepository;

    @Transactional
    public GameResponseDto newGame(String lang, GameMode gamemode, Authentication authentication) {
        Optional<Game> game = gameRepository.findActiveGameForUser(userService.getUserByAuthentication(authentication).getId());
        if (game.isPresent()){
            if (game.get().shouldBeGameOver()){
                game.get().setGameOver(true);
                gameRepository.save(game.get());
                saveStatistics(game.get());
            }else{
                return gameResponseDtoMapper.apply(game.get());
            }
        }
        return gameResponseDtoMapper.apply(gameRepository.save(new Game(userService.getUserByAuthentication(authentication),gamemode,lang)));
    }

    public GameResponseDto startRound(Long id, Authentication authentication) {
        Game game = gameRepository.findByIdForUser(id, userService.getUserByAuthentication(authentication).getId()).orElseThrow();
        if (game.shouldBeGameOver()){
            game.setGameOver(true);
            gameRepository.save(game);
            saveStatistics(game);
        }
        game.newRound(questionService.findRandomQuestion(game.getLanguage()));

        return gameResponseDtoMapper.apply(gameRepository.save(game));
    }

    public QuestionResponseDto getCurrentQuestion(Long id, Authentication authentication){
        Game game = gameRepository.findByIdForUser(id, userService.getUserByAuthentication(authentication).getId()).orElseThrow();
        return questionResponseDtoMapper.apply(game.getCurrentQuestion());
    }

    @Transactional
    public AnswerGameResponseDto answerQuestion(Long id, GameAnswerDto dto, Authentication authentication){
        Game game = gameRepository.findByIdForUser(id, userService.getUserByAuthentication(authentication).getId()).orElseThrow();
        boolean wasCorrect = game.answerQuestion(dto.getAnswerId());

        if (game.shouldBeGameOver()){
            game.setGameOver(true);
            gameRepository.save(game);
            saveStatistics(game);
        }

        return new AnswerGameResponseDto(wasCorrect);
    }
    private void saveStatistics(Game game){
        if (statisticsRepository.findByUserId(game.getUser().getId()).isPresent()){
            Statistics statistics = statisticsRepository.findByUserId(game.getUser().getId()).get();
            statistics.updateStatistics(game.getCorrectlyAnsweredQuestions(),
                    game.getQuestions().size()-game.getCorrectlyAnsweredQuestions(),
                    game.getRounds());
            statisticsRepository.save(statistics);
        } else {
            Statistics statistics = Statistics.builder()
                    .user(game.getUser())
                    .correct(game.getCorrectlyAnsweredQuestions())
                    .wrong(game.getQuestions().size()-game.getCorrectlyAnsweredQuestions())
                    .total(game.getRounds())
                    .build();
            statisticsRepository.save(statistics);
        }
    }
    public GameResponseDto changeLanguage(Long id, String language, Authentication authentication) {
        Game game = gameRepository.findByIdForUser(id, userService.getUserByAuthentication(authentication).getId()).orElseThrow();
        if(game.isGameOver()){
            throw new IllegalStateException("Cannot change language after the game is over!");
        }
        game.setLanguage(language);
        return gameResponseDtoMapper.apply(gameRepository.save(game));
    }

    public GameResponseDto getGameDetails(Long id, Authentication authentication) {
        Game game = gameRepository.findByIdForUser(id, userService.getUserByAuthentication(authentication).getId()).orElseThrow();
        if (game.shouldBeGameOver()){
            game.setGameOver(true);
            gameRepository.save(game);
            saveStatistics(game);
        }
        return gameResponseDtoMapper.apply(game);
    }

    public List<QuestionCategory> getQuestionCategories() {
        return Arrays.asList(QuestionCategory.values());
    }
}
