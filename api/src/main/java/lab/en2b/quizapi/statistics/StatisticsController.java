package lab.en2b.quizapi.statistics;

import lab.en2b.quizapi.statistics.dtos.StatisticsResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/statistics")
@RequiredArgsConstructor
public class StatisticsController {

    private final StatisticsService statisticsService;

    @GetMapping("/personal")
    public ResponseEntity<StatisticsResponseDto> getPersonalStatistics(Authentication authentication){
        return ResponseEntity.ok(statisticsService.getStatisticsForUser(authentication));
    }

}
