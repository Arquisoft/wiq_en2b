package lab.en2b.quizapi.questions.question;

import jakarta.annotation.PostConstruct;
import lab.en2b.quizapi.questions.answer.Answer;
import lab.en2b.quizapi.questions.answer.AnswerCategory;
import lab.en2b.quizapi.questions.answer.dtos.AnswerDto;
import lab.en2b.quizapi.questions.question.dtos.AnswerCheckResponseDto;
import lab.en2b.quizapi.questions.question.dtos.QuestionResponseDto;
import lab.en2b.quizapi.questions.question.mappers.QuestionResponseDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final QuestionResponseDtoMapper questionResponseDtoMapper;

    /**
     * Method for testing purposes in charge of creating dummy questions
     */
    @PostConstruct
    public void initDummy(){
        //
        Question q1 = new Question();
        q1.setContent("What's the capital of Spain?");
        q1.setType(QuestionType.TEXT);
        q1.setLanguage("en");
        q1.setAnswerCategory(AnswerCategory.CITY);

        Question q2 = new Question();
        q2.setContent("What's the capital of Germany");
        q2.setType(QuestionType.TEXT);
        q2.setLanguage("en");
        q2.setAnswerCategory(AnswerCategory.CITY);

        Question q3 = new Question();
        q2.setContent("What's the capital of Italy");
        q2.setType(QuestionType.TEXT);
        q2.setLanguage("en");
        q2.setAnswerCategory(AnswerCategory.CITY);

        List<Answer> answers = new ArrayList<>();
        Answer a1 = new Answer();
        a1.setText("Madrid");
        a1.setCategory(AnswerCategory.CITY);

    }

    public List<QuestionResponseDto> getQuestions() {
        return questionRepository.findAll().stream().map(questionResponseDtoMapper).toList();
    }

    public AnswerCheckResponseDto answerQuestion(Long id, AnswerDto answerDto) {
        Question question = questionRepository.findById(id).orElseThrow();
        if(question.getCorrectAnswer().getId().equals(answerDto.getAnswerId())){
            return new AnswerCheckResponseDto(true);
        }
        else if(question.getAnswers().stream().noneMatch(i -> i.getId().equals(answerDto.getAnswerId()))){
            throw new IllegalArgumentException("The answer you provided is not one of the options");
        }
        else {
            return new AnswerCheckResponseDto(false);
        }
    }

    public QuestionResponseDto getQuestion() {
        return questionResponseDtoMapper.apply(questionRepository.findRandomQuestion());
    }

    public QuestionResponseDto getQuestionById(Long id) {
        return questionResponseDtoMapper.apply(questionRepository.findById(id).orElseThrow());
    }
}
