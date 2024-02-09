package lab.en2b.quizapi.commons.user.role;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lab.en2b.quizapi.commons.user.User;
import lombok.*;

import java.util.Set;

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

    @ManyToMany(mappedBy ="roles")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "roles"})
    private Set<User> users;
}
