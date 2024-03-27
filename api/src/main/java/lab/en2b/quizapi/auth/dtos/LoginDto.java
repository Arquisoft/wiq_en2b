package lab.en2b.quizapi.auth.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class LoginDto {
    @NonNull
    @NotBlank
    @Email
    @Schema(example = "example@email.com")
    private String email;

    @NonNull
    @NotBlank
    @Schema(example = "password")
    private String password;
}
