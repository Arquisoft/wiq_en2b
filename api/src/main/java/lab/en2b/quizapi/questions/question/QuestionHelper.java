package lab.en2b.quizapi.questions.question;

import lab.en2b.quizapi.questions.answer.Answer;
import lab.en2b.quizapi.questions.answer.AnswerCategory;
import lab.en2b.quizapi.questions.answer.AnswerRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


@Component
public class QuestionHelper {

    public static String loadQuestionContent(Answer correctAnswer){
        AnswerCategory cat = correctAnswer.getCategory();
        String ans = correctAnswer.getText();
        String language = correctAnswer.getLanguage();


        switch (cat){
            case CAPITAL_CITY:
                if (language.equals("es")){
                    return  "¿Cuál es la capital de " + ans + "?";
                }
                return "What's the capital of " + ans + "?";
            case COUNTRY:
                // Implement more cases
        }

        throw new UnsupportedOperationException("The answer category is not supported yet.");
    }

    public static List<Answer> getDistractors(AnswerRepository answerRepository, Question question){
        List<Answer> distractors = new ArrayList<>();

        AnswerCategory cat = question.getAnswerCategory();
        switch (cat){ // Write the case only for the exceptions
            case COUNTRY:
                // Implement more cases
                break;
            default:
                distractors = answerRepository.findDistractors(cat.toString(), question.getLanguage(), 1);
        }

        return distractors;
    }
}
