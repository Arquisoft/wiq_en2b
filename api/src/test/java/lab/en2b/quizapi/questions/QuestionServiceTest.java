package lab.en2b.quizapi.questions;

import lab.en2b.quizapi.commons.exceptions.InternalApiErrorException;
import lab.en2b.quizapi.questions.answer.Answer;
import lab.en2b.quizapi.questions.answer.AnswerCategory;
import lab.en2b.quizapi.questions.answer.AnswerRepository;
import lab.en2b.quizapi.questions.answer.dtos.AnswerDto;
import lab.en2b.quizapi.questions.answer.dtos.AnswerResponseDto;
import lab.en2b.quizapi.questions.question.*;
import lab.en2b.quizapi.questions.question.dtos.AnswerCheckResponseDto;
import lab.en2b.quizapi.questions.question.dtos.QuestionResponseDto;
import lab.en2b.quizapi.questions.question.mappers.QuestionResponseDtoMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith({MockitoExtension.class, SpringExtension.class})
public class QuestionServiceTest {
    @InjectMocks
    QuestionService questionService;

    @Mock
    QuestionRepository questionRepository;
    @Mock
    AnswerRepository answerRepository;

    Question defaultQuestion;
    QuestionResponseDto defaultResponseDto;

    Answer defaultCorrectAnswer;
    Answer defaultIncorrectAnswer;

    @BeforeEach
    void setUp() {
        this.questionService = new QuestionService(answerRepository, questionRepository, new QuestionResponseDtoMapper());


        defaultQuestion = Question.builder()
                .id(1L)
                .answers(new ArrayList<>())
                .content("What is the capital of France?")
                .questionCategory(QuestionCategory.GEOGRAPHY)
                .type(QuestionType.TEXT)
                .build();
        defaultCorrectAnswer = Answer.builder()
                .id(1L)
                .text("Paris")
                .category(AnswerCategory.CAPITAL_CITY)
                .questions(List.of(defaultQuestion))
                .language("en")
                .questionsWithThisAnswer(List.of(defaultQuestion))
                .build();

        defaultIncorrectAnswer = Answer.builder()
                .id(2L)
                .text("Tokio")
                .category(AnswerCategory.CAPITAL_CITY)
                .questions(List.of(defaultQuestion))
                .questionsWithThisAnswer(List.of(defaultQuestion))
                .build();

        defaultQuestion.setCorrectAnswer(defaultCorrectAnswer);
        defaultQuestion.getAnswers().add(defaultCorrectAnswer);
        defaultQuestion.getAnswers().add(defaultIncorrectAnswer);

        List<AnswerResponseDto> answersDto = new ArrayList<>();
        answersDto.add(AnswerResponseDto.builder()
                .id(1L)
                .category(AnswerCategory.CAPITAL_CITY)
                .text("Paris")
                .build());
        answersDto.add(AnswerResponseDto.builder()
                .id(2L)
                .category(AnswerCategory.CAPITAL_CITY)
                .text("Tokio")
                .build());
        defaultResponseDto = QuestionResponseDto.builder()
                .id(1L)
                .content("What is the capital of France?")
                .answers(answersDto)
                .language("en")
                .questionCategory(QuestionCategory.GEOGRAPHY)
                .answerCategory(AnswerCategory.CAPITAL_CITY)
                .type(QuestionType.TEXT)
                .build();
    }

    @Test
    void testGetRandomQuestion() {
        when(questionRepository.findRandomQuestion(any(),any())).thenReturn(defaultQuestion);
        QuestionResponseDto response =  questionService.getRandomQuestion("");

        assertEquals(response.getId(), defaultResponseDto.getId());
    }

    @Test
    void testGetRandomQuestionImageType() {
        defaultQuestion.setType(QuestionType.IMAGE);
        defaultQuestion.setContent("What is the capital of France?#* &%https://www.example.com/image.jpg");
        when(questionRepository.findRandomQuestion(any(),any())).thenReturn(defaultQuestion);
        QuestionResponseDto response =  questionService.getRandomQuestion("en");
        defaultResponseDto.setType(QuestionType.IMAGE);
        defaultResponseDto.setImage("https://www.example.com/image.jpg");
        assertEquals(response, defaultResponseDto);
    }

    @Test
    void testGetRandomQuestionAnswersNotYetLoaded() {
        when(questionRepository.findRandomQuestion(any(),any())).thenReturn(defaultQuestion);
        defaultQuestion.setAnswers(List.of());
        QuestionResponseDto response =  questionService.getRandomQuestion("en");
        defaultResponseDto.setAnswers(List.of(AnswerResponseDto.builder()
                .id(1L)
                .category(AnswerCategory.CAPITAL_CITY)
                .text("Paris")
                .build()));
        assertEquals(response, defaultResponseDto);
    }
    @Test
    void testGetRandomQuestionNoQuestionsFound() {
        assertThrows(InternalApiErrorException.class,() -> questionService.getRandomQuestion(""));
    }

    @Test
    void testGetQuestionById(){
        when(questionRepository.findById(any())).thenReturn(Optional.of(defaultQuestion));
        QuestionResponseDto response = questionService.getQuestionById(1L);

        assertEquals(response, defaultResponseDto);
    }

    @Test
    void testGetQuestionByIdNotFound(){
        when(questionRepository.findById(any())).thenReturn(Optional.empty());
        assertThrows(NoSuchElementException.class,() -> questionService.getQuestionById(1L));
    }

    @Test
    void testAnswerQuestionCorrectAnswer(){
        when(questionRepository.findById(1L)).thenReturn(Optional.of(defaultQuestion));
        AnswerCheckResponseDto response = questionService.answerQuestion(1L, AnswerDto.builder().answerId(1L).build());
        assertEquals(response, new AnswerCheckResponseDto(true));
    }

    @Test
    void testAnswerQuestionIncorrectAnswer(){
        when(questionRepository.findById(1L)).thenReturn(Optional.of(defaultQuestion));
        AnswerCheckResponseDto response = questionService.answerQuestion(1L, AnswerDto.builder().answerId(2L).build());
        assertEquals(response, new AnswerCheckResponseDto(false));
    }

    @Test
    void testAnswerQuestionNotFound(){
        when(questionRepository.findById(3L)).thenReturn(Optional.empty());
        assertThrows(NoSuchElementException.class,() -> questionService.answerQuestion(3L, AnswerDto.builder().answerId(1L).build()));
    }

    @Test
    void testAnswerQuestionInvalidAnswer(){
        when(questionRepository.findById(1L)).thenReturn(Optional.of(defaultQuestion));
        assertThrows(IllegalArgumentException.class,() -> questionService.answerQuestion(1L, AnswerDto.builder().answerId(3L).build()));
    }


}
