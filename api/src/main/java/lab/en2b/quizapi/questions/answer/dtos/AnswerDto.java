package lab.en2b.quizapi.questions.answer.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AnswerDto {
    @JsonProperty("answer_id")
    private Long answerId;
}
