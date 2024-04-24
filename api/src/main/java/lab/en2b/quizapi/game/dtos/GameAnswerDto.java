package lab.en2b.quizapi.game.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
public class GameAnswerDto {
    @NonNull
    @PositiveOrZero
    @JsonProperty("answer_id")
    private Long answerId;
}
