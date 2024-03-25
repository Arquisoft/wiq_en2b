package lab.en2b.quizapi.auth;

import jakarta.validation.Valid;
import lab.en2b.quizapi.auth.dtos.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<JwtResponseDto> registerUser(@Valid @RequestBody RegisterDto registerRequest){
        authService.register(registerRequest);
        JwtResponseDto dto =
                authService.login(new LoginDto(registerRequest.getEmail(), registerRequest.getPassword()));
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + dto.getToken());
        return ResponseEntity.ok().headers(headers).body(dto);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponseDto> loginUser(@Valid @RequestBody LoginDto loginRequest){
        JwtResponseDto dto = authService.login(loginRequest);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + dto.getToken());
        return ResponseEntity.ok().headers(headers).body(dto);
    }

    @GetMapping("/logout")
    public ResponseEntity<Void> logoutUser(Authentication authentication){
        authService.logOut(authentication);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<RefreshTokenResponseDto> refreshToken(@Valid @RequestBody RefreshTokenDto refreshTokenRequest){
        return ResponseEntity.ok(authService.refreshToken(refreshTokenRequest));
    }
}
