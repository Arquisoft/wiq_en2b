package lab.en2b.quizapi.commons.utils;

import lab.en2b.quizapi.game.Game;
import lab.en2b.quizapi.game.GameMode;
import lab.en2b.quizapi.questions.question.QuestionCategory;
import lab.en2b.quizapi.questions.question.dtos.QuestionCategoryDto;

import java.util.List;

import static lab.en2b.quizapi.game.GameMode.KIWI_QUEST;

public class GameModeUtils {
    public static List<QuestionCategory> getQuestionCategoriesForGamemode(GameMode gamemode, List<QuestionCategory> questionCategoriesForCustom){
        if(gamemode == null){
            gamemode = KIWI_QUEST;
        }
        return switch (gamemode) {
            case KIWI_QUEST -> List.of(QuestionCategory.ART,QuestionCategory.MUSIC,QuestionCategory.GEOGRAPHY);
            case FOOTBALL_SHOWDOWN -> List.of(QuestionCategory.SPORTS);
            case GEO_GENIUS -> List.of(QuestionCategory.GEOGRAPHY);
            case VIDEOGAME_ADVENTURE -> List.of(QuestionCategory.VIDEOGAMES);
            case ANCIENT_ODYSSEY -> List.of(QuestionCategory.MUSIC,QuestionCategory.ART);
            case RANDOM -> List.of(QuestionCategory.values());
            case CUSTOM -> questionCategoriesForCustom;
        };
    }
    public static void setGamemodeParams(Game game){
        switch(game.getGamemode()){
            case KIWI_QUEST:
                game.setRounds(9L);
                game.setRoundDuration(30);
                break;
            case FOOTBALL_SHOWDOWN:
                game.setRounds(9L);
                game.setRoundDuration(30);
                break;
            case GEO_GENIUS:
                game.setRounds(9L);
                game.setRoundDuration(30);
                break;
            case VIDEOGAME_ADVENTURE:
                game.setRounds(9L);
                game.setRoundDuration(30);
                break;
            case ANCIENT_ODYSSEY:
                game.setRounds(9L);
                game.setRoundDuration(30);
                break;
            case RANDOM:
                game.setRounds(9L);
                game.setRoundDuration(30);
                break;
            default:
                game.setRounds(9L);
                game.setRoundDuration(30);
        }
    }

    public static List<QuestionCategoryDto> getQuestionCategories(String lang) {
        if(lang == null)
            lang = "en";
        if(lang.equals("en"))
            return getQuestionCategoriesEn();
        return getQuestionCategoriesEs();
    }
    private static List<QuestionCategoryDto> getQuestionCategoriesEn(){
        return List.of(
                QuestionCategoryDto.builder()
                        .name("Art")
                        .description("Are you an art expert? Prove it!")
                        .internalRepresentation(QuestionCategory.ART)
                        .build(),

                QuestionCategoryDto.builder()
                        .name("Music")
                        .description("Are you a music lover? Prove it!")
                        .internalRepresentation(QuestionCategory.MUSIC)
                        .build(),
                QuestionCategoryDto.builder()
                        .name("Geography")
                        .description("Are you a geography expert? Prove it!")
                        .internalRepresentation(QuestionCategory.GEOGRAPHY)
                        .build(),
                QuestionCategoryDto.builder()
                        .name("Sports")
                        .description("Are you a sports fanatic? Prove it!")
                        .internalRepresentation(QuestionCategory.SPORTS)
                        .build(),
                QuestionCategoryDto.builder()
                        .name("Video Games")
                        .description("Are you a gamer? Prove it!")
                        .internalRepresentation(QuestionCategory.VIDEOGAMES)
                        .build()
        );
    }

    private static List<QuestionCategoryDto> getQuestionCategoriesEs(){
        return List.of(
                QuestionCategoryDto.builder()
                        .name("Arte")
                        .description("¿Eres un experto en arte? ¡Demuéstralo!")
                        .internalRepresentation(QuestionCategory.ART)
                        .build(),

                QuestionCategoryDto.builder()
                        .name("Música")
                        .description("¿Eres un melómano? ¡Demuéstralo!")
                        .internalRepresentation(QuestionCategory.MUSIC)
                        .build(),
                QuestionCategoryDto.builder()
                        .name("Geografía")
                        .description("¿Eres un experto en geografía? ¡Demuéstralo!")
                        .internalRepresentation(QuestionCategory.GEOGRAPHY)
                        .build(),
                QuestionCategoryDto.builder()
                        .name("Deportes")
                        .description("¿Eres un fanático de los deportes? ¡Demuéstralo!")
                        .internalRepresentation(QuestionCategory.SPORTS)
                        .build(),
                QuestionCategoryDto.builder()
                        .name("Videojuegos")
                        .description("¿Eres un gamer? ¡Demuéstralo!")
                        .internalRepresentation(QuestionCategory.VIDEOGAMES)
                        .build()
        );
    }
}
