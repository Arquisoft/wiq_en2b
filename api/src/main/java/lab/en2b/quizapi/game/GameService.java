package lab.en2b.quizapi.game;

import lab.en2b.quizapi.commons.user.User;
import lab.en2b.quizapi.commons.user.UserService;
import lab.en2b.quizapi.game.dtos.GameAnswerDto;
import lab.en2b.quizapi.game.dtos.GameResponseDto;
import lab.en2b.quizapi.game.mappers.GameResponseDtoMapper;
import lab.en2b.quizapi.questions.answer.AnswerRepository;
import lab.en2b.quizapi.questions.answer.dtos.AnswerDto;
import lab.en2b.quizapi.questions.question.QuestionRepository;
import lab.en2b.quizapi.questions.question.QuestionService;
import lab.en2b.quizapi.questions.question.dtos.QuestionResponseDto;
import lab.en2b.quizapi.questions.question.mappers.QuestionResponseDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;
    private final GameResponseDtoMapper gameResponseDtoMapper;
    private final UserService userService;
    private final QuestionRepository questionRepository;
    private final QuestionResponseDtoMapper questionResponseDtoMapper;
    public GameResponseDto newGame(Authentication authentication) {
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
        game.newRound(questionRepository.findRandomQuestion(game.getLanguage()));
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
}