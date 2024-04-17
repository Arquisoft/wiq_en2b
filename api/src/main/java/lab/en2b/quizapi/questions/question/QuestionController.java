package lab.en2b.quizapi.questions.question;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import jakarta.validation.constraints.PositiveOrZero;
import lab.en2b.quizapi.questions.answer.dtos.AnswerDto;
import lab.en2b.quizapi.questions.question.dtos.AnswerCheckResponseDto;
import lab.en2b.quizapi.questions.question.dtos.QuestionResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionService questionService;

    @Operation(summary = "Sends an answer", description = "Sends the answer dto for a given question id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "404", description = "Not found - There is not a question with that id", content = @io.swagger.v3.oas.annotations.media.Content)
    })
    @PostMapping("/{questionId}/answer")
    private ResponseEntity<AnswerCheckResponseDto> answerQuestion(@PathVariable @PositiveOrZero Long questionId, @Valid @RequestBody AnswerDto answerDto){
        return ResponseEntity.ok(questionService.answerQuestion(questionId,answerDto));
    }

    @Operation(summary = "Gets a random question", description = "Gets a random question in the language")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "404", description = "Language does not exist or it is misspelled", content = @io.swagger.v3.oas.annotations.media.Content)
    })
    @GetMapping("/random")
    private ResponseEntity<QuestionResponseDto> generateQuestion(@RequestParam(required = false) String lang){
        return ResponseEntity.ok(questionService.getRandomQuestion(lang));
    }

    @Operation(summary = "Gets a question", description = "Gets a question given a question id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "404", description = "Not found - There is not a question with that id", content = @io.swagger.v3.oas.annotations.media.Content)
    })
    @GetMapping("/{id}")
    private ResponseEntity<QuestionResponseDto> getQuestionById(@PathVariable @PositiveOrZero Long id){
        return ResponseEntity.ok(questionService.getQuestionById(id));
    }

    @Operation(summary = "Gets a list of questions", description = "Gets a list of questions given a page number")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
        @ApiResponse(responseCode = "404", description = "Not found - There are no questions", content = @io.swagger.v3.oas.annotations.media.Content),
        @ApiResponse(responseCode = "400", description = "Bad request - The page number is invalid", content = @io.swagger.v3.oas.annotations.media.Content)
    })
    @Parameter(name = "page", description = "The page number", required = true)
    @GetMapping
    private ResponseEntity<List<QuestionResponseDto>> getQuestions(@RequestParam Long page){
        return ResponseEntity.ok(questionService.getQuestionsWithPage(page));
    }
}
