package lab.en2b.quizapi.user.role;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = "roles")
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    @NonNull
    @NotBlank
    @Size(max=255)
    private String name;
}
