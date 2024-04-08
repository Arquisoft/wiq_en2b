package lab.en2b.quizapi.game;

import ch.qos.logback.core.util.TimeUtil;
import lab.en2b.quizapi.commons.user.User;
import lab.en2b.quizapi.commons.user.UserResponseDto;
import lab.en2b.quizapi.commons.user.UserService;
import lab.en2b.quizapi.commons.user.mappers.UserResponseDtoMapper;
import lab.en2b.quizapi.game.dtos.GameAnswerDto;
import lab.en2b.quizapi.game.dtos.GameResponseDto;
import lab.en2b.quizapi.game.mappers.GameResponseDtoMapper;
import lab.en2b.quizapi.questions.answer.Answer;
import lab.en2b.quizapi.questions.answer.AnswerCategory;
import lab.en2b.quizapi.questions.answer.mappers.AnswerResponseDtoMapper;
import lab.en2b.quizapi.questions.question.*;
import lab.en2b.quizapi.questions.question.dtos.QuestionResponseDto;
import lab.en2b.quizapi.questions.question.mappers.QuestionResponseDtoMapper;
import lab.en2b.quizapi.statistics.StatisticsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
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

    @Mock
    private StatisticsRepository statisticsRepository;

    @Mock
    private QuestionService questionService;

    private User defaultUser;
    private Question defaultQuestion;
    private QuestionResponseDto defaultQuestionResponseDto;
    private GameResponseDto defaultGameResponseDto;

    private UserResponseDto defaultUserResponseDto;

    private QuestionResponseDtoMapper questionResponseDtoMapper;

    @Mock
    private Authentication authentication;

    private Game defaultGame;

    private Answer defaultCorrectAnswer;

    @BeforeEach
    void setUp() {
        this.questionResponseDtoMapper = new QuestionResponseDtoMapper();
        this.gameService = new GameService(gameRepository,new GameResponseDtoMapper(new UserResponseDtoMapper()), userService, questionService, questionRepository, questionResponseDtoMapper, statisticsRepository);
        this.defaultUser = User.builder()
                .id(1L)
                .email("test@email.com")
                .username("test")
                .role("user")
                .password("password")
                .refreshToken("token")
                .refreshExpiration(Instant.ofEpochSecond(TimeUtil.computeStartOfNextSecond(System.currentTimeMillis()+ 1000)))
                .build();

        this.defaultQuestion = Question.builder()
                .id(1L)
                .content("What is the capital of France?")
                .answers(new ArrayList<>())
                .questionCategory(QuestionCategory.GEOGRAPHY)
                .type(QuestionType.TEXT)
                .build();

        defaultCorrectAnswer = Answer.builder()
                .id(1L)
                .text("Paris")
                .category(AnswerCategory.CAPITAL_CITY)
                .questions(List.of(defaultQuestion))
                .questionsWithThisAnswer(List.of(defaultQuestion))
                .language("en")
                .build();

        Answer defaultIncorrectAnswer = Answer.builder()
                .id(2L)
                .text("Tokio")
                .category(AnswerCategory.CAPITAL_CITY)
                .questions(List.of(defaultQuestion))
                .questionsWithThisAnswer(List.of(defaultQuestion))
                .build();

        defaultQuestion.setCorrectAnswer(defaultCorrectAnswer);
        defaultQuestion.getAnswers().add(defaultCorrectAnswer);
        defaultQuestion.getAnswers().add(defaultIncorrectAnswer);

        this.defaultUserResponseDto = UserResponseDto.builder()
                .id(1L)
                .email("test@email.com")
                .username("test")
                .build();

        this.defaultQuestionResponseDto = QuestionResponseDto.builder()
                .id(1L)
                .content("What is the capital of France?")
                .answers(new ArrayList<>())
                .language("en")
                .questionCategory(QuestionCategory.GEOGRAPHY)
                .answerCategory(AnswerCategory.CAPITAL_CITY)
                .type(QuestionType.TEXT)
                .build();
        defaultQuestionResponseDto.getAnswers().add(new AnswerResponseDtoMapper().apply(defaultCorrectAnswer));
        defaultQuestionResponseDto.getAnswers().add(new AnswerResponseDtoMapper().apply(defaultIncorrectAnswer));
        LocalDateTime now = LocalDateTime.now();
        this.defaultGameResponseDto = GameResponseDto.builder()
                .user(defaultUserResponseDto)
                .rounds(9L)
                .correctlyAnsweredQuestions(0L)
                .actualRound(0L)
                .roundDuration(30)
                .build();
        this.defaultGame = Game.builder()
                .id(1L)
                .user(defaultUser)
                .questions(new ArrayList<>())
                .rounds(9L)
                .actualRound(0L)
                .correctlyAnsweredQuestions(0L)
                .language("en")
                .roundDuration(30)
                .build();
    }

    @Test
    public void newGame(){
        Authentication authentication = mock(Authentication.class);
        when(userService.getUserByAuthentication(authentication)).thenReturn(defaultUser);
        when(gameRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        GameResponseDto gameDto = gameService.newGame(authentication);

        assertEquals(defaultGameResponseDto, gameDto);
    }

    @Test
    public void startRound(){
        when(gameRepository.findByIdForUser(any(), any())).thenReturn(Optional.of(defaultGame));
        when(gameRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(questionService.findRandomQuestion(any())).thenReturn(defaultQuestion);
        when(userService.getUserByAuthentication(authentication)).thenReturn(defaultUser);
        GameResponseDto gameDto = gameService.startRound(1L, authentication);
        GameResponseDto result = defaultGameResponseDto;
        result.setActualRound(1L);
        result.setId(1L);
        result.setRoundStartTime(defaultGame.getRoundStartTime());
        assertEquals(result, gameDto);
    }

    @Test
    public void startRoundGameOver(){
        when(gameRepository.findByIdForUser(any(), any())).thenReturn(Optional.of(defaultGame));
        when(questionService.findRandomQuestion(any())).thenReturn(defaultQuestion);
        when(userService.getUserByAuthentication(authentication)).thenReturn(defaultUser);
        defaultGame.setActualRound(10L);
        assertThrows(IllegalStateException.class, () -> gameService.startRound(1L,authentication));
    }

    /**
    @Test
    public void startRoundWhenRoundNotFinished(){
        when(gameRepository.findByIdForUser(any(), any())).thenReturn(Optional.of(defaultGame));
        when(gameRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(questionService.findRandomQuestion(any())).thenReturn(defaultQuestion);
        when(userService.getUserByAuthentication(authentication)).thenReturn(defaultUser);
        gameService.startRound(1L,authentication);
        assertThrows(IllegalStateException.class, () -> gameService.startRound(1L,authentication));
    }
     **/

    @Test
    public void getCurrentQuestion() {
        when(gameRepository.findByIdForUser(any(), any())).thenReturn(Optional.of(defaultGame));
        when(gameRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(questionService.findRandomQuestion(any())).thenReturn(defaultQuestion);
        when(userService.getUserByAuthentication(authentication)).thenReturn(defaultUser);
        gameService.startRound(1L,authentication);
        QuestionResponseDto questionDto = gameService.getCurrentQuestion(1L,authentication);
        assertEquals(defaultQuestionResponseDto, questionDto);
    }

    /*@Test
    public void getCurrentQuestionRoundNotStarted() {
        when(gameRepository.findByIdForUser(any(), any())).thenReturn(Optional.of(defaultGame));
        when(userService.getUserByAuthentication(authentication)).thenReturn(defaultUser);
        assertThrows(IllegalStateException.class, () -> gameService.getCurrentQuestion(1L,authentication));
    }*/

    @Test
    public void getCurrentQuestionRoundFinished() {
        when(gameRepository.findByIdForUser(any(), any())).thenReturn(Optional.of(defaultGame));
        when(gameRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(questionService.findRandomQuestion(any())).thenReturn(defaultQuestion);
        when(userService.getUserByAuthentication(authentication)).thenReturn(defaultUser);
        gameService.startRound(1L,authentication);
        defaultGame.setRoundStartTime(LocalDateTime.now().minusSeconds(100));
        assertThrows(IllegalStateException.class, () -> gameService.getCurrentQuestion(1L,authentication));
    }

    @Test
    public void getCurrentQuestionGameFinished() {
        when(gameRepository.findByIdForUser(any(), any())).thenReturn(Optional.of(defaultGame));
        when(userService.getUserByAuthentication(authentication)).thenReturn(defaultUser);
        when(gameRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(questionService.findRandomQuestion(any())).thenReturn(defaultQuestion);
        gameService.startRound(1L,authentication);
        defaultGame.setGameOver(true);
        defaultGame.setActualRound(10L);
        assertThrows(IllegalStateException.class, () -> gameService.getCurrentQuestion(1L,authentication));
    }

    @Test
    public void answerQuestionCorrectly(){
        when(gameRepository.findByIdForUser(any(), any())).thenReturn(Optional.of(defaultGame));
        when(gameRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(userService.getUserByAuthentication(authentication)).thenReturn(defaultUser);
        when(questionService.findRandomQuestion(any())).thenReturn(defaultQuestion);
        gameService.newGame(authentication);
        gameService.startRound(1L, authentication);
        gameService.answerQuestion(1L, new GameAnswerDto(1L), authentication);
        gameService.getGameDetails(1L, authentication);
        assertEquals(defaultGame.getCorrectlyAnsweredQuestions(), 1);
        assertTrue(defaultGame.isCurrentQuestionAnswered());
    }

    @Test
    public void answerQuestionIncorrectly(){
        when(gameRepository.findByIdForUser(any(), any())).thenReturn(Optional.of(defaultGame));
        when(gameRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(userService.getUserByAuthentication(authentication)).thenReturn(defaultUser);
        when(questionService.findRandomQuestion(any())).thenReturn(defaultQuestion);
        gameService.newGame(authentication);
        gameService.startRound(1L, authentication);
        gameService.answerQuestion(1L, new GameAnswerDto(2L), authentication);
        gameService.getGameDetails(1L, authentication);
        assertEquals(defaultGame.getCorrectlyAnsweredQuestions(), 0);
        assertTrue(defaultGame.isCurrentQuestionAnswered());
    }

    @Test
    public void answerQuestionWhenGameHasFinished(){
        when(gameRepository.findByIdForUser(any(), any())).thenReturn(Optional.of(defaultGame));
        when(gameRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(userService.getUserByAuthentication(authentication)).thenReturn(defaultUser);
        when(questionService.findRandomQuestion(any())).thenReturn(defaultQuestion);
        gameService.newGame(authentication);
        gameService.startRound(1L, authentication);
        defaultGame.setGameOver(true);
        defaultGame.setActualRound(30L);
        assertThrows(IllegalStateException.class, () -> gameService.answerQuestion(1L, new GameAnswerDto(1L), authentication));
    }

    @Test
    public void answerQuestionWhenRoundHasFinished(){
        when(gameRepository.findByIdForUser(any(), any())).thenReturn(Optional.of(defaultGame));
        when(gameRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(userService.getUserByAuthentication(authentication)).thenReturn(defaultUser);
        when(questionService.findRandomQuestion(any())).thenReturn(defaultQuestion);
        gameService.newGame(authentication);
        gameService.startRound(1L, authentication);
        defaultGame.setRoundStartTime(LocalDateTime.now().minusSeconds(100));
        assertThrows(IllegalStateException.class, () -> gameService.answerQuestion(1L, new GameAnswerDto(1L), authentication));
    }

    @Test
    public void answerQuestionInvalidId(){
        when(gameRepository.findByIdForUser(any(), any())).thenReturn(Optional.of(defaultGame));
        when(gameRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(userService.getUserByAuthentication(authentication)).thenReturn(defaultUser);
        when(questionService.findRandomQuestion(any())).thenReturn(defaultQuestion);
        gameService.newGame(authentication);
        gameService.startRound(1L, authentication);
        assertThrows(IllegalArgumentException.class, () -> gameService.answerQuestion(1L, new GameAnswerDto(3L), authentication));
    }

    @Test
    public void changeLanguage(){
        when(gameRepository.findByIdForUser(any(), any())).thenReturn(Optional.of(defaultGame));
        when(gameRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(userService.getUserByAuthentication(authentication)).thenReturn(defaultUser);
        gameService.newGame(authentication);
        gameService.startRound(1L, authentication);
        gameService.changeLanguage(1L, "es", authentication);
        gameService.getGameDetails(1L, authentication);
        assertEquals("es",defaultGame.getLanguage());
    }

    @Test
    public void changeLanguageGameOver(){
        when(gameRepository.findByIdForUser(any(), any())).thenReturn(Optional.of(defaultGame));
        when(gameRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(userService.getUserByAuthentication(authentication)).thenReturn(defaultUser);

        gameService.newGame(authentication);
        gameService.startRound(1L, authentication);
        defaultGame.setGameOver(true);
        defaultGame.setActualRound(10L);
        assertThrows(IllegalStateException.class,() -> gameService.changeLanguage(1L, "es", authentication));

    }

    @Test
    public void changeLanguageInvalidLanguage(){
        when(gameRepository.findByIdForUser(any(), any())).thenReturn(Optional.of(defaultGame));
        when(gameRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(userService.getUserByAuthentication(authentication)).thenReturn(defaultUser);
        gameService.newGame(authentication);
        assertThrows(IllegalArgumentException.class, () -> gameService.changeLanguage(1L, "patata", authentication));
    }

    @Test
    public void getGameDetails(){
        when(gameRepository.findByIdForUser(any(), any())).thenReturn(Optional.of(defaultGame));
        when(userService.getUserByAuthentication(authentication)).thenReturn(defaultUser);
        when(gameRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        GameResponseDto gameDto = gameService.newGame(authentication);
        gameService.startRound(1L, authentication);
        gameService.getGameDetails(1L, authentication);
        assertEquals(defaultGameResponseDto, gameDto);
    }

    @Test
    public void getGameDetailsInvalidId(){
        when(gameRepository.findByIdForUser(1L, 1L)).thenReturn(Optional.of(defaultGame));
        when(userService.getUserByAuthentication(authentication)).thenReturn(defaultUser);
        when(gameRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        gameService.newGame(authentication);
        gameService.startRound(1L, authentication);
        assertThrows(NoSuchElementException.class, () -> gameService.getGameDetails(2L, authentication));
    }

    @Test
    public void testGetQuestionCategories(){
        assertEquals(Arrays.asList(QuestionCategory.values()), gameService.getQuestionCategories());
    }

}
