package lab.en2b.quizapi.auth;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lab.en2b.quizapi.auth.dtos.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @Operation(summary = "Registers an user", description = "Registers an user and returns the login dto if it was 200")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved, returns the login dto"),
            @ApiResponse(responseCode = "400", description = "Invalid email format or credentials (username or email) already in use", content = @io.swagger.v3.oas.annotations.media.Content),
            @ApiResponse(responseCode = "401", description = "Invalid email or password, check for them to be correct", content = @io.swagger.v3.oas.annotations.media.Content),

    })
    @PostMapping("/register")
    public ResponseEntity<JwtResponseDto> registerUser(@Valid @RequestBody RegisterDto registerRequest){
        authService.register(registerRequest);
        return ResponseEntity.ok(authService.login(new LoginDto(registerRequest.getEmail(), registerRequest.getPassword())));
    }

    @Operation(summary = "Logs in an user", description = "Given a login dto, logs in that user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "400", description = "Invalid email format", content = @io.swagger.v3.oas.annotations.media.Content),
            @ApiResponse(responseCode = "401", description = "Invalid email or password, check for them to be correct", content = @io.swagger.v3.oas.annotations.media.Content),

    })
    @PostMapping("/login")
    public ResponseEntity<JwtResponseDto> loginUser(@Valid @RequestBody LoginDto loginRequest){
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @Operation(summary = "Logs the current user out")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "403", description = "You are not logged in, so there's no log out to do", content = @io.swagger.v3.oas.annotations.media.Content),
    })
    @GetMapping("/logout")
    public ResponseEntity<Void> logoutUser(Authentication authentication){
        authService.logOut(authentication);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Gets a refresh token dto", description = "Asks for a new token and returns a refresh token dto")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "403", description = "You are not logged in, so there's no token to refresh", content = @io.swagger.v3.oas.annotations.media.Content),
    })
    @PostMapping("/refresh-token")
    public ResponseEntity<RefreshTokenResponseDto> refreshToken(@Valid @RequestBody RefreshTokenDto refreshTokenRequest){
        return ResponseEntity.ok(authService.refreshToken(refreshTokenRequest));
    }
}
