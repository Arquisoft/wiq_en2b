package lab.en2b.quizapi.auth.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RegisterDto {
    @NotBlank
    @NonNull
    @Email
    @Schema(description = "Email used for registering", example = "example@email.com" )
    private String email;
    @NonNull
    @NotBlank
    @Schema(description = "Username used for registering", example = "example user" )
    private String username;
    @NonNull
    @NotBlank
    @Schema(description = "Password used for registering", example = "password" )
    private String password;
}
