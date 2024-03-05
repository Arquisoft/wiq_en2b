package lab.en2b.quizapi.questions;

import lab.en2b.quizapi.questions.answer.AnswerCategory;
import lab.en2b.quizapi.questions.question.*;
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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith({MockitoExtension.class, SpringExtension.class})
public class QuestionServiceTest {
    @InjectMocks
    QuestionService questionService;

    @Mock
    QuestionRepository questionRepository;

    Question defaultQuestion;

    @BeforeEach
    void setUp() {
        this.questionService = new QuestionService(questionRepository,new QuestionResponseDtoMapper());
        defaultQuestion = Question.builder()
                .id(1L)
                .content("What is the capital of France?")
                .answers(new ArrayList<>())
                .correctAnswer(null)
                .language("en")
                .questionCategory(QuestionCategory.GEOGRAPHY)
                .answerCategory(AnswerCategory.CITY)
                .type(QuestionType.TEXT)
                .build();

    }

    @Test
    void testGetRandomQuestion() {
        when(questionRepository.findRandomQuestion()).thenReturn(defaultQuestion);
        QuestionResponseDto response =  questionService.getRandomQuestion();

        assertEquals(response, QuestionResponseDto.builder()
                .id(1L)
                .content("What is the capital of France?")
                .answers(new ArrayList<>())
                .language("en")
                .questionCategory(QuestionCategory.GEOGRAPHY)
                .answerCategory(AnswerCategory.CITY)
                .type(QuestionType.TEXT)
                .build());
    }

}
