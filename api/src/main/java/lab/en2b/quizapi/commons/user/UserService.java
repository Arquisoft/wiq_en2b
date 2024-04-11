package lab.en2b.quizapi.commons.user;

import lab.en2b.quizapi.auth.config.UserDetailsImpl;
import lab.en2b.quizapi.auth.dtos.RegisterDto;
import lab.en2b.quizapi.commons.exceptions.InvalidAuthenticationException;
import lab.en2b.quizapi.commons.user.dtos.UserResponseDto;
import lab.en2b.quizapi.commons.user.mappers.UserResponseDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    @Value("${REFRESH_TOKEN_DURATION_MS}")
    private long refreshTokenDurationMs;
    private UserResponseDtoMapper userResponseDtoMapper;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return UserDetailsImpl.build(userRepository.findByEmail(email).orElseThrow(() -> new InvalidAuthenticationException("Invalid email or password provided!")));
    }
    public void createUser(RegisterDto registerRequest, String roleName){
        if (userRepository.existsByEmail(registerRequest.getEmail()) ) {
            throw new IllegalArgumentException("Error: email is already in use!");
        }else if( userRepository.existsByUsername(registerRequest.getUsername())){
            throw new IllegalArgumentException("Error: username is already in use!");
        }

        userRepository.save(User.builder()
                    .username(registerRequest.getUsername())
                    .email(registerRequest.getEmail())
                    .password(new BCryptPasswordEncoder().encode(registerRequest.getPassword()))
                    .role(roleName)
                    .build());
    }

    public Optional<User> findByRefreshToken(String refreshToken) {
        return userRepository.findByRefreshToken(refreshToken);
    }

    public String assignNewRefreshToken(Long id) {
        User user = userRepository.findById(id).orElseThrow();
        user.setRefreshToken(UUID.randomUUID().toString());
        user.setRefreshExpiration(Instant.now().plusMillis(refreshTokenDurationMs));
        userRepository.save(user);
        return user.getRefreshToken();
    }

    public void deleteRefreshToken(Long id) {
        User user = userRepository.findById(id).orElseThrow();
        user.setRefreshToken(null);
        user.setRefreshExpiration(null);
        userRepository.save(user);
    }

    public User getUserByAuthentication(Authentication authentication) {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            return userRepository.findByEmail(userDetails.getEmail()).orElseThrow();
    }

    public UserResponseDto getUserDetailsByAuthentication(Authentication authentication) {
        User user = userRepository.findByEmail(((UserDetailsImpl) authentication.getPrincipal()).getEmail()).orElseThrow();
        return userResponseDtoMapper.apply(user);
    }
}
