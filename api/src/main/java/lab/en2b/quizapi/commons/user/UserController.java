package lab.en2b.quizapi.commons.user;

import lab.en2b.quizapi.commons.user.dtos.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/details")
    public ResponseEntity<UserResponseDto> getUserDetails(Authentication authentication) {
        return ResponseEntity.ok(userService.getUserDetailsByAuthentication(authentication));
    }

}
