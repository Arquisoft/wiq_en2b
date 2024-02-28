package lab.en2b.quizapi.questions.question.dtos;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lab.en2b.quizapi.questions.answer.Answer;
import lab.en2b.quizapi.questions.answer.AnswerCategory;
import lab.en2b.quizapi.questions.answer.dtos.AnswerResponseDto;
import lab.en2b.quizapi.questions.question.QuestionCategory;
import lab.en2b.quizapi.questions.question.QuestionType;

import java.util.List;

public class QuestionResponseDto {
    private Long id;
    private String content;
    private List<AnswerResponseDto> answers;
    private QuestionCategory questionCategory;
    private AnswerCategory answerCategory;
    private String language;
    private QuestionType type;
}
