package lab.en2b.quizapi.user;

import lab.en2b.quizapi.commons.user.User;
import lab.en2b.quizapi.commons.user.UserRepository;
import lab.en2b.quizapi.commons.user.UserService;
import lab.en2b.quizapi.commons.user.dtos.UserResponseDto;
import lab.en2b.quizapi.commons.user.mappers.UserResponseDtoMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.junit.jupiter.SpringExtension;

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
                .build();
        defaultUserResponseDto = UserResponseDto.builder()
                .id(1L)
                .username("HordyJurtado")
                .email("test@test.com")
                .build();
    }

}
