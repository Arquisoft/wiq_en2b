package lab.en2b.quizapi.game;

import ch.qos.logback.core.util.TimeUtil;
import lab.en2b.quizapi.auth.config.UserDetailsImpl;
import lab.en2b.quizapi.commons.user.User;
import lab.en2b.quizapi.commons.user.UserResponseDto;
import lab.en2b.quizapi.commons.user.UserService;
import lab.en2b.quizapi.commons.user.mappers.UserResponseDtoMapper;
import lab.en2b.quizapi.game.dtos.GameResponseDto;
import lab.en2b.quizapi.game.mappers.GameResponseDtoMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.Instant;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith({MockitoExtension.class, SpringExtension.class})
public class GameServiceTest {

    @InjectMocks
    private GameService gameService;

    @Mock
    private UserService userService;

    @Mock
    private GameRepository gameRepository;

    private User defaultUser;

    private UserResponseDto defaultUserResponseDto;
    @BeforeEach
    void setUp() {
        this.gameService = new GameService(gameRepository,new GameResponseDtoMapper(new UserResponseDtoMapper()), userService);
        this.defaultUser = User.builder()
                .id(1L)
                .email("test@email.com")
                .username("test")
                .role("user")
                .password("password")
                .refreshToken("token")
                .refreshExpiration(Instant.ofEpochSecond(TimeUtil.computeStartOfNextSecond(System.currentTimeMillis()+ 1000)))
                .build();
        this.defaultUserResponseDto = UserResponseDto.builder()
                .id(1L)
                .email("test@email.com")
                .username("test")
                .build();
    }

    @Test
    public void newGame(){
        Authentication authentication = mock(Authentication.class);
        when(userService.getUserByAuthentication(authentication)).thenReturn(defaultUser);
        when(gameRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        GameResponseDto gameDto = gameService.newGame(authentication);

        assertEquals(GameResponseDto.builder().user(defaultUserResponseDto).build(), gameDto);
    }

}
