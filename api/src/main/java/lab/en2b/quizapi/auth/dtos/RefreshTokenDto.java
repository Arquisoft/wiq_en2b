package lab.en2b.quizapi.auth.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RefreshTokenDto {
    @NonNull
    @JsonProperty("refresh_token")
    private String refreshToken;
}
