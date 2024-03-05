package lab.en2b.quizapi.questions.answer.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AnswerDto {
    @JsonProperty("answer_id")
    @NonNull
    @NotNull
    @PositiveOrZero
    private Long answerId;
}
