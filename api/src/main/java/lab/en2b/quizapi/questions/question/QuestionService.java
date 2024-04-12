package lab.en2b.quizapi.questions.question;

import lab.en2b.quizapi.commons.exceptions.InternalApiErrorException;
import lab.en2b.quizapi.game.GameMode;
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
        return questionResponseDtoMapper.apply(findRandomQuestion(lang, GameMode.KIWI_QUEST, null));
    }

    /**
     * Find a random question for the specified language
     * @param language The language to find the question for
     * @return The random question
     */

    public Question findRandomQuestion(String language, GameMode gamemode, List<QuestionCategory> questionCategoriesForCustom) {
        if (language==null || language.isBlank()) {
            language = "en";
        }
        List<QuestionCategory> questionCategories = getQuestionCategoriesForGamemode(gamemode, questionCategoriesForCustom);
        Question q = questionRepository.findRandomQuestion(language,questionCategories);
        if(q==null) {
            throw new InternalApiErrorException("No questions found for the specified language!");
        }
        loadAnswers(q);
        return q;
    }

    private List<QuestionCategory> getQuestionCategoriesForGamemode(GameMode gamemode, List<QuestionCategory> questionCategoriesForCustom) {
        return switch (gamemode) {
            case KIWI_QUEST ->
                    new ArrayList<>(List.of(QuestionCategory.ART, QuestionCategory.MUSIC, QuestionCategory.GEOGRAPHY));
            case FOOTBALL_SHOWDOWN -> new ArrayList<>(List.of(QuestionCategory.SPORTS));
            case GEO_GENIUS -> new ArrayList<>(List.of(QuestionCategory.GEOGRAPHY));
            case VIDEOGAME_ADVENTURE -> new ArrayList<>(List.of(QuestionCategory.VIDEOGAMES));
            case ANCIENT_ODYSSEY -> new ArrayList<>(List.of(QuestionCategory.ART));
            case CUSTOM -> questionCategoriesForCustom;
            default -> new ArrayList<>(List.of(QuestionCategory.values()));
        };
    }

    public QuestionResponseDto getQuestionById(Long id) {
        return questionResponseDtoMapper.apply(questionRepository.findById(id).orElseThrow());
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
