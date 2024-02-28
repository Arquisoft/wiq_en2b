package lab.en2b.quizapi.commons.user;

import lab.en2b.quizapi.auth.config.UserDetailsImpl;
import lab.en2b.quizapi.auth.dtos.RegisterDto;
import lab.en2b.quizapi.commons.user.role.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    @Value("${REFRESH_TOKEN_DURATION_MS}")
    private Long REFRESH_TOKEN_DURATION_MS;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return UserDetailsImpl.build(userRepository.findByEmail(email).orElseThrow());
    }
    public void createUser(RegisterDto registerRequest, Set<String> roleNames){
        if (userRepository.existsByEmail(registerRequest.getEmail()) || userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new IllegalArgumentException("Error: email is already in use!");
        }

        userRepository.save(User.builder()
                    .username(registerRequest.getUsername())
                    .email(registerRequest.getEmail())
                    .password(new BCryptPasswordEncoder().encode(registerRequest.getPassword()))
                    .roles(roleNames.stream().map( roleName -> roleRepository.findByName(roleName).orElseThrow()).collect(Collectors.toSet()))
                    .build());
    }

    public Optional<User> findByRefreshToken(String refreshToken) {
        return userRepository.findByRefreshToken(refreshToken);
    }

    public String assignNewRefreshToken(Long id) {
        User user = userRepository.findById(id).orElseThrow();
        user.setRefreshToken(UUID.randomUUID().toString());
        user.setRefreshExpiration(Instant.now().plusMillis(REFRESH_TOKEN_DURATION_MS));
        userRepository.save(user);
        return user.getRefreshToken();
    }
}