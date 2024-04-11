package lab.en2b.quizapi.user;

import lab.en2b.quizapi.commons.user.User;
import lab.en2b.quizapi.commons.user.UserRepository;
import lab.en2b.quizapi.commons.user.UserService;
import lab.en2b.quizapi.commons.user.dtos.UserResponseDto;
import lab.en2b.quizapi.commons.user.mappers.UserResponseDtoMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith({MockitoExtension.class, SpringExtension.class})
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserResponseDtoMapper userResponseDtoMapper;

    private User defaultUser;

    private UserResponseDto defaultUserResponseDto;

    @BeforeEach
    public void setUp() {
        userService = new UserService(userRepository);
        defaultUser = User.builder()
                .id(1L)
                .username("HordyJurtado")
                .email("test@test.com")
                .password("password")
                .role("ROLE_USER")
                .build();
        defaultUserResponseDto = UserResponseDto.builder()
                .id(1L)
                .username("HordyJurtado")
                .email("test@test.com")
                .build();
    }

    @Test
    public void getUserDetailsTest(){
        Authentication authentication = mock(Authentication.class);
        when(userService.getUserByAuthentication(any())).thenReturn(defaultUser);
        Assertions.assertEquals(defaultUserResponseDto, userService.getUserDetailsByAuthentication(authentication));
    }

}
