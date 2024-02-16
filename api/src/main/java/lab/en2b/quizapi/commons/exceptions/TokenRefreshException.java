package lab.en2b.quizapi.commons.exceptions;

public class TokenRefreshException extends RuntimeException{
    public TokenRefreshException(String message) {
        super(message);
    }
}
