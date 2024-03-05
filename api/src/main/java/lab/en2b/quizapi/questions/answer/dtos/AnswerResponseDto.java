package lab.en2b.quizapi.questions.answer.dtos;

import lab.en2b.quizapi.questions.answer.AnswerCategory;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@EqualsAndHashCode
public class AnswerResponseDto {
    private Long id;
    private String text;
    private AnswerCategory category;
}
