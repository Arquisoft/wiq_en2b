package lab.en2b.quizapi.game;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lab.en2b.quizapi.game.dtos.*;
import lab.en2b.quizapi.questions.question.dtos.QuestionCategoryDto;
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
            @ApiResponse(responseCode = "400", description = "Given when: \n * language provided is not valid \n * gamemode provided is not valid \n * body is not provided with custom game", content = @io.swagger.v3.oas.annotations.media.Content),
            @ApiResponse(responseCode = "403", description = "You are not logged in", content = @io.swagger.v3.oas.annotations.media.Content),
    })
    @Parameters({
            @Parameter(name = "lang", description = "The language of the game", example = "en"),
            @Parameter(name = "gamemode", description = "The gamemode of the game", example = "KIWI_QUEST")
    })
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "The custom game dto, only required if the gamemode is CUSTOM")
    @PostMapping("/play")
    public ResponseEntity<GameResponseDto> newGame(@RequestParam(required = false) String lang, @RequestParam(required=false) GameMode gamemode, @RequestBody(required = false) @Valid CustomGameDto customGameDto, Authentication authentication){
        if(gamemode == GameMode.CUSTOM && customGameDto == null)
            throw new IllegalArgumentException("Custom game mode requires a body");
        return ResponseEntity.ok(gameService.newGame(lang,gamemode,customGameDto,authentication));
    }
    @Operation(summary = "Gets the current game", description = "Requests the API to get the current game")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "403", description = "You are not logged in", content = @io.swagger.v3.oas.annotations.media.Content),
            @ApiResponse(responseCode = "404", description = "No active game", content = @io.swagger.v3.oas.annotations.media.Content),
    })
    @GetMapping("/play")
    public ResponseEntity<GameResponseDto> getGame(Authentication authentication){
        return ResponseEntity.ok(gameService.getGame(authentication));
    }

    @Operation(summary = "Checks if there is an active game", description = "Requests the API to check if there exists an active game for a given authentication (a player)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "403", description = "You are not logged in", content = @io.swagger.v3.oas.annotations.media.Content),
    })
    @GetMapping("/is-active")
    public ResponseEntity<GameActiveResponseDto> isActive(Authentication authentication){
        return ResponseEntity.ok(gameService.isActive(authentication));
    }

    @Operation(summary = "Starts a new round", description = "Starts the round (asks a question and its possible answers to the API and start the timer) for a given authentication (a player)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "403", description = "You are not logged in", content = @io.swagger.v3.oas.annotations.media.Content),
    })
    @Parameter(name = "id", description = "The id of the game to start the round for", example = "1")
    @PostMapping("/{id}/startRound")
    public ResponseEntity<GameResponseDto> startRound(@PathVariable Long id, Authentication authentication){
        return ResponseEntity.ok(gameService.startRound(id, authentication));
    }

    @Operation(summary = "Gets the current question", description = "Gets the question and its possible answers from the API for a given authentication (a player)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "403", description = "You are not logged in", content = @io.swagger.v3.oas.annotations.media.Content),
    })
    @Parameter(name = "id", description = "The id of the game to get the current question for", example = "1")
    @GetMapping("/{id}/question")
    public ResponseEntity<QuestionResponseDto> getCurrentQuestion(@PathVariable Long id, Authentication authentication){
        return ResponseEntity.ok(gameService.getCurrentQuestion(id, authentication));
    }

    @Operation(summary = "Answers the question", description = "Answers the question for the current game")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "400", description = "Not a valid answer", content = @io.swagger.v3.oas.annotations.media.Content),
            @ApiResponse(responseCode = "403", description = "You are not logged in", content = @io.swagger.v3.oas.annotations.media.Content),
    })
    @Parameter(name = "id", description = "The id of the game to answer the question for", example = "1")
    @PostMapping("/{id}/answer")
        public ResponseEntity<AnswerGameResponseDto> answerQuestion(@PathVariable Long id, @RequestBody GameAnswerDto dto, Authentication authentication){
        return ResponseEntity.ok(gameService.answerQuestion(id, dto, authentication));
    }

    @Operation(summary = "Changing languages", description = "Changes the language of the game for a given authentication (a player) and a language supported. Changes may are applied on the next round.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "400", description = "Not a valid language to change to", content = @io.swagger.v3.oas.annotations.media.Content),
            @ApiResponse(responseCode = "403", description = "You are not logged in", content = @io.swagger.v3.oas.annotations.media.Content),
    })
    @Parameter(name = "id", description = "The id of the game to change the language for", example = "1")
    @PutMapping("/{id}/language")
    public ResponseEntity<GameResponseDto> changeLanguage(@PathVariable Long id, @RequestParam String language, Authentication authentication){
        return ResponseEntity.ok(gameService.changeLanguage(id, language, authentication));
    }

    @Operation(summary = "Get the summary of a game")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "403", description = "You are not logged in", content = @io.swagger.v3.oas.annotations.media.Content),
    })
    @Parameter(name = "id", description = "The id of the game to get the summary for", example = "1")
    @GetMapping("/{id}/details")
    public ResponseEntity<GameResponseDto> getGameDetails(@PathVariable Long id, Authentication authentication){
        return ResponseEntity.ok(gameService.getGameDetails(id, authentication));
    }

    @Operation(summary = "Get the list of gamemodes a game can have")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "403", description = "You are not logged in", content = @io.swagger.v3.oas.annotations.media.Content)
    })
    @GetMapping("/gamemodes")
    public ResponseEntity<List<GameModeDto>> getQuestionGameModes(){
        return ResponseEntity.ok(gameService.getQuestionGameModes());
    }

    @Operation(summary = "Get the list of categories a game can have")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "403", description = "You are not logged in", content = @io.swagger.v3.oas.annotations.media.Content)
    })
    @GetMapping("/question-categories")
    public ResponseEntity<List<QuestionCategoryDto>> getQuestionCategories(@RequestParam(required = false) String lang){
        return ResponseEntity.ok(gameService.getQuestionCategories(lang));
    }

}
