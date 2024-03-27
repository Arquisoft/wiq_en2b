package lab.en2b.quizapi.questions.question.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import lab.en2b.quizapi.questions.answer.AnswerCategory;
import lab.en2b.quizapi.questions.answer.dtos.AnswerResponseDto;
import lab.en2b.quizapi.questions.question.QuestionCategory;
import lab.en2b.quizapi.questions.question.QuestionType;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@EqualsAndHashCode
public class QuestionResponseDto {

    @Schema(example = "1")
    private Long id;

    @Schema(example = "What is the capital of France?")
    private String content;

    @Schema(example = "[{\"id\":1,\"text\":\"Paris\",\"category\":\"CITY\"},{\"id\":2,\"text\":\"London\",\"category\":\"CITY\"}" +
            ",{\"id\":3,\"text\":\"Berlin\",\"category\":\"CITY\"},{\"id\":4,\"text\":\"Madrid\",\"category\":\"CITY\"}]")
    private List<AnswerResponseDto> answers;

    @Schema(example = "GEOGRAPHY")
    private QuestionCategory questionCategory;

    @Schema(example = "CITY")
    private AnswerCategory answerCategory;

    @Schema(example = "en")
    private String language;

    @Schema(example = "MULTIPLE_CHOICE")
    private QuestionType type;
}
