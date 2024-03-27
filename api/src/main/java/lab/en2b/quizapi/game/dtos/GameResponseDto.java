package lab.en2b.quizapi.game.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lab.en2b.quizapi.commons.user.UserResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@AllArgsConstructor
@Data
@Builder
@EqualsAndHashCode
public class GameResponseDto {
    private Long id;

    private UserResponseDto user;

    private int rounds;

    private int actualRound;

    @JsonProperty("correctly_answered_questions")
    private int correctlyAnsweredQuestions;

    @JsonProperty("round_start_time")
    private LocalDateTime roundStartTime;

    @JsonProperty("round_duration")
    private int roundDuration;

    private boolean isGameOver;
}
