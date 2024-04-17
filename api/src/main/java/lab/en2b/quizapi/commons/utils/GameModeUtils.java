package lab.en2b.quizapi.commons.utils;

import lab.en2b.quizapi.game.Game;
import lab.en2b.quizapi.game.GameMode;
import lab.en2b.quizapi.questions.question.QuestionCategory;

import java.util.List;

import static lab.en2b.quizapi.game.GameMode.KIWI_QUEST;

public class GameModeUtils {
    public static List<QuestionCategory> getQuestionCategoriesForGamemode(GameMode gamemode, List<QuestionCategory> questionCategoriesForCustom){
        if(gamemode == null){
            gamemode = KIWI_QUEST;
        }
        return switch (gamemode) {
            case KIWI_QUEST -> List.of(QuestionCategory.ART, QuestionCategory.MUSIC, QuestionCategory.GEOGRAPHY);
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
}
