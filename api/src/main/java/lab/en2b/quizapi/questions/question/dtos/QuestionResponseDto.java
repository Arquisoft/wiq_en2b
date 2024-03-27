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

    @Schema(description = "Id for the question", example = "1")
    private Long id;

    @Schema(description = "Content of the question", example = "What is the capital of France?")
    private String content;

    @Schema(description = "Answers for the question",
            example = "[{\"id\":1,\"text\":\"Paris\",\"category\":\"CITY\"},{\"id\":2,\"text\":\"London\",\"category\":\"CITY\"}" +
            ",{\"id\":3,\"text\":\"Berlin\",\"category\":\"CITY\"},{\"id\":4,\"text\":\"Madrid\",\"category\":\"CITY\"}]")
    private List<AnswerResponseDto> answers;

    @Schema(description = "Category for the question",example = "GEOGRAPHY")
    private QuestionCategory questionCategory;

    @Schema(description = "Answer category for the question",example = "CITY")
    private AnswerCategory answerCategory;

    @Schema(description = "Language for the question",example = "en")
    private String language;

    @Schema(description = "Type of the question",example = "MULTIPLE_CHOICE")
    private QuestionType type;
}
