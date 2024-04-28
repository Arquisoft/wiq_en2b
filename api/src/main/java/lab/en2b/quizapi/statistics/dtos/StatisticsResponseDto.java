package lab.en2b.quizapi.statistics.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lab.en2b.quizapi.commons.user.dtos.UserResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@AllArgsConstructor
@Data
@Builder
@EqualsAndHashCode
public class StatisticsResponseDto {

    private Long id;
    private Long right;
    private Long wrong;
    private Long total;
    private UserResponseDto user;
    @JsonProperty("percentage")
    private Long percentage;
    @JsonProperty("points")
    private Long points;
    @JsonProperty("finished_games")
    private Long finishedGames;

}
