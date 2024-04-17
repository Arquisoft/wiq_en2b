package lab.en2b.quizapi.user;

import lab.en2b.quizapi.auth.config.UserDetailsImpl;
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
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
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

    private UserResponseDtoMapper userResponseDtoMapper;

    private User defaultUser;

    private UserResponseDto defaultUserResponseDto;

    @BeforeEach
    public void setUp() {
        this.userResponseDtoMapper = new UserResponseDtoMapper();
        userService = new UserService(userRepository, userResponseDtoMapper);
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
    public void getPersonalDetailsTest(){
        Authentication authentication = mock(Authentication.class);
        when(authentication.getPrincipal()).thenReturn(UserDetailsImpl.build(defaultUser));
        when(userRepository.findByEmail(any())).thenReturn(Optional.of(defaultUser));
        UserResponseDto result = userService.getUserDetailsByAuthentication(authentication);
        Assertions.assertEquals(defaultUserResponseDto, result);
    }

    @Test
    public void getPersonalDetailsWhenNotFound() {
        Authentication authentication = mock(Authentication.class);
        when(authentication.getPrincipal()).thenReturn(UserDetailsImpl.build(defaultUser));
        when(userRepository.findByEmail(any())).thenReturn(Optional.empty());
        Assertions.assertThrows(NoSuchElementException.class, () -> userService.getUserDetailsByAuthentication(authentication));
    }

    @Test
    public void getUsersTestWhenThereAreMultiplePeople(){
        User defaultUser1 = User.builder()
                .id(1L)
                .username("HordyJurtado")
                .email("test1@test1.com")
                .password("password")
                .role("ROLE_USER")
                .build();
        User defaultUser2 = User.builder()
                .id(2L)
                .username("HordyJurtado")
                .email("test2@test2.com")
                .password("password")
                .role("ROLE_USER")
                .build();
        User defaultUser3 = User.builder()
                .id(3L)
                .username("HordyJurtado")
                .email("test3@test3.com")
                .password("password")
                .role("ROLE_USER")
                .build();
        List<User> userResult = List.of(defaultUser1, defaultUser2, defaultUser3);
        when(userRepository.findAll()).thenReturn(userResult);
        List<UserResponseDto> result = userResult.stream().map(userResponseDtoMapper::apply).toList();
        Assertions.assertEquals(result, userService.getUsers());
    }

    @Test
    public void getUsersTestWhenThereIsNoPeople(){
        when(userRepository.findAll()).thenReturn(new ArrayList<>());
        Assertions.assertEquals(List.of(), userService.getUsers());
    }

    @Test
    public void getUserTest(){
        when(userRepository.findById(1L)).thenReturn(Optional.of(defaultUser));
        Assertions.assertEquals(defaultUserResponseDto, userService.getUser(1L));
    }

    @Test
    public void getUserTestWhenNotFound(){
        when(userRepository.findById(1L)).thenReturn(Optional.empty());
        Assertions.assertThrows(NoSuchElementException.class, () -> userService.getUser(1L));
    }

}
