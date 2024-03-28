package lab.en2b.quizapi.questions.answer.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
public class AnswerDto {
    @JsonProperty("answer_id")
    @NonNull
    @NotNull
    @PositiveOrZero
    @Schema(description = "Token returned when login in",example = "0")
    private Long answerId;
}
