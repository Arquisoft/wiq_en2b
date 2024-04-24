package lab.en2b.quizapi.questions.question;

import lab.en2b.quizapi.questions.answer.Answer;
import lab.en2b.quizapi.questions.answer.AnswerCategory;
import lab.en2b.quizapi.questions.answer.AnswerRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


@Component
public class QuestionHelper {

    private static final int MAX_DISTRACTORS = 3;

    public static List<Answer> getDistractors(AnswerRepository answerRepository, Question question){
        return answerRepository.findDistractors(question.getAnswerCategory().toString(), question.getLanguage(), question.getCorrectAnswer().getText(), MAX_DISTRACTORS);
    }
}
