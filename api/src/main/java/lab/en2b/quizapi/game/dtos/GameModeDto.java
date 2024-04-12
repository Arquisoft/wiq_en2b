package lab.en2b.quizapi.game.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lab.en2b.quizapi.game.GameMode;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
public class GameModeDto {
    @Schema(description = "Beautified name of the game mode",example = "Quiwi Quest")
    private String name;
    @Schema(description = "Description of the game mode",example = "Test description of the game mode")
    private String description;
    @JsonProperty("internal_representation")
    @Schema(description = "Internal code used for describing the game mode",example = "KIWI_QUEST")
    private GameMode internalRepresentation;
    @JsonProperty("icon_name")
    @Schema(description = "Code for the icon used in the frontend of the application",example = "FaKiwiBird")
    private String iconName;
}
