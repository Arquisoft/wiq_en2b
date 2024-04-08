package lab.en2b.quizapi.commons.exceptions;

public class InternalApiErrorException extends RuntimeException{
    public InternalApiErrorException(String message) {
        super(message);
    }
}
