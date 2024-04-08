package lab.en2b.quizapi.game;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lab.en2b.quizapi.game.dtos.AnswerGameResponseDto;
import lab.en2b.quizapi.game.dtos.GameAnswerDto;
import lab.en2b.quizapi.game.dtos.GameResponseDto;
import lab.en2b.quizapi.questions.question.QuestionCategory;
import lab.en2b.quizapi.questions.question.dtos.QuestionResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/games")
@RequiredArgsConstructor
public class GameController {
    private final GameService gameService;

    @Operation(summary = "Starts new game", description = "Requests the API to create a new game for a given authentication (a player)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "403", description = "You are not logged in", content = @io.swagger.v3.oas.annotations.media.Content),
    })
    @PostMapping("/new")
    public ResponseEntity<GameResponseDto> newGame(Authentication authentication){
        return ResponseEntity.ok(gameService.newGame(authentication));
    }

    @Operation(summary = "Starts a new round", description = "Starts the round (asks a question and its possible answers to the API and start the timer) for a given authentication (a player)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "403", description = "You are not logged in", content = @io.swagger.v3.oas.annotations.media.Content),
    })
    @PostMapping("/{id}/startRound")
    public ResponseEntity<GameResponseDto> startRound(@PathVariable Long id, Authentication authentication){
        return ResponseEntity.ok(gameService.startRound(id, authentication));
    }

    @Operation(summary = "Starts a new round", description = "Gets the question and its possible answers from the API for a given authentication (a player)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "403", description = "You are not logged in", content = @io.swagger.v3.oas.annotations.media.Content),
    })
    @GetMapping("/{id}/question")
    public ResponseEntity<QuestionResponseDto> getCurrentQuestion(@PathVariable Long id, Authentication authentication){
        return ResponseEntity.ok(gameService.getCurrentQuestion(id, authentication));
    }

    @Operation(summary = "Starts a new round", description = "Starts the round (getting a question and its possible answers and start the timer) for a given authentication (a player)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "400", description = "Not a valid answer", content = @io.swagger.v3.oas.annotations.media.Content),
            @ApiResponse(responseCode = "403", description = "You are not logged in", content = @io.swagger.v3.oas.annotations.media.Content),
    })
    @PostMapping("/{id}/answer")
        public ResponseEntity<AnswerGameResponseDto> answerQuestion(@PathVariable Long id, @RequestBody GameAnswerDto dto, Authentication authentication){
        return ResponseEntity.ok(gameService.answerQuestion(id, dto, authentication));
    }

    @Operation(summary = "Changing languages", description = "Changes the language of the game for a given authentication (a player) and a language supported. Changes may are applied on the next round.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "400", description = "Not a valid answer", content = @io.swagger.v3.oas.annotations.media.Content),
            @ApiResponse(responseCode = "403", description = "You are not logged in", content = @io.swagger.v3.oas.annotations.media.Content),
    })
    @PutMapping("/{id}/language")
    public ResponseEntity<GameResponseDto> changeLanguage(@PathVariable Long id, @RequestParam String language, Authentication authentication){
        return ResponseEntity.ok(gameService.changeLanguage(id, language, authentication));
    }

    @Operation(summary = "Get the summary of a game")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "403", description = "You are not logged in", content = @io.swagger.v3.oas.annotations.media.Content),
    })
    @GetMapping("/{id}/details")
    public ResponseEntity<GameResponseDto> getGameDetails(@PathVariable Long id, Authentication authentication){
        return ResponseEntity.ok(gameService.getGameDetails(id, authentication));
    }

    @GetMapping("/questionCategories")
    public ResponseEntity<List<QuestionCategory>> getQuestionCategories(){
        return ResponseEntity.ok(gameService.getQuestionCategories());
    }

}
