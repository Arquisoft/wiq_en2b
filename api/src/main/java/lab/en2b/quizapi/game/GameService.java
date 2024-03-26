package lab.en2b.quizapi.game;

import lab.en2b.quizapi.commons.user.UserService;
import lab.en2b.quizapi.game.dtos.GameResponseDto;
import lab.en2b.quizapi.game.mappers.GameResponseDtoMapper;
import lab.en2b.quizapi.questions.question.Question;
import lab.en2b.quizapi.questions.question.QuestionRepository;
import lab.en2b.quizapi.questions.question.QuestionService;
import lab.en2b.quizapi.questions.question.dtos.QuestionResponseDto;
import lab.en2b.quizapi.questions.question.mappers.QuestionResponseDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;
    private final GameResponseDtoMapper gameResponseDtoMapper;
    private final UserService userService;
    private final QuestionRepository questionRepository;
    private final QuestionResponseDtoMapper questionResponseDtoMapper;
    public GameResponseDto newGame(Authentication authentication) {
        Question question = questionRepository.findRandomQuestion("en");
        return gameResponseDtoMapper.apply(gameRepository.save(Game.builder()
                .user(userService.getUserByAuthentication(authentication))
                .questions(List.of(question))
                .rounds(9)
                .correctlyAnsweredQuestions(0)
                .build()));
    }

    public GameResponseDto startRound(Long id) {
        Game game = gameRepository.findById(id).orElseThrow();
        Question question = questionRepository.findRandomQuestion("en");
        game.getQuestions().add(question);
        game.setActualRound(game.getActualRound() + 1);
        //Need to start the timer
        return gameResponseDtoMapper.apply(gameRepository.save(game));
    }

    public QuestionResponseDto getCurrentQuestion(Long id){
        Game game = gameRepository.findById(id).orElseThrow();
        return questionResponseDtoMapper.apply(game.getQuestions().get(game.getQuestions().size()-1));
    }
}
