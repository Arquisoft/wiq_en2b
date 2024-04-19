package lab.en2b.quizapi.questions.question;

import lab.en2b.quizapi.commons.exceptions.InternalApiErrorException;
import lab.en2b.quizapi.questions.answer.Answer;
import lab.en2b.quizapi.questions.answer.AnswerRepository;
import lab.en2b.quizapi.questions.answer.dtos.AnswerDto;
import lab.en2b.quizapi.questions.question.dtos.AnswerCheckResponseDto;
import lab.en2b.quizapi.questions.question.dtos.QuestionResponseDto;
import lab.en2b.quizapi.questions.question.mappers.QuestionResponseDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final QuestionResponseDtoMapper questionResponseDtoMapper;

    /**
     * Answer a question
     * @param id The id of the question
     * @param answerDto The answer dto
     * @return The response dto
     */
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
        return questionResponseDtoMapper.apply(findRandomQuestion(lang, List.of(QuestionCategory.values())));
    }

    /**
     * Find a random question for the specified language
     * @param language The language to find the question for
     * @return The random question
     */

    public Question findRandomQuestion(String language, List<QuestionCategory> questionCategoriesForCustom) {
        if (language==null || language.isBlank()) {
            language = "en";
        }
        Question q = questionRepository.findRandomQuestion(language,questionCategoriesForCustom.stream().map(Enum::toString).toList());
        if(q==null) {
            throw new InternalApiErrorException("No questions found for the specified language!");
        }
        loadAnswers(q);
        return q;
    }

    public QuestionResponseDto getQuestionById(Long id) {
        Question q = questionRepository.findById(id).orElseThrow();
        loadAnswers(q);
        return questionResponseDtoMapper.apply(q);
    }

    /**
     * Get a list of questions with a page
     * @param page The page number
     * @return the list of questions
     */
    public List<QuestionResponseDto> getQuestionsWithPage(Long page){
        if (page < 1)
            throw new IllegalArgumentException("Invalid page number");
        List<QuestionResponseDto> result = questionRepository.findAll().stream()
                .map(questionResponseDtoMapper).toList();
        return getPage(result, page);
    }

    private List<QuestionResponseDto> getPage(List<QuestionResponseDto> result, Long page) {
        try{
            int QUESTION_PAGE_SIZE = 100;
            int startIndex = Math.toIntExact((page-1)* QUESTION_PAGE_SIZE);
            if(startIndex > result.size())
                throw new IllegalArgumentException("Invalid page number, maximum page is "+(result.size()/ QUESTION_PAGE_SIZE +1) + " and you requested page "+page);
            if (result.size() < page* QUESTION_PAGE_SIZE)
                return result.subList(startIndex,result.size());
            return result.subList(startIndex, Math.toIntExact(page* QUESTION_PAGE_SIZE));
        } catch (ArithmeticException e) {
            throw new IllegalArgumentException("Invalid page number");
        }

    }

    /**
     * Load the answers for a question (The distractors and the correct one)
     * @param question The question to load the answers for
     */
    //TODO: CHAPUZAS, FIXEAR ESTO
    private void loadAnswers(Question question) {
        // Create the new answers list with the distractors
        if(question.getAnswers().size() > 1) {
            return;
        }
        List<Answer> answers = new ArrayList<>(QuestionHelper.getDistractors(answerRepository, question));
        // Add the correct
        answers.add(question.getCorrectAnswer());

        // Shuffle the answers
        Collections.shuffle(answers);

        question.setAnswers(answers);
        questionRepository.save(question);
    }

}
