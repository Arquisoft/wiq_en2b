package lab.en2b.quizapi.auth;

import jakarta.validation.Valid;
import lab.en2b.quizapi.auth.dtos.LoginDto;
import lab.en2b.quizapi.auth.dtos.RegisterDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterDto registerRequest){
        return authService.register(registerRequest);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginDto loginRequest){
        return authService.login(loginRequest);
    }
}
