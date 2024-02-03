package lab.en2b.quizapi.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lab.en2b.quizapi.user.role.Role;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(	name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "email"),
                @UniqueConstraint(columnNames = "name")
        })
@RequiredArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    @NotBlank
    @Size(max=255)
    @NonNull
    private String name;

    @NotBlank
    @Size(max = 255)
    @Email
    @NonNull
    private String email;

    @NotBlank
    @Size(max = 255)
    @NonNull
    private String password;

    @Column(name = "refresh_token",unique = true)
    @Size(max = 255)
    private String refreshToken;

    @Column(name="refresh_expiration")
    private Instant refreshExpiration;

    @NotNull
    @ManyToMany
    @JoinTable(name="users_roles",
            joinColumns=
            @JoinColumn(name="user_id", referencedColumnName="id"),
            inverseJoinColumns=
            @JoinColumn(name="role_id", referencedColumnName="id")
    )
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "permissions"})
    @JsonProperty("role")
    private Set<Role> roles;
}
