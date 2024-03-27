package lab.en2b.quizapi.questions.answer.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import lab.en2b.quizapi.questions.answer.AnswerCategory;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@EqualsAndHashCode
public class AnswerResponseDto {

    @Schema(example = "1")
    private Long id;

    @Schema(example = "Paris")
    private String text;

    @Schema(example = "CITY")
    private AnswerCategory category;
}
