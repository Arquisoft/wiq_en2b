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
    @Schema(example = "eyJhbGciOiJIUzI1NiJ9fasdfatertyrtyJzdWIiOafsdfasDSASFDdfatCI6MTYzNzQwNjQwMfasd6546caytywafsd")
    private String token;

    @JsonProperty("refresh_token")
    @Schema(example = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYzNzQwNjQwMH0.7")
    private String refreshToken;

    @JsonProperty("user_id")
    @Schema(example = "1")
    private Long userId;

    @Schema(example = "username")
    private String username;

    @Schema(example = "example@email.com")
    private String email;

    @Schema(example = "[\"ROLE_USER\"]")
    private List<String> roles;
}
