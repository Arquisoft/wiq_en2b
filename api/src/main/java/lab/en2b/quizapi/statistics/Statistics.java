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

    private Long right;
    private Long wrong;
    private Long total;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "user_id")
    private User user;

    public Long getCorrectRate() {
        return (right * 100) / total;
    }

    public void updateStatistics(Statistics statistics){
        this.right += statistics.getRight();
        this.wrong += statistics.getWrong();
        this.total += statistics.getTotal();
    }

}
