package lab.en2b.quizapi.commons.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lab.en2b.quizapi.commons.user.dtos.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * Gets the user details for the given authentication
     * Returns 200 if the user details are successfully retrieved
     * Returns 403 if the user is not logged in
     * @param authentication the authentication object
     * @return the response dto for the user details
     */
    @Operation(summary = "Gets the user details", description = "Gets the user details for the given authentication")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "403", description = "You are not logged in", content = @io.swagger.v3.oas.annotations.media.Content),
    })
    @GetMapping("/details")
    public ResponseEntity<UserResponseDto> getUserDetails(Authentication authentication) {
        return ResponseEntity.ok(userService.getUserDetailsByAuthentication(authentication));
    }

    @Operation(summary = "Gets all users", description = "Gets all users")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
    })
    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @Operation(summary = "Gets a user", description = "Gets a user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
    })
    @Parameters({
            @Parameter(name = "id", description = "The id of the user to get", example = "1")
    })
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUser(id));
    }

}
