package lab.en2b.quizapi.statistics;

import ch.qos.logback.core.util.TimeUtil;
import lab.en2b.quizapi.commons.user.User;
import lab.en2b.quizapi.commons.user.UserResponseDto;
import lab.en2b.quizapi.commons.user.UserService;
import lab.en2b.quizapi.statistics.dtos.StatisticsResponseDto;
import lab.en2b.quizapi.statistics.mappers.StatisticsResponseDtoMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith({MockitoExtension.class, SpringExtension.class})
public class StatisticsServiceTest {

    @InjectMocks
    private StatisticsService statisticsService;

    @Mock
    private UserService userService;

    @Mock
    private StatisticsRepository statisticsRepository;

    @Mock
    private Authentication authentication;

    @Mock
    private StatisticsResponseDtoMapper statisticsResponseDtoMapper;

    private User defaultUser;

    private Statistics defaultStatistics1;

    private StatisticsResponseDto defaultStatisticsResponseDto1;

    private StatisticsResponseDto defaultStatisticsResponseDto2;

    private Statistics defaultStatistics2;

    private UserResponseDto defaultUserResponseDto;

    @BeforeEach
    public void setUp(){
        this.statisticsService = new StatisticsService(statisticsRepository, userService, statisticsResponseDtoMapper);
        this.defaultUser = User.builder()
                .id(1L)
                .email("test@email.com")
                .username("test")
                .role("user")
                .password("password")
                .refreshToken("token")
                .refreshExpiration(Instant.ofEpochSecond(TimeUtil.computeStartOfNextSecond(System.currentTimeMillis()+ 1000)))
                .build();

        this.defaultUserResponseDto = UserResponseDto.builder()
                .id(1L)
                .email("test")
                .username("test")
                .build();

        this.defaultStatistics1 = Statistics.builder()
                .id(1L)
                .user(defaultUser)
                .right(5L)
                .wrong(5L)
                .total(10L)
                .build();

        this.defaultStatisticsResponseDto1 = StatisticsResponseDto.builder()
                .id(1L)
                .right(5L)
                .wrong(5L)
                .total(10L)
                .correctRate(50L)
                .user(defaultUserResponseDto)
                .build();

        this.defaultStatistics2 = Statistics.builder()
                .id(1L)
                .user(defaultUser)
                .right(7L)
                .wrong(3L)
                .total(10L)
                .build();

        this.defaultStatisticsResponseDto2 = StatisticsResponseDto.builder()
                .id(1L)
                .right(7L)
                .wrong(3L)
                .total(10L)
                .correctRate(70L)
                .user(defaultUserResponseDto)
                .build();
    }

    @Test
    public void getStatisticsForUserTest(){
        Authentication authentication = mock(Authentication.class);
        when(userService.getUserByAuthentication(any())).thenReturn(defaultUser);
        when(statisticsRepository.findByUserId(any())).thenReturn(Optional.of(defaultStatistics1));
        when(statisticsResponseDtoMapper.apply(any())).thenReturn(defaultStatisticsResponseDto1);
        StatisticsResponseDto result = statisticsService.getStatisticsForUser(authentication);
        Assertions.assertEquals(defaultStatisticsResponseDto1, result);
    }

    /*@Test
    public void getTopTenStatisticsTestWhenThereAreNotTen(){
        when(statisticsRepository.findAll()).thenReturn(List.of(defaultStatistics2, defaultStatistics1));
        when(statisticsResponseDtoMapper.apply(any())).thenReturn(defaultStatisticsResponseDto1);
        when(statisticsResponseDtoMapper.apply(any())).thenReturn(defaultStatisticsResponseDto2);
        when(statisticsResponseDtoMapper.apply(any())).thenReturn(defaultStatisticsResponseDto1);
        List<StatisticsResponseDto> result = statisticsService.getTopTenStatistics();
        Assertions.assertEquals(List.of(defaultStatisticsResponseDto2,defaultStatisticsResponseDto1), result);
    }*/

}
