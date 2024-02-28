package lab.en2b.quizapi.auth.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RegisterDto {
    @NonNull
    private String email;
    @NonNull
    private String username;
    @NonNull
    private String password;
}