package lab.en2b.quizapi.auth;

import lab.en2b.quizapi.auth.dtos.LoginDto;
import lab.en2b.quizapi.auth.dtos.RefreshTokenDto;
import lab.en2b.quizapi.auth.dtos.RegisterDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    public ResponseEntity<?> login(LoginDto loginRequest) {
        throw new UnsupportedOperationException();
    }

    public ResponseEntity<?> register(RegisterDto registerRequest) {
        throw new UnsupportedOperationException();
    }

    public ResponseEntity<?> refreshToken(RefreshTokenDto refreshTokenRequest) {
        throw new UnsupportedOperationException();
    }
}
