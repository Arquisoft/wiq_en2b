package lab.en2b.quizapi.game.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lab.en2b.quizapi.questions.question.QuestionCategory;
import lombok.*;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
public class CustomGameDto {
    @Positive
    @NotNull
    @NonNull
    @Schema(description = "Number of rounds for the custom game",example = "9")
    private Long rounds;
    @Positive
    @NotNull
    @NonNull
    @JsonProperty("round_duration")
    @Schema(description = "Duration of the round in seconds",example = "30")
    private Integer roundDuration;
    @NotNull
    @NonNull
    @Schema(description = "Categories selected for questions",example = "[\"HISTORY\",\"SCIENCE\"]")
    private List<QuestionCategory> categories;
}
