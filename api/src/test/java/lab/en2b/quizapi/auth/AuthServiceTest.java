package lab.en2b.quizapi.auth;

import ch.qos.logback.core.util.TimeUtil;
import lab.en2b.quizapi.auth.config.UserDetailsImpl;
import lab.en2b.quizapi.auth.dtos.*;
import lab.en2b.quizapi.auth.jwt.JwtUtils;
import lab.en2b.quizapi.commons.user.User;
import lab.en2b.quizapi.commons.user.UserRepository;
import lab.en2b.quizapi.commons.user.UserService;
import lab.en2b.quizapi.commons.user.role.Role;
import lab.en2b.quizapi.commons.user.role.RoleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.swing.text.html.Option;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith({MockitoExtension.class, SpringExtension.class})
public class AuthServiceTest {
    @InjectMocks
    AuthService authService;
    @Mock
    UserService userService;
    @Mock
    UserRepository userRepository;
    @Mock
    RoleRepository roleRepository;
    @Mock
    AuthenticationManager authenticationManager;
    @Mock
    JwtUtils jwtUtils;
    User defaultUser;
    @BeforeEach
    void setUp() {
        this.userService = new UserService(userRepository,roleRepository);
        this.authService = new AuthService(authenticationManager,userService,jwtUtils);
        this.defaultUser = User.builder()
                .id(1L)
                .email("test@email.com")
                .username("test")
                .roles(Set.of(new Role("user")))
                .password("password")
                .refreshToken("token")
                .refreshExpiration(Instant.ofEpochSecond(TimeUtil.computeStartOfNextSecond(System.currentTimeMillis()+ 1000)))
                .build();
    }
    @Test
    void testLogin(){
        Authentication authentication = mock(Authentication.class);

        when(authenticationManager.authenticate(any())).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(UserDetailsImpl.build(defaultUser));
        when(jwtUtils.generateJwtTokenUserPassword(authentication)).thenReturn("jwtToken");
        when(userRepository.findById(any())).thenReturn(Optional.of(defaultUser));

        ResponseEntity<JwtResponseDto> actual = authService.login(new LoginDto("test","password"));

        assertEquals(ResponseEntity.of(Optional.of(
                JwtResponseDto.builder()
                        .userId(1L)
                        .username(defaultUser.getUsername())
                        .email(defaultUser.getEmail())
                        .refreshToken(defaultUser.getRefreshToken())
                        .token("jwtToken")
                        .roles(List.of("user"))
                        .build()))
                ,actual);

    }
    @Test
    void testRegister(){

        when(userRepository.existsByEmail(any())).thenReturn(false);
        when(userRepository.existsByUsername(any())).thenReturn(false);
        when(userRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);
        when(roleRepository.findByName(any())).thenReturn(Optional.of(new Role("user")));

        ResponseEntity<?> actual = authService.register(new RegisterDto("test","username","password"));

        assertEquals(ResponseEntity.of(Optional.of("User registered successfully!")),actual);

    }

    @Test
    void testRefreshToken(){

        when(userRepository.findByRefreshToken(any())).thenReturn(Optional.of(defaultUser));
        when(jwtUtils.generateTokenFromEmail(any())).thenReturn("jwtToken");

        ResponseEntity<?> actual = authService.refreshToken(new RefreshTokenDto("token"));

        assertEquals(ResponseEntity.of(Optional.of(new RefreshTokenResponseDto("jwtToken","token"))),actual);

    }
}
