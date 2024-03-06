package lab.en2b.quizapi.auth.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class RefreshTokenResponseDto {

    private String token;
    @JsonProperty("refresh_token")
    private String refreshToken;
}
