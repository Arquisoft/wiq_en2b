package lab.en2b.quizapi.statistics.mappers;

import lab.en2b.quizapi.commons.user.mappers.UserResponseDtoMapper;
import lab.en2b.quizapi.statistics.Statistics;
import lab.en2b.quizapi.statistics.dtos.StatisticsResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class StatisticsResponseDtoMapper implements Function<Statistics, StatisticsResponseDto> {

    private final UserResponseDtoMapper userResponseDtoMapper;

    @Override
    public StatisticsResponseDto apply(Statistics statistics) {
        return StatisticsResponseDto.builder()
                .id(statistics.getId())
                .right(statistics.getCorrect())
                .wrong(statistics.getWrong())
                .total(statistics.getTotal())
                .percentage(statistics.getCorrectRate())
                .user(userResponseDtoMapper.apply(statistics.getUser()))
                .points(statistics.getCorrectRate() * statistics.getCorrect() )
                .finishedGames(statistics.getFinishedGames())
                .build();
    }
}
