package lab.en2b.quizapi.auth.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@EqualsAndHashCode
public class JwtResponseDto {
    @Schema(description = "Token returned when login in", example = "eyJhbGciOiJIUzI1NiJ9fasdfatertyrtyJzdWIiOafsdfasDSASFDdfatCI6MTYzNzQwNjQwMfasd6546caytywafsd")
    private String token;

    @JsonProperty("refresh_token")
    @Schema(description = "Refresh token returned when login in", example = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYzNzQwNjQwMH0.7")
    private String refreshToken;

    @JsonProperty("user_id")
    @Schema(description = "Id of the user that just logged in", example = "1")
    private Long userId;

    @Schema(description = "Username of the user that just logged in", example = "username")
    private String username;

    @Schema(description = "Email of the user that just logged in", example = "example@email.com")
    private String email;

    @Schema(description = "Roles for the user that just logged in", example = "[\"ROLE_USER\"]")
    private List<String> roles;
}
