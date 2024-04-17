package lab.en2b.quizapi.statistics;

import ch.qos.logback.core.util.TimeUtil;
import lab.en2b.quizapi.commons.user.User;
import lab.en2b.quizapi.commons.user.dtos.UserResponseDto;
import lab.en2b.quizapi.commons.user.UserService;
import lab.en2b.quizapi.game.GameRepository;
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

    @Mock
    private GameRepository gameRepository;

    private User defaultUser;

    private Statistics defaultStatistics1;

    private StatisticsResponseDto defaultStatisticsResponseDto1;

    private StatisticsResponseDto defaultStatisticsResponseDto2;

    private Statistics defaultStatistics2;

    private UserResponseDto defaultUserResponseDto;

    @BeforeEach
    public void setUp(){
        this.statisticsService = new StatisticsService(statisticsRepository, userService, statisticsResponseDtoMapper, gameRepository);
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
                .correct(5L)
                .wrong(5L)
                .total(10L)
                .finishedGames(1L)
                .build();

        this.defaultStatisticsResponseDto1 = StatisticsResponseDto.builder()
                .id(1L)
                .right(5L)
                .wrong(5L)
                .total(10L)
                .correctRate(50L)
                .user(defaultUserResponseDto)
                .finishedGames(1L)
                .build();

        this.defaultStatistics2 = Statistics.builder()
                .id(1L)
                .user(defaultUser)
                .correct(7L)
                .wrong(3L)
                .total(10L)
                .finishedGames(1L)
                .build();

        this.defaultStatisticsResponseDto2 = StatisticsResponseDto.builder()
                .id(1L)
                .right(7L)
                .wrong(3L)
                .total(10L)
                .correctRate(70L)
                .user(defaultUserResponseDto)
                .finishedGames(1L)
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

    @Test
    public void getTopTenStatisticsTestWhenThereAreNotTen(){
        when(statisticsRepository.findAll()).thenReturn(List.of(defaultStatistics2, defaultStatistics1));
        when(statisticsResponseDtoMapper.apply(defaultStatistics1)).thenReturn(defaultStatisticsResponseDto1);
        when(statisticsResponseDtoMapper.apply(defaultStatistics2)).thenReturn(defaultStatisticsResponseDto2);
        List<StatisticsResponseDto> result = statisticsService.getTopTenStatistics();
        Assertions.assertEquals(List.of(defaultStatisticsResponseDto2,defaultStatisticsResponseDto1), result);
    }

    @Test
    public void getTopTenStatisticsTestWhenThereAreNotTenAndAreEqual(){
        Statistics defaultStatistics3 = Statistics.builder()
                .id(2L)
                .user(defaultUser)
                .correct(5L)
                .wrong(5L)
                .total(10L)
                .finishedGames(1L)
                .build();
        StatisticsResponseDto defaultStatisticsResponseDto3 = StatisticsResponseDto.builder()
                .id(2L)
                .right(5L)
                .wrong(5L)
                .total(10L)
                .correctRate(50L)
                .user(defaultUserResponseDto)
                .finishedGames(1L)
                .build();
        when(statisticsRepository.findAll()).thenReturn(List.of(defaultStatistics1, defaultStatistics3));
        when(statisticsResponseDtoMapper.apply(defaultStatistics1)).thenReturn(defaultStatisticsResponseDto1);
        when(statisticsResponseDtoMapper.apply(defaultStatistics3)).thenReturn(defaultStatisticsResponseDto3);
        List<StatisticsResponseDto> result = statisticsService.getTopTenStatistics();
        Assertions.assertEquals(List.of(defaultStatisticsResponseDto1,defaultStatisticsResponseDto3), result);
    }

    @Test
    public void getTopTenStatisticsWhenThereAreTen(){
        Statistics defaultStatistics3 = Statistics.builder()
                .id(3L)
                .user(defaultUser)
                .correct(1L)
                .wrong(9L)
                .total(10L)
                .finishedGames(1L)
                .build();
        Statistics defaultStatistics4 = Statistics.builder()
                .id(4L)
                .user(defaultUser)
                .correct(2L)
                .wrong(8L)
                .total(10L)
                .finishedGames(1L)
                .build();
        Statistics defaultStatistics5 = Statistics.builder()
                .id(5L)
                .user(defaultUser)
                .correct(3L)
                .wrong(7L)
                .total(10L)
                .finishedGames(1L)
                .build();
        Statistics defaultStatistics6 = Statistics.builder()
                .id(6L)
                .user(defaultUser)
                .correct(4L)
                .wrong(6L)
                .total(10L)
                .finishedGames(1L)
                .build();
        Statistics defaultStatistics7 = Statistics.builder()
                .id(7L)
                .user(defaultUser)
                .correct(6L)
                .wrong(4L)
                .total(10L)
                .finishedGames(1L)
                .build();
        Statistics defaultStatistics8 = Statistics.builder()
                .id(8L)
                .user(defaultUser)
                .correct(8L)
                .wrong(2L)
                .total(10L)
                .finishedGames(1L)
                .build();
        List<Statistics> statistics = List.of(defaultStatistics8, defaultStatistics2, defaultStatistics7,
                defaultStatistics1, defaultStatistics6, defaultStatistics5, defaultStatistics4, defaultStatistics3);
        when(statisticsRepository.findAll()).thenReturn(statistics);
        when(statisticsResponseDtoMapper.apply(defaultStatistics1)).thenReturn(defaultStatisticsResponseDto1);
        when(statisticsResponseDtoMapper.apply(defaultStatistics2)).thenReturn(defaultStatisticsResponseDto2);
        when(statisticsResponseDtoMapper.apply(defaultStatistics3)).thenReturn(StatisticsResponseDto.builder()
                .id(3L)
                .right(1L)
                .wrong(9L)
                .total(10L)
                .correctRate(10L)
                .finishedGames(1L)
                .user(defaultUserResponseDto)
                .build());
        when(statisticsResponseDtoMapper.apply(defaultStatistics4)).thenReturn(StatisticsResponseDto.builder()
                .id(4L)
                .right(2L)
                .wrong(8L)
                .total(10L)
                .correctRate(20L)
                .finishedGames(1L)
                .user(defaultUserResponseDto)
                .build());
        when(statisticsResponseDtoMapper.apply(defaultStatistics5)).thenReturn(StatisticsResponseDto.builder()
                .id(5L)
                .right(3L)
                .wrong(7L)
                .total(10L)
                .correctRate(30L)
                .finishedGames(1L)
                .user(defaultUserResponseDto)
                .build());
        when(statisticsResponseDtoMapper.apply(defaultStatistics6)).thenReturn(StatisticsResponseDto.builder()
                .id(6L)
                .right(4L)
                .wrong(6L)
                .total(10L)
                .correctRate(40L)
                .finishedGames(1L)
                .user(defaultUserResponseDto)
                .build());
        when(statisticsResponseDtoMapper.apply(defaultStatistics7)).thenReturn(StatisticsResponseDto.builder()
                .id(7L)
                .right(6L)
                .wrong(4L)
                .total(10L)
                .correctRate(60L)
                .finishedGames(1L)
                .user(defaultUserResponseDto)
                .build());
        when(statisticsResponseDtoMapper.apply(defaultStatistics8)).thenReturn(StatisticsResponseDto.builder()
                .id(8L)
                .right(8L)
                .wrong(2L)
                .total(10L)
                .correctRate(80L)
                .finishedGames(1L)
                .user(defaultUserResponseDto)
                .build());
        List<StatisticsResponseDto> result = statistics.stream().map(statisticsResponseDtoMapper::apply).toList();
        Assertions.assertEquals(statisticsService.getTopTenStatistics(), result);
    }

    @Test
    public void getTopTenWhenThereAreMoreThanTen(){
        Statistics defaultStatistics3 = Statistics.builder()
                .id(3L)
                .user(defaultUser)
                .correct(1L)
                .wrong(9L)
                .total(10L)
                .finishedGames(1L)
                .build();
        Statistics defaultStatistics4 = Statistics.builder()
                .id(4L)
                .user(defaultUser)
                .correct(2L)
                .wrong(8L)
                .total(10L)
                .finishedGames(1L)
                .build();
        Statistics defaultStatistics5 = Statistics.builder()
                .id(5L)
                .user(defaultUser)
                .correct(3L)
                .wrong(7L)
                .total(10L)
                .finishedGames(1L)
                .build();
        Statistics defaultStatistics6 = Statistics.builder()
                .id(6L)
                .user(defaultUser)
                .correct(4L)
                .wrong(6L)
                .total(10L)
                .finishedGames(1L)
                .build();
        Statistics defaultStatistics7 = Statistics.builder()
                .id(7L)
                .user(defaultUser)
                .correct(6L)
                .wrong(4L)
                .total(10L)
                .finishedGames(1L)
                .build();
        Statistics defaultStatistics8 = Statistics.builder()
                .id(8L)
                .user(defaultUser)
                .correct(8L)
                .wrong(2L)
                .total(10L)
                .finishedGames(1L)
                .build();
        Statistics defaultStatistics9 = Statistics.builder()
                .id(9L)
                .user(defaultUser)
                .correct(9L)
                .wrong(1L)
                .total(10L)
                .finishedGames(1L)
                .build();
        List<Statistics> statistics = List.of(defaultStatistics9, defaultStatistics8, defaultStatistics2,
                defaultStatistics7, defaultStatistics1, defaultStatistics6, defaultStatistics5, defaultStatistics4,
                defaultStatistics3);
        when(statisticsRepository.findAll()).thenReturn(statistics);
        when(statisticsResponseDtoMapper.apply(defaultStatistics1)).thenReturn(defaultStatisticsResponseDto1);
        when(statisticsResponseDtoMapper.apply(defaultStatistics2)).thenReturn(defaultStatisticsResponseDto2);
        when(statisticsResponseDtoMapper.apply(defaultStatistics3)).thenReturn(StatisticsResponseDto.builder()
                .id(3L)
                .right(1L)
                .wrong(9L)
                .total(10L)
                .correctRate(10L)
                .finishedGames(1L)
                .user(defaultUserResponseDto)
                .build());
        when(statisticsResponseDtoMapper.apply(defaultStatistics4)).thenReturn(StatisticsResponseDto.builder()
                .id(4L)
                .right(2L)
                .wrong(8L)
                .total(10L)
                .correctRate(20L)
                .finishedGames(1L)
                .user(defaultUserResponseDto)
                .build());
        when(statisticsResponseDtoMapper.apply(defaultStatistics5)).thenReturn(StatisticsResponseDto.builder()
                .id(5L)
                .right(3L)
                .wrong(7L)
                .total(10L)
                .correctRate(30L)
                .finishedGames(1L)
                .user(defaultUserResponseDto)
                .build());
        when(statisticsResponseDtoMapper.apply(defaultStatistics6)).thenReturn(StatisticsResponseDto.builder()
                .id(6L)
                .right(4L)
                .wrong(6L)
                .total(10L)
                .correctRate(40L)
                .finishedGames(1L)
                .user(defaultUserResponseDto)
                .build());
        when(statisticsResponseDtoMapper.apply(defaultStatistics7)).thenReturn(StatisticsResponseDto.builder()
                .id(7L)
                .right(6L)
                .wrong(4L)
                .total(10L)
                .correctRate(60L)
                .finishedGames(1L)
                .user(defaultUserResponseDto)
                .build());
        when(statisticsResponseDtoMapper.apply(defaultStatistics8)).thenReturn(StatisticsResponseDto.builder()
                .id(8L)
                .right(8L)
                .wrong(2L)
                .total(10L)
                .correctRate(80L)
                .finishedGames(1L)
                .user(defaultUserResponseDto)
                .build());
        when(statisticsResponseDtoMapper.apply(defaultStatistics9)).thenReturn(StatisticsResponseDto.builder()
                .id(9L)
                .right(9L)
                .wrong(1L)
                .total(10L)
                .correctRate(90L)
                .finishedGames(1L)
                .user(defaultUserResponseDto)
                .build());
        List<StatisticsResponseDto> result = statistics.stream().limit(10).
                map(statisticsResponseDtoMapper::apply).toList();
        Assertions.assertEquals(statisticsService.getTopTenStatistics(), result);
    }

}
