package lab.en2b.quizapi.questions.answer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer,Long> {

    @Query(value = "SELECT a.* FROM answers a WHERE category=?1 AND language=?2 AND a.text<>?3 ORDER BY RANDOM() LIMIT ?4", nativeQuery = true)
    List<Answer> findDistractors(String answerCategory, String lang, String answerTest, int numDistractors);
}
