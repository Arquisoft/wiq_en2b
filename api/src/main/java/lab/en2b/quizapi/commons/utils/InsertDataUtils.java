package lab.en2b.quizapi.commons.utils;

import jakarta.annotation.PostConstruct;
import lab.en2b.quizapi.questions.answer.Answer;
import lab.en2b.quizapi.questions.answer.AnswerCategory;
import lab.en2b.quizapi.questions.question.Question;
import lab.en2b.quizapi.questions.question.QuestionCategory;
import lab.en2b.quizapi.questions.question.QuestionRepository;
import lab.en2b.quizapi.questions.question.QuestionType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class InsertDataUtils {

    private final QuestionRepository questionRepository;

    /**
     * Method for testing purposes in charge of creating dummy questions
     */
    @PostConstruct
    public void initDummy(){
        //Creation of the questions
        Question q1 = new Question();
        q1.setContent("What's the capital of Spain?");
        q1.setType(QuestionType.TEXT);
        q1.setQuestionCategory(QuestionCategory.GEOGRAPHY);
        q1.setLanguage("en");
        q1.setAnswerCategory(AnswerCategory.CITY);

        Question q2 = new Question();
        q2.setContent("What's the capital of Germany");
        q2.setType(QuestionType.TEXT);
        q2.setQuestionCategory(QuestionCategory.GEOGRAPHY);
        q2.setLanguage("en");
        q2.setAnswerCategory(AnswerCategory.CITY);

        Question q3 = new Question();
        q3.setContent("What's the capital of Italy");
        q3.setType(QuestionType.TEXT);
        q3.setQuestionCategory(QuestionCategory.GEOGRAPHY);
        q3.setLanguage("en");
        q3.setAnswerCategory(AnswerCategory.CITY);

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

        //Relating questions and answers
        List<Question> questions = new ArrayList<>();
        questions.add(q1);questions.add(q2);questions.add(q3);
        a1.setQuestionsWithThisAnswer(questions);
        a2.setQuestionsWithThisAnswer(questions);
        a3.setQuestionsWithThisAnswer(questions);
        a4.setQuestionsWithThisAnswer(questions);
        questions = new ArrayList<>();
        questions.add(q1);
        a1.setQuestions(questions);
        questions = new ArrayList<>();
        questions.add(q2);
        a3.setQuestions(questions);
        questions = new ArrayList<>();
        questions.add(q3);
        a4.setQuestions(questions);

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

}
