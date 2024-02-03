package lab.en2b.quizapi.auth;

import lab.en2b.quizapi.auth.dtos.LoginDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    public ResponseEntity<?> login(LoginDto loginRequest) {
        throw new UnsupportedOperationException();
    }
}
