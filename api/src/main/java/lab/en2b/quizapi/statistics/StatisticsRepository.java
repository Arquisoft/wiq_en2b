package lab.en2b.quizapi.statistics;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface StatisticsRepository extends JpaRepository<Statistics, Long> {

    @Query(value = "SELECT * FROM Statistics WHERE user_id = ?1", nativeQuery = true)
    Optional<Statistics> findByUserId(Long userId);

}
