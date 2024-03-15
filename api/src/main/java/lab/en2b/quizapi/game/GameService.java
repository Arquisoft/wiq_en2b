package lab.en2b.quizapi.game;

import lab.en2b.quizapi.game.dtos.GameResponseDto;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class GameService {

    public GameResponseDto newGame(Authentication authentication) {
        return GameResponseDto.builder().id(1L).build();
    }
}
