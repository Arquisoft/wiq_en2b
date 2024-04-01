package lab.en2b.quizapi.game;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface GameRepository extends JpaRepository<Game,Long> {

    @Query(value = "SELECT * FROM Games g WHERE id=?1 AND user_id=?2", nativeQuery = true)
    Optional<Game> findByIdForUser(Long gameId, Long userId);
}
