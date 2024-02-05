package lab.en2b.quizapi.auth;

import lab.en2b.quizapi.auth.config.UserDetailsImpl;
import lab.en2b.quizapi.auth.dtos.JwtResponseDto;
import lab.en2b.quizapi.auth.dtos.LoginDto;
import lab.en2b.quizapi.auth.dtos.RefreshTokenDto;
import lab.en2b.quizapi.auth.dtos.RegisterDto;
import lab.en2b.quizapi.auth.jwt.JwtService;
import lab.en2b.quizapi.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    @Transactional
    public ResponseEntity<JwtResponseDto> login(LoginDto loginRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtService.generateJwtTokenUserPassword(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        String refreshToken = userService.createRefreshToken(userDetails.getId());
        return ResponseEntity.ok(new JwtResponseDto(jwt,
                refreshToken,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    public ResponseEntity<?> register(RegisterDto registerRequest) {
        throw new UnsupportedOperationException();
    }

    public ResponseEntity<?> refreshToken(RefreshTokenDto refreshTokenRequest) {
        throw new UnsupportedOperationException();
    }
}
