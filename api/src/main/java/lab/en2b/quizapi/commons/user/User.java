package lab.en2b.quizapi.commons.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lab.en2b.quizapi.commons.exceptions.TokenRefreshException;
import lab.en2b.quizapi.game.Game;
import lombok.*;

import java.time.Instant;
import java.util.List;

@Entity
@Table(	name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "email"),
                @UniqueConstraint(columnNames = "username")
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
    private String username;

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
    @JsonProperty("role")
    private String role;

    @OneToMany(mappedBy = "user")
    private List<Game> games;

    public String obtainRefreshIfValid() {
        if(getRefreshExpiration() == null || getRefreshExpiration().compareTo(Instant.now()) < 0){
            throw new TokenRefreshException( "Invalid refresh token. Please make a new login request");
        }
        return getRefreshToken();
    }
}
