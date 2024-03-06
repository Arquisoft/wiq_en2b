package lab.en2b.quizapi.questions.question.dtos;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class AnswerCheckResponseDto {
    private boolean wasCorrect;
}
