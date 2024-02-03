package lab.en2b.quizapi.auth.jwt;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class JwtService {
    public String extractUsername(String token) {
        throw new UnsupportedOperationException();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        throw new UnsupportedOperationException();
    }
}
