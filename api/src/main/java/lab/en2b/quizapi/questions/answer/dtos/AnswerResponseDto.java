package lab.en2b.quizapi.questions.answer.dtos;

import lab.en2b.quizapi.questions.answer.AnswerCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class AnswerResponseDto {
    private Long id;
    private String text;
    private AnswerCategory category;
}
