package lab.en2b.quizapi.questions.question;

import lab.en2b.quizapi.questions.answer.dtos.AnswerDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    public List<Question> getQuestions() {
        return questionRepository.findAll();
    }

    public String answerQuestion(Long id, AnswerDto answerDto) {
        Question question = questionRepository.findById(id).orElseThrow();
        if(question.getAnswers().stream().filter(i -> i.getId().equals(answerDto.getAnswerId())).findFirst().isPresent()){
            return "Correct!";
        }
        else{
            return "Wrong!";
        }
    }

    public Question getQuestion() {
        return null;
    }
}
