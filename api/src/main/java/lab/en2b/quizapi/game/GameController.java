package lab.en2b.quizapi.game;

import lab.en2b.quizapi.game.dtos.GameResponseDto;
import lab.en2b.quizapi.questions.question.dtos.QuestionResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/games")
@RequiredArgsConstructor
public class GameController {
    private final GameService gameService;
    @PostMapping("/new")
    public ResponseEntity<GameResponseDto> newGame(Authentication authentication){
        return ResponseEntity.ok(gameService.newGame(authentication));
    }

    @PostMapping("/{id}/startRound")
    public ResponseEntity<GameResponseDto> startRound(@PathVariable Long id, Authentication authentication){
        return ResponseEntity.ok(gameService.startRound(id, authentication));
    }

    @GetMapping("/{id}/question")
    public ResponseEntity<QuestionResponseDto> getCurrentQuestion(@PathVariable Long id, Authentication authentication){
        return ResponseEntity.ok(gameService.getCurrentQuestion(id, authentication));
    }

    @PostMapping("/{id}/answer")
    public ResponseEntity<GameResponseDto> answerQuestion(@PathVariable Long id, @RequestParam Long answerId){
        return ResponseEntity.ok(gameService.answerQuestion(id, answerId));
    }

}
