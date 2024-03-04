package lab.en2b.quizapi.questions.question.mappers;

import lab.en2b.quizapi.questions.answer.mappers.AnswerResponseDtoMapper;
import lab.en2b.quizapi.questions.question.Question;
import lab.en2b.quizapi.questions.question.dtos.QuestionResponseDto;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class QuestionResponseDtoMapper implements Function<Question, QuestionResponseDto> {

    @Override
    public QuestionResponseDto apply(Question question) {
        return QuestionResponseDto.builder()
                .id(question.getId())
                .content(question.getContent())
                .type(question.getType())
                .answerCategory(question.getAnswerCategory())
                .answers(question.getAnswers().stream().map(new AnswerResponseDtoMapper()).toList())
                .language(question.getLanguage())
                .questionCategory(question.getQuestionCategory())
                .build();
    }
}
