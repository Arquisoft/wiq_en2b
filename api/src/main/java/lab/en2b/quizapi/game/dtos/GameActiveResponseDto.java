package lab.en2b.quizapi.game.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class GameActiveResponseDto {
    @JsonProperty("is_active")
    @Schema(description = "Whether the game is active or not",example = "true")
    private boolean isActive;
}
