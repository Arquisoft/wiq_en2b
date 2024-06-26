package lab.en2b.quizapi.statistics;

import lab.en2b.quizapi.commons.user.User;
import lab.en2b.quizapi.commons.user.UserService;
import lab.en2b.quizapi.game.GameRepository;
import lab.en2b.quizapi.statistics.dtos.StatisticsResponseDto;
import lab.en2b.quizapi.statistics.mappers.StatisticsResponseDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatisticsService {

    private final StatisticsRepository statisticsRepository;
    private final UserService userService;
    private final StatisticsResponseDtoMapper statisticsResponseDtoMapper;
    private final GameRepository gameRepository;

    /**
     * Updates the statistics for a user. If no statistics are found for the user, they are created.
     * @param authentication the user to get the statistics for
     * @return the retrieved or created statistics
     */
    public StatisticsResponseDto getStatisticsForUser(Authentication authentication){
        User user = userService.getUserByAuthentication(authentication);
        Optional<Statistics> statistics = statisticsRepository.findByUserId(user.getId());

        if (statistics.isEmpty()){
            return statisticsResponseDtoMapper.apply(statisticsRepository.save(Statistics.builder()
                    .user(user)
                    .correct(0L)
                    .wrong(0L)
                    .total(0L)
                    .finishedGames(gameRepository.countFinishedGamesForUser(user.getId()))
                    .build()));
        }

        return statisticsResponseDtoMapper.apply(statistics.get());
    }

    public List<StatisticsResponseDto> getTopTenStatistics(){
        return statisticsRepository.findTopTen().stream().map(statisticsResponseDtoMapper).collect(Collectors.toList());
    }

}
