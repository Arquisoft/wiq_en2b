package lab.en2b.quizapi.game;

import lab.en2b.quizapi.commons.user.UserService;
import lab.en2b.quizapi.game.dtos.*;
import lab.en2b.quizapi.game.mappers.GameResponseDtoMapper;
import lab.en2b.quizapi.questions.question.QuestionCategory;
import lab.en2b.quizapi.questions.question.QuestionService;
import lab.en2b.quizapi.questions.question.dtos.QuestionResponseDto;
import lab.en2b.quizapi.questions.question.mappers.QuestionResponseDtoMapper;
import lab.en2b.quizapi.statistics.Statistics;
import lab.en2b.quizapi.statistics.StatisticsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;
    private final GameResponseDtoMapper gameResponseDtoMapper;
    private final UserService userService;
    private final QuestionService questionService;
    private final QuestionResponseDtoMapper questionResponseDtoMapper;
    private final StatisticsRepository statisticsRepository;

    /**
     * Creates a new game for the user
     * @param lang the language of the game, default is ENGLISH
     * @param gamemode the gamemode of the game, default is KIWI_QUEST
     * @param newGameDto the custom game dto, only required if the gamemode is CUSTOM
     * @param authentication the authentication of the user
     * @return the newly created game
     */
    @Transactional
    public GameResponseDto newGame(String lang, GameMode gamemode, CustomGameDto newGameDto, Authentication authentication) {
        // Check if there is an active game for the user
        Optional<Game> game = gameRepository.findActiveGameForUser(userService.getUserByAuthentication(authentication).getId());
        if (game.isPresent() && !wasGameMeantToBeOver(game.get())){
            // If there is an active game and it should not be over, return it
            return gameResponseDtoMapper.apply(game.get());
        }
        return gameResponseDtoMapper.apply(gameRepository.save(
                new Game(userService.getUserByAuthentication(authentication),gamemode,lang,newGameDto)
        ));
    }

    /**
     * Starts a new round for the game
     * @param id the id of the game to start the round for
     * @param authentication the authentication of the user
     * @return the game with the new round started
     */
    @Transactional
    public GameResponseDto startRound(Long id, Authentication authentication) {
        // Get the game by id and user
        Game game = gameRepository.findByIdForUser(id, userService.getUserByAuthentication(authentication).getId()).orElseThrow();
        // Check if the game should be over
        wasGameMeantToBeOver(game);
        // Start a new round
        game.newRound(questionService.findRandomQuestion(game.getLanguage(),game.getQuestionCategoriesForGamemode()));

        return gameResponseDtoMapper.apply(gameRepository.save(game));
    }

    /**
     * Gets the current question for the game
     * @param id the id of the game to get the question for
     * @param authentication the authentication of the user
     * @return the current question
     */
    public QuestionResponseDto getCurrentQuestion(Long id, Authentication authentication){
        Game game = gameRepository.findByIdForUser(id, userService.getUserByAuthentication(authentication).getId()).orElseThrow();
        return questionResponseDtoMapper.apply(game.getCurrentQuestion());
    }

    /**
     * Answers the current question for the game
     * @param id the id of the game to answer the question for
     * @param dto the answer dto
     * @param authentication the authentication of the user
     * @return the response of the answer
     */
    @Transactional
    public AnswerGameResponseDto answerQuestion(Long id, GameAnswerDto dto, Authentication authentication){
        Game game = gameRepository.findByIdForUser(id, userService.getUserByAuthentication(authentication).getId()).orElseThrow();
        // Check if the game should be over
        wasGameMeantToBeOver(game);
        // Answer the question
        boolean wasCorrect = game.answerQuestion(dto.getAnswerId());
        // Check if the game is over after the answer
        wasGameMeantToBeOver(game);

        return new AnswerGameResponseDto(wasCorrect);
    }

    /**
     * Saves the statistics of the game
     * @param game the game to save the statistics for
     */
    private void saveStatistics(Game game){
        Statistics statistics;
        if (statisticsRepository.findByUserId(game.getUser().getId()).isPresent()){
            // If there are statistics for the user, update them
            statistics = statisticsRepository.findByUserId(game.getUser().getId()).get();
            statistics.updateStatistics(game.getCorrectlyAnsweredQuestions(),
                    game.getQuestions().size()-game.getCorrectlyAnsweredQuestions(),
                    game.getRounds());
        } else {
            // If there are no statistics for the user, create new ones
            statistics = Statistics.builder()
                    .user(game.getUser())
                    .correct(game.getCorrectlyAnsweredQuestions())
                    .wrong(game.getQuestions().size()-game.getCorrectlyAnsweredQuestions())
                    .total(game.getRounds())
                    .build();
        }
        statisticsRepository.save(statistics);
    }

    /**
     * Changes the language of the game. The game language will only change after the next round.
     * @param id the id of the game to change the language for
     * @param language the language to change to
     * @param authentication the authentication of the user
     * @return the game with the new language
     */
    public GameResponseDto changeLanguage(Long id, String language, Authentication authentication) {
        Game game = gameRepository.findByIdForUser(id, userService.getUserByAuthentication(authentication).getId()).orElseThrow();
        if(game.isGameOver()){
            throw new IllegalStateException("Cannot change language after the game is over!");
        }
        game.setLanguage(language);
        return gameResponseDtoMapper.apply(gameRepository.save(game));
    }

    /**
     * Gets the game details
     * @param id the id of the game to get the details for
     * @param authentication the authentication of the user
     * @return the game details
     */
    public GameResponseDto getGameDetails(Long id, Authentication authentication) {
        Game game = gameRepository.findByIdForUser(id, userService.getUserByAuthentication(authentication).getId()).orElseThrow();
        wasGameMeantToBeOver(game);
        return gameResponseDtoMapper.apply(game);
    }

    public List<QuestionCategory> getQuestionCategories() {
        return Arrays.asList(QuestionCategory.values());
    }

    private boolean wasGameMeantToBeOver(Game game) {
        if (game.shouldBeGameOver()){
            game.setGameOver(true);
            gameRepository.save(game);
            saveStatistics(game);
            return true;
        }
        return false;
    }

    /**
     * Gets the list of gamemodes a game can have
     * @return the list of gamemodes
     */
    public List<GameModeDto> getQuestionGameModes() {
        return List.of(
                new GameModeDto("Kiwi Quest","Our curated selection of the most exquisite questions. Enjoy with a glass of wine",GameMode.KIWI_QUEST,"FaKiwiBird"),
                new GameModeDto("Football Showdown","Like sports? Like balls? This gamemode is for you!",GameMode.FOOTBALL_SHOWDOWN,"IoIosFootball"),
                new GameModeDto("Geo Genius","Do you know the capital of Mongolia? I don't, so if you do this game is for you!",GameMode.GEO_GENIUS,"FaGlobeAmericas"),
                new GameModeDto("Videogame Adventure","It's dangerous to go alone, guess this!",GameMode.VIDEOGAME_ADVENTURE,"IoLogoGameControllerB"),
                new GameModeDto("Ancient Odyssey","Antiques are pricey for a reason!",GameMode.ANCIENT_ODYSSEY,"FaPalette"),
                new GameModeDto("Random","Try a bit of everything!",GameMode.RANDOM,"FaRandom"),
                new GameModeDto("Custom","Don't like our gamemodes? That's fine! (I only feel a bit offended)",GameMode.CUSTOM,"FaCog")
        );
    }
}
