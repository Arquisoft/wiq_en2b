package lab.en2b.quizapi.commons.exceptions;

public class InvalidAuthenticationException extends RuntimeException{
    public InvalidAuthenticationException(String message) {
        super(message);
    }
}
