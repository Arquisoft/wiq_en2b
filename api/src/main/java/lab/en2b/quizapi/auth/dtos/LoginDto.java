package lab.en2b.quizapi.auth.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class LoginDto {
    @NonNull
    private String email;
    @NonNull
    private String password;
}
