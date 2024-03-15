package lab.en2b.quizapi.game;

import ch.qos.logback.core.util.TimeUtil;
import lab.en2b.quizapi.auth.config.UserDetailsImpl;
import lab.en2b.quizapi.commons.user.User;
import lab.en2b.quizapi.game.dtos.GameResponseDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.Instant;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith({MockitoExtension.class, SpringExtension.class})
public class GameServiceTest {

    @InjectMocks
    private GameService gameService;

    private User defaultUser;
    @BeforeEach
    void setUp() {
        this.defaultUser = User.builder()
                .id(1L)
                .email("test@email.com")
                .username("test")
                .role("user")
                .password("password")
                .refreshToken("token")
                .refreshExpiration(Instant.ofEpochSecond(TimeUtil.computeStartOfNextSecond(System.currentTimeMillis()+ 1000)))
                .build();
    }

    @Test
    public void newGame(){
        Authentication authentication = mock(Authentication.class);
        //when(authentication.getPrincipal()).thenReturn(UserDetailsImpl.build(defaultUser));

        GameResponseDto gameDto = gameService.newGame(authentication);

        assertEquals(GameResponseDto.builder().id(1L).build(), gameDto);

    }

}
