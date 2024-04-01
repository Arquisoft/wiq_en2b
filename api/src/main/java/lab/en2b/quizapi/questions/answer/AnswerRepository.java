package lab.en2b.quizapi.questions.answer;

import lab.en2b.quizapi.questions.question.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer,Long> {

    @Query(value = "SELECT * FROM answers WHERE category=?1 AND language=?2 ORDER BY RANDOM() LIMIT ?3", nativeQuery = true)
    List<Answer> findDistractors(String answerCategory, String lang, int numDistractors);
}
