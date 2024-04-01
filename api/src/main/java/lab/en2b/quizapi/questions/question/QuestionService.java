package lab.en2b.quizapi.questions.question;

import jakarta.annotation.PostConstruct;
import lab.en2b.quizapi.questions.answer.Answer;
import lab.en2b.quizapi.questions.answer.AnswerCategory;
import lab.en2b.quizapi.questions.answer.AnswerRepository;
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

    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final QuestionResponseDtoMapper questionResponseDtoMapper;

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

    public QuestionResponseDto getRandomQuestion(String lang) {
        if (lang==null || lang.isBlank()) {
            lang = "en";
        }
        Question q = questionRepository.findRandomQuestion(lang);
        loadAnswers(q);

        return questionResponseDtoMapper.apply(q);
    }

    public QuestionResponseDto getQuestionById(Long id) {
        return questionResponseDtoMapper.apply(questionRepository.findById(id).orElseThrow());
    }

    /**
     * Load the answers for a question (The distractors and the correct one)
     * @param question The question to load the answers for
     */
    public void loadAnswers(Question question) {
        // Create the new answers list with the distractors
        List<Answer> answers = new ArrayList<>(QuestionHelper.getDistractors(answerRepository, question));

        // Add the correct answer in a random position
        int randomIndex = (int) (Math.random() * (answers.size() + 1));
        answers.add(randomIndex, question.getCorrectAnswer());

        question.setAnswers(answers);
    }
}
