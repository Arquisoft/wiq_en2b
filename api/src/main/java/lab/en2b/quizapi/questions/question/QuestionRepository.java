package lab.en2b.quizapi.questions.question;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface QuestionRepository extends JpaRepository<Question,Long> {
    @Query(value = "SELECT q.* FROM questions q INNER JOIN answers a ON q.correct_answer_id=a.id WHERE a.language = ?1 ORDER BY RANDOM() LIMIT 1", nativeQuery = true)
    Question findRandomQuestion(String lang);
}
