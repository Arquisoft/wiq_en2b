package lab.en2b.quizapi.statistics;

import lab.en2b.quizapi.commons.user.UserService;
import lab.en2b.quizapi.statistics.dtos.StatisticsResponseDto;
import lab.en2b.quizapi.statistics.mappers.StatisticsResponseDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

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

}
