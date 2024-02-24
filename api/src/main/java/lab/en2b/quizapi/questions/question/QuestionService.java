package lab.en2b.quizapi.questions.question;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuestionService {
    public List<Question> getQuestions() {
        return new ArrayList<>();
    }
}
