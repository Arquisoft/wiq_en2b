package lab.en2b.quizapi.game.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lab.en2b.quizapi.game.GameMode;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
public class GameModeDto {
    private String name;
    private String description;
    @JsonProperty("internal_representation")
    private GameMode internalRepresentation;
    @JsonProperty("icon_name")
    private String iconName;
}
