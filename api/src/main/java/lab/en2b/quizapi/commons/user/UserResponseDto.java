package lab.en2b.quizapi.commons.user;

import lombok.*;
@AllArgsConstructor
@Data
@Builder
@EqualsAndHashCode
public class UserResponseDto {
    private Long id;
    private String username;
    private String email;
}
