package lab.en2b.quizapi.questions.question.dtos;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@EqualsAndHashCode
public class AnswerCheckResponseDto {
    private boolean wasCorrect;
}
