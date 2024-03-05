package lab.en2b.quizapi.questions.question.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AnswerCheckResponseDto {
    private boolean wasCorrect;
}
