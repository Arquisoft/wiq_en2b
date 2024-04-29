package lab.en2b.quizapi.auth.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
    @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
    @Schema(description = "Username used for registering", example = "example user" )
    private String username;
    @NonNull
    @NotBlank
    @Size(min = 6, max = 20, message = "Password must be between 6 and 20 characters")
    @Schema(description = "Password used for registering", example = "password" )
    private String password;
}
