package lab.en2b.quizapi.game.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lab.en2b.quizapi.commons.user.UserResponseDto;
import lab.en2b.quizapi.game.GameMode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@AllArgsConstructor
@Data
@Builder
@EqualsAndHashCode
public class GameResponseDto {
    @Schema(description = "Identification for a game", example = "23483743")
    private Long id;

    @Schema(description = "User for the game", example = "{\"id\":1,\"username\":\"Hordi Jurtado\",\"email\":\"chipiChipi@chapaChapa.es \"}")
    private UserResponseDto user;

    @Schema(description = "Total rounds for the game", example = "9")
    private Long rounds;

    @Schema(description = "Actual round for the game", example = "3")
    @JsonProperty("actual_round")
    private Long actualRound;

    @Schema(description = "Number of correct answered questions", example = "2")
    @JsonProperty("correctly_answered_questions")
    private Long correctlyAnsweredQuestions;

    @Schema(description = "Moment when the timer has started", example = "LocalDateTime.now()")
    @JsonProperty("round_start_time")
    private String roundStartTime;

    @Schema(description = "Number of seconds for the player to answer the question", example = "20")
    @JsonProperty("round_duration")
    private Integer roundDuration;

    @Schema(description = "Whether the game has finished or not", example = "true")
    private boolean isGameOver;

    @Schema(description = "Game mode for the game", example = "KIWI_QUEST")
    private GameMode gamemode;
}
