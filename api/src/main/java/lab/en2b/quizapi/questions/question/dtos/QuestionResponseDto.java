package lab.en2b.quizapi.questions.question.dtos;

import lab.en2b.quizapi.questions.answer.AnswerCategory;
import lab.en2b.quizapi.questions.answer.dtos.AnswerResponseDto;
import lab.en2b.quizapi.questions.question.QuestionCategory;
import lab.en2b.quizapi.questions.question.QuestionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
public class QuestionResponseDto {
    private Long id;
    private String content;
    private List<AnswerResponseDto> answers;
    private QuestionCategory questionCategory;
    private AnswerCategory answerCategory;
    private String language;
    private QuestionType type;
}
