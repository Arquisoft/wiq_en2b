package lab.en2b.quizapi.questions.question;

import lab.en2b.quizapi.questions.answer.dtos.AnswerDto;
import lab.en2b.quizapi.questions.question.dtos.QuestionResponseDto;
import lab.en2b.quizapi.questions.question.mappers.QuestionResponseDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final QuestionResponseDtoMapper questionResponseDtoMapper;
    public List<QuestionResponseDto> getQuestions() {
        return questionRepository.findAll().stream().map(questionResponseDtoMapper).toList();
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
