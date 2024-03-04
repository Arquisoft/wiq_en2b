package lab.en2b.quizapi.commons.exceptions;

import java.util.NoSuchElementException;

import lombok.extern.log4j.Log4j2;
import org.springframework.core.annotation.Order;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@Log4j2
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CustomControllerAdvice extends ResponseEntityExceptionHandler {
    @ExceptionHandler(InvalidAuthenticationException.class)
    public ResponseEntity<String> handleInvalidAuthenticationException(InvalidAuthenticationException exception){
        log.error(exception.getMessage(),exception);
        return new ResponseEntity<>(exception.getMessage(),HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String> handleNoSuchElementException(NoSuchElementException exception){
        log.error(exception.getMessage(),exception);
        return new ResponseEntity<>(exception.getMessage(),HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException exception){
        log.error(exception.getMessage(),exception);
        return new ResponseEntity<>(exception.getMessage(),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> handleBadCredentialsException(BadCredentialsException exception){
        log.error(exception.getMessage(),exception);
        return new ResponseEntity<>(exception.getMessage(),HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<String> handleAccessDeniedException(AccessDeniedException exception){
        log.error(exception.getMessage(),exception);
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(TokenRefreshException.class)
    public ResponseEntity<String> handleTokenRefreshException(TokenRefreshException exception) {
        log.error(exception.getMessage(),exception);
        return new ResponseEntity<>(exception.getMessage(),HttpStatus.FORBIDDEN);
    }
    @ExceptionHandler(InternalAuthenticationServiceException.class)
    public ResponseEntity<String> handleInternalAuthenticationServiceException(InternalAuthenticationServiceException exception) {
        log.error(exception.getMessage(),exception);
        return new ResponseEntity<>(exception.getMessage(),HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception exception){
        log.error(exception.getMessage(),exception);
        return new ResponseEntity<>(exception.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
