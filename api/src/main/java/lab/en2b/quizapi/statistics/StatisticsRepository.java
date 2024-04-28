package lab.en2b.quizapi.statistics;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.List;

public interface StatisticsRepository extends JpaRepository<Statistics, Long> {

    @Query(value = "SELECT * FROM Statistics WHERE user_id = ?1", nativeQuery = true)
    Optional<Statistics> findByUserId(Long userId);

    //Query that gets the top ten ordered by statistics -> statistics.getCorrectRate() * statistics.getTotal() / 9L
    @Query(value = "SELECT *, \n" +
            "       CASE \n" +
            "           WHEN total = 0 THEN 0 \n" +
            "           ELSE (correct * 100.0 / NULLIF(total, 0)) * correct \n" +
            "       END AS points \n" +
            "FROM Statistics \n" +
            "ORDER BY points DESC LIMIT 10 ", nativeQuery = true)
    List<Statistics> findTopTen();

}
