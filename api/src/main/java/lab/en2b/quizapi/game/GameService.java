package lab.en2b.quizapi.game;

import lab.en2b.quizapi.commons.user.UserService;
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
    public GameResponseDto newGame(Authentication authentication) {
        if (gameRepository.findActiveGameForUser(userService.getUserByAuthentication(authentication).getId()).isPresent()){
            return gameResponseDtoMapper.apply(gameRepository.findActiveGameForUser(userService.getUserByAuthentication(authentication).getId()).get());
        }
        return gameResponseDtoMapper.apply(gameRepository.save(Game.builder()
                .user(userService.getUserByAuthentication(authentication))
                .questions(new ArrayList<>())
                .rounds(9L)
                .actualRound(0L)
                .correctlyAnsweredQuestions(0L)
                .roundDuration(30)
                .language("en")
                .build()));
    }

    @Transactional
    public GameResponseDto startRound(Long id, Authentication authentication) {
        Game game = gameRepository.findByIdForUser(id, userService.getUserByAuthentication(authentication).getId()).orElseThrow();
        game.newRound(questionService.findRandomQuestion(game.getLanguage()));

        return gameResponseDtoMapper.apply(gameRepository.save(game));
    }

    public QuestionResponseDto getCurrentQuestion(Long id, Authentication authentication){
        Game game = gameRepository.findByIdForUser(id, userService.getUserByAuthentication(authentication).getId()).orElseThrow();
        return questionResponseDtoMapper.apply(game.getCurrentQuestion());
    }

    @Transactional
    public GameResponseDto answerQuestion(Long id, GameAnswerDto dto, Authentication authentication){
        Game game = gameRepository.findByIdForUser(id, userService.getUserByAuthentication(authentication).getId()).orElseThrow();
        game.answerQuestion(dto.getAnswerId(), questionRepository);

        if (game.isLastRound() && !game.isGameOver()){
            game.setGameOver(true);
            gameRepository.save(game);
            saveStatistics(game);
        }

        return gameResponseDtoMapper.apply(game);
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
        if (game.isLastRound() && !game.isGameOver()){
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
