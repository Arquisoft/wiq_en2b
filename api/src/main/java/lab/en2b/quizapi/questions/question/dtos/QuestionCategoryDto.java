package lab.en2b.quizapi.questions.question.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lab.en2b.quizapi.questions.question.QuestionCategory;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
public class QuestionCategoryDto {
    @Schema(description = "Beautified name of the question category",example = "Sports")
    private String name;
    @Schema(description = "Description of the question category",example = "Test description of the question category")
    private String description;
    @JsonProperty("internal_representation")
    @Schema(description = "Internal code used for describing the question category",example = "SPORTS")
    private QuestionCategory internalRepresentation;
}
