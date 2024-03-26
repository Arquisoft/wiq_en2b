package lab.en2b.quizapi.game;

import ch.qos.logback.core.util.TimeUtil;
import lab.en2b.quizapi.auth.config.UserDetailsImpl;
import lab.en2b.quizapi.commons.user.User;
import lab.en2b.quizapi.commons.user.UserResponseDto;
import lab.en2b.quizapi.commons.user.UserService;
import lab.en2b.quizapi.commons.user.mappers.UserResponseDtoMapper;
import lab.en2b.quizapi.game.dtos.GameResponseDto;
import lab.en2b.quizapi.game.mappers.GameResponseDtoMapper;
import lab.en2b.quizapi.questions.answer.AnswerCategory;
import lab.en2b.quizapi.questions.question.Question;
import lab.en2b.quizapi.questions.question.QuestionCategory;
import lab.en2b.quizapi.questions.question.QuestionRepository;
import lab.en2b.quizapi.questions.question.QuestionType;
import lab.en2b.quizapi.questions.question.dtos.QuestionResponseDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith({MockitoExtension.class, SpringExtension.class})
public class GameServiceTest {

    @InjectMocks
    private GameService gameService;

    @Mock
    private UserService userService;

    @Mock
    private GameRepository gameRepository;

    @Mock
    private QuestionRepository questionRepository;

    private User defaultUser;
    private Question defaultQuestion;
    private QuestionResponseDto defaultQuestionResponseDto;
    private GameResponseDto defaultGameResponseDto;

    private UserResponseDto defaultUserResponseDto;

    private Game defaultGame;
    @BeforeEach
    void setUp() {
        this.gameService = new GameService(gameRepository,new GameResponseDtoMapper(new UserResponseDtoMapper()), userService, questionRepository);
        this.defaultUser = User.builder()
                .id(1L)
                .email("test@email.com")
                .username("test")
                .role("user")
                .password("password")
                .refreshToken("token")
                .refreshExpiration(Instant.ofEpochSecond(TimeUtil.computeStartOfNextSecond(System.currentTimeMillis()+ 1000)))
                .build();
        this.defaultUserResponseDto = UserResponseDto.builder()
                .id(1L)
                .email("test@email.com")
                .username("test")
                .build();
        this.defaultQuestion = Question.builder()
                .id(1L)
                .content("What is the capital of France?")
                .answers(new ArrayList<>())
                .language("en")
                .questionCategory(QuestionCategory.GEOGRAPHY)
                .answerCategory(AnswerCategory.CITY)
                .type(QuestionType.TEXT)
                .build();
        this.defaultQuestionResponseDto = QuestionResponseDto.builder()
                .id(1L)
                .content("What is the capital of France?")
                .answers(new ArrayList<>())
                .language("en")
                .questionCategory(QuestionCategory.GEOGRAPHY)
                .answerCategory(AnswerCategory.CITY)
                .type(QuestionType.TEXT)
                .build();
        this.defaultGameResponseDto = GameResponseDto.builder()
                .user(defaultUserResponseDto)
                .rounds(9)
                .correctlyAnsweredQuestions(0)
                .build();

        this.defaultGame = Game.builder()
                .id(1L)
                .user(defaultUser)
                .questions(new ArrayList<>())
                .rounds(9)
                .correctlyAnsweredQuestions(0)
                .build();
    }

    @Test
    public void newGame(){
        Authentication authentication = mock(Authentication.class);
        when(userService.getUserByAuthentication(authentication)).thenReturn(defaultUser);
        when(gameRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(questionRepository.findRandomQuestion("en")).thenReturn(defaultQuestion);
        GameResponseDto gameDto = gameService.newGame(authentication);

        assertEquals(defaultGameResponseDto, gameDto);
    }

    @Test
    public void newGameShouldAssignNewQuestion(){
        //assertTrue(false);
    }

    @Test
    public void startRound(){
        when(gameRepository.findById(any())).thenReturn(Optional.of(defaultGame));
        when(gameRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(questionRepository.findRandomQuestion("en")).thenReturn(defaultQuestion);
        GameResponseDto gameDto = gameService.startRound(1L);
        GameResponseDto result = defaultGameResponseDto;
        result.setActualRound(1);
        result.setId(1L);
        assertEquals(result, gameDto);
    }

}
