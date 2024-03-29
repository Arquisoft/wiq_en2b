package lab.en2b.quizapi.commons.utils;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lab.en2b.quizapi.questions.answer.Answer;
import lab.en2b.quizapi.questions.answer.AnswerCategory;
import lab.en2b.quizapi.questions.answer.AnswerRepository;
import lab.en2b.quizapi.questions.question.Question;
import lab.en2b.quizapi.questions.question.QuestionCategory;
import lab.en2b.quizapi.questions.question.QuestionRepository;
import lab.en2b.quizapi.questions.question.QuestionType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
//@Service
public class InsertDataUtils {

    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    /**
     * Method for testing purposes in charge of creating dummy questions
     */
    @PostConstruct
    public void initDummy(){
        //Creation of the questions
        Question q1 = Question.builder()
                .content("What's the capital of Spain?")
                .type(QuestionType.TEXT)
                .questionCategory(QuestionCategory.GEOGRAPHY)
                .language("en")
                .answerCategory(AnswerCategory.CITY)
                .build();

        Question q2 = Question.builder()
                .content("What's the capital of Germany?")
                .type(QuestionType.TEXT)
                .questionCategory(QuestionCategory.GEOGRAPHY)
                .language("en")
                .answerCategory(AnswerCategory.CITY)
                .build();

        Question q3 = Question.builder()
                .content("What's the capital of Italy?")
                .type(QuestionType.TEXT)
                .questionCategory(QuestionCategory.GEOGRAPHY)
                .language("en")
                .answerCategory(AnswerCategory.CITY)
                .build();

        // Creation of the answers
        Answer a1 = new Answer();
        a1.setText("Madrid");
        a1.setCategory(AnswerCategory.CITY);

        Answer a2 = new Answer();
        a2.setText("London");
        a2.setCategory(AnswerCategory.CITY);

        Answer a3 = new Answer();
        a3.setText("Berlin");
        a3.setCategory(AnswerCategory.CITY);

        Answer a4 = new Answer();
        a4.setText("Rome");
        a4.setCategory(AnswerCategory.CITY);

        answerRepository.save(a1);
        answerRepository.save(a2);
        answerRepository.save(a3);
        answerRepository.save(a4);

        List<Answer> answers = new ArrayList<>();
        answers.add(a1);answers.add(a2);answers.add(a3);answers.add(a4);
        q1.setAnswers(answers);q2.setAnswers(answers);q3.setAnswers(answers);
        q1.setCorrectAnswer(a1);
        q2.setCorrectAnswer(a3);
        q3.setCorrectAnswer(a4);


        questionRepository.save(q1);
        questionRepository.save(q2);
        questionRepository.save(q3);

    }

    @PreDestroy
    public void cleanUp(){
        questionRepository.deleteAll();
        answerRepository.deleteAll();
    }

}
