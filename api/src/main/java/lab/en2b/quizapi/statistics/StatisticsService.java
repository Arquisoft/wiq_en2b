package lab.en2b.quizapi.statistics;

import lab.en2b.quizapi.commons.user.UserService;
import lab.en2b.quizapi.statistics.dtos.StatisticsResponseDto;
import lab.en2b.quizapi.statistics.mappers.StatisticsResponseDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatisticsService {

    private final StatisticsRepository statisticsRepository;
    private final UserService userService;
    private final StatisticsResponseDtoMapper statisticsResponseDtoMapper;

    public StatisticsResponseDto getStatisticsForUser(Authentication authentication){
        return statisticsResponseDtoMapper.apply(statisticsRepository.findByUserId(userService.
                getUserByAuthentication(authentication).getId()).orElseThrow());
    }

    public List<StatisticsResponseDto> getTopTenStatistics(){
        List<Statistics> all = new ArrayList<>(statisticsRepository.findAll());
        all.sort(Comparator.comparing(Statistics::getCorrectRate).reversed());
        List<Statistics> topTen = all.stream().limit(10).collect(Collectors.toList());
        return topTen.stream().map(statisticsResponseDtoMapper).collect(Collectors.toList());
    }

}
