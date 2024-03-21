package lab.en2b.quizapi.game;

import lab.en2b.quizapi.game.dtos.GameResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<GameResponseDto> startRound(@PathVariable Long id){
        return ResponseEntity.ok(gameService.startRound(id));
    }

}
