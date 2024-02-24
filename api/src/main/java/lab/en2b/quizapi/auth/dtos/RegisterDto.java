package lab.en2b.quizapi.auth.dtos;

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
    private String email;
    @NonNull
    @NotBlank
    private String username;
    @NonNull
    @NotBlank
    private String password;
}
