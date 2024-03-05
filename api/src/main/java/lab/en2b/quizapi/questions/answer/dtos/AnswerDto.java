package lab.en2b.quizapi.questions.answer.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AnswerDto {
    @JsonProperty("answer_id")
    @NonNull
    @NotNull
    @PositiveOrZero
    private Long answerId;
}
