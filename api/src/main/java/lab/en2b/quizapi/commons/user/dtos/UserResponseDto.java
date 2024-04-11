package lab.en2b.quizapi.commons.user.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
@AllArgsConstructor
@Data
@Builder
@EqualsAndHashCode
public class UserResponseDto {
    @Schema(description = "Identification for an user", example = "123456789")
    private Long id;
    @Schema(description = "Username for a game", example = "HordyJurtado")
    private String username;
    @Schema(description = "Email for a game", example = "chipiChipi@chapaChapa.es")
    private String email;
}
