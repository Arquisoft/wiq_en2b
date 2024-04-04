package lab.en2b.quizapi.statistics;

import lab.en2b.quizapi.commons.user.UserService;
import lab.en2b.quizapi.statistics.dtos.StatisticsResponseDto;
import lab.en2b.quizapi.statistics.mappers.StatisticsResponseDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

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
        List<Statistics> all = statisticsRepository.findAll();
        all.sort((o1, o2) -> Math.toIntExact(o2.getCorrectRate() - o1.getCorrectRate()));
        List<Statistics> topTen = all.subList(0, Math.min(10, all.size()));
        return topTen.stream().map(statisticsResponseDtoMapper::apply).collect(Collectors.toList());
    }

}
