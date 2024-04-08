package lab.en2b.quizapi.game.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class AnswerGameResponseDto {
    @JsonProperty("was_correct")
    private boolean wasCorrect;
}
