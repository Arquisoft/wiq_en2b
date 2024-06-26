package lab.en2b.quizapi.questions.question;

import lab.en2b.quizapi.questions.answer.Answer;
import lab.en2b.quizapi.questions.answer.AnswerCategory;
import lab.en2b.quizapi.questions.answer.AnswerRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


@Component
public class QuestionHelper {

    private QuestionHelper(){} // To hide the implicit public constructor as this is static only

    public static List<Answer> getDistractors(AnswerRepository answerRepository, Question question){
        return answerRepository.findDistractors(question.getAnswerCategory().toString(), question.getLanguage(), question.getCorrectAnswer().getText(), 3);
    }
}
