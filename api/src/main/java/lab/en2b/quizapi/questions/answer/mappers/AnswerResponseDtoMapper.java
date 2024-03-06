package lab.en2b.quizapi.questions.answer.mappers;

import lab.en2b.quizapi.questions.answer.Answer;
import lab.en2b.quizapi.questions.answer.dtos.AnswerResponseDto;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class AnswerResponseDtoMapper implements Function<Answer, AnswerResponseDto> {
    @Override
    public AnswerResponseDto apply(Answer answer) {
        return AnswerResponseDto.builder()
                .id(answer.getId())
                .text(answer.getText())
                .category(answer.getCategory())
                .build();
    }
}
