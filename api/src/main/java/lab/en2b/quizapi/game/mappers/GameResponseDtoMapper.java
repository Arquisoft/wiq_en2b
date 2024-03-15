package lab.en2b.quizapi.game.mappers;

import lab.en2b.quizapi.commons.user.mappers.UserResponseDtoMapper;
import lab.en2b.quizapi.game.Game;
import lab.en2b.quizapi.game.dtos.GameResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class GameResponseDtoMapper implements Function<Game, GameResponseDto>{
    private final UserResponseDtoMapper userResponseDtoMapper;
    @Override
    public GameResponseDto apply(Game game) {
        return GameResponseDto.builder()
                .id(game.getId())
                .user(userResponseDtoMapper.apply(game.getUser()))
                .rounds(game.getRounds())
                .correctlyAnsweredQuestions(game.getCorrectlyAnsweredQuestions())
                .build();
    }
}
