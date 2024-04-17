package lab.en2b.quizapi.statistics;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lab.en2b.quizapi.commons.user.User;
import lombok.*;

@Entity
@Table(name = "statistics")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Statistics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    @NonNull
    private Long correct;
    @NonNull
    private Long wrong;
    @NonNull
    private Long total;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "user_id")
    private User user;

    @NonNull
    private Long finishedGames;

    public Long getCorrectRate() {
        if(total == 0){
            return 0L;
        }
        return (correct * 100) / total;
    }

    public void updateStatistics(Long correct, Long wrong, Long total){
        this.correct += correct;
        this.wrong += wrong;
        this.total += total;
    }

}
