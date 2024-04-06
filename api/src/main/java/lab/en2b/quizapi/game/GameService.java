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
    public GameResponseDto newGame(Authentication authentication) {
        if (gameRepository.findActiveGameForUser(userService.getUserByAuthentication(authentication).getId()).isPresent()){
            return gameResponseDtoMapper.apply(gameRepository.findActiveGameForUser(userService.getUserByAuthentication(authentication).getId()).get());
        }
        return gameResponseDtoMapper.apply(gameRepository.save(Game.builder()
                .user(userService.getUserByAuthentication(authentication))
                .questions(new ArrayList<>())
                .rounds(9)
                .correctlyAnsweredQuestions(0)
                .roundDuration(30)
                .language("en")
                .build()));
    }

    public GameResponseDto startRound(Long id, Authentication authentication) {
        Game game = gameRepository.findByIdForUser(id, userService.getUserByAuthentication(authentication).getId()).orElseThrow();
        game.newRound(questionService.findRandomQuestion(game.getLanguage()));
        if (game.isGameOver()){
            Statistics statistics = Statistics.builder()
                    .user(game.getUser())
                    .correct(Long.valueOf(game.getCorrectlyAnsweredQuestions()))
                    .wrong(Long.valueOf(game.getRounds() - game.getCorrectlyAnsweredQuestions()))
                    .total(Long.valueOf(game.getRounds()))
                    .build();
            Statistics oldStatistics = statisticsRepository.findByUserId(game.getUser().getId()).orElseThrow();
            statisticsRepository.delete(oldStatistics);
            oldStatistics.updateStatistics(statistics);
            statisticsRepository.save(oldStatistics);
        }
        return gameResponseDtoMapper.apply(gameRepository.save(game));
    }

    public QuestionResponseDto getCurrentQuestion(Long id, Authentication authentication){
        Game game = gameRepository.findByIdForUser(id, userService.getUserByAuthentication(authentication).getId()).orElseThrow();
        return questionResponseDtoMapper.apply(game.getCurrentQuestion());
    }

    public GameResponseDto answerQuestion(Long id, GameAnswerDto dto, Authentication authentication){
        Game game = gameRepository.findByIdForUser(id, userService.getUserByAuthentication(authentication).getId()).orElseThrow();
        game.answerQuestion(dto.getAnswerId(), questionRepository);
        return gameResponseDtoMapper.apply(game);
    }

    public GameResponseDto changeLanguage(Long id, String language, Authentication authentication) {
        Game game = gameRepository.findByIdForUser(id, userService.getUserByAuthentication(authentication).getId()).orElseThrow();
        game.setLanguage(language);
        return gameResponseDtoMapper.apply(gameRepository.save(game));
    }

    public GameResponseDto getGameDetails(Long id, Authentication authentication) {
        return gameResponseDtoMapper.apply(gameRepository.findByIdForUser(id, userService.getUserByAuthentication(authentication).getId()).orElseThrow());
    }

    public List<QuestionCategory> getQuestionCategories() {
        return Arrays.asList(QuestionCategory.values());
    }
}
