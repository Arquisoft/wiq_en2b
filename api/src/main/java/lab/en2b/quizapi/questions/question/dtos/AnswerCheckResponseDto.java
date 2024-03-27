package lab.en2b.quizapi.questions.question.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class AnswerCheckResponseDto {

    @Schema(description = "Whether the answer was correct or not", example = "true")
    private boolean wasCorrect;
}
