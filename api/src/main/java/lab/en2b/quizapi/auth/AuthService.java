package lab.en2b.quizapi.auth;

import lab.en2b.quizapi.auth.config.UserDetailsImpl;
import lab.en2b.quizapi.auth.dtos.*;
import lab.en2b.quizapi.auth.jwt.JwtUtils;
import lab.en2b.quizapi.commons.exceptions.TokenRefreshException;
import lab.en2b.quizapi.auth.dtos.RefreshTokenResponseDto;
import lab.en2b.quizapi.commons.user.User;
import lab.en2b.quizapi.commons.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    /**
     * Creates a session for a user. Throws an 401 unauthorized exception otherwise
     * @param loginRequest the request containing the login info
     * @return a response containing a fresh jwt token and a refresh token
     */
    @Transactional
    public ResponseEntity<JwtResponseDto> login(LoginDto loginRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponseDto(
                jwtUtils.generateJwtTokenUserPassword(authentication),
                userService.assignNewRefreshToken(userDetails.getId()),
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getStringRoles())
        );
    }

    public ResponseEntity<?> register(RegisterDto registerRequest) {
        userService.createUser(registerRequest,Set.of("user"));
        return ResponseEntity.ok("User registered successfully!");
    }

    public ResponseEntity<?> refreshToken(RefreshTokenDto refreshTokenRequest) {
        User user = userService.findByRefreshToken(refreshTokenRequest.getRefreshToken()).orElseThrow(() -> new TokenRefreshException(
                "Refresh token is not in database!"));
        return ResponseEntity.ok(new RefreshTokenResponseDto(jwtUtils.generateTokenFromEmail(user.getEmail()), user.obtainRefreshIfValid()));
    }
}
