package lab.en2b.quizapi.questions.question;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    public List<Question> getQuestions() {
        return questionRepository.findAll();
    }
}
