package lab.en2b.quizapi.auth.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class RefreshTokenResponseDto {

    @Schema(example = "eyJhbGciOiJIUzI1NiJ9fasdfatertyrtyJzdWIiOafsdfasDSASFDdfatCI6MTYzNzQwNjQwMfasd6546caytywafsd")
    private String token;

    @JsonProperty("refresh_token")
    @Schema(example = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYzNzQwNjQwMH0.7")
    private String refreshToken;
}
