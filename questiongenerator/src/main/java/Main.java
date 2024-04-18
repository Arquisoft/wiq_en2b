import model.AnswerCategory;
import repositories.GeneralRepositoryStorer;
import templates.*;

public class Main {

    public static void main(String[] args) {
        // Deletes all questions and answers from the DB
        GeneralRepositoryStorer.clearAllQA();

        //Edit constraints of the DB
        GeneralRepositoryStorer.editConstraints();

        // TEXT
        if(GeneralRepositoryStorer.doesntExist(AnswerCategory.CAPITAL_CITY)) {
            new CountryCapitalQuestion("en");
            new CountryCapitalQuestion("es");
        }

        if (GeneralRepositoryStorer.doesntExist(AnswerCategory.BALLON_DOR)) {
            new BallonDOrQuestion(""); // No need to specify language code as it is not used
        }

        if (GeneralRepositoryStorer.doesntExist(AnswerCategory.GAMES_PUBLISHER)) {
            new VideogamesPublisherQuestion("en");
            new VideogamesPublisherQuestion("es");
        }

        if (GeneralRepositoryStorer.doesntExist(AnswerCategory.GAMES_GENRE)) {
            new VideogamesGenreQuestion("en");
            new VideogamesGenreQuestion("es");
        }

        if (GeneralRepositoryStorer.doesntExist(AnswerCategory.GAMES_COUNTRY)) {
            new VideogamesCountryQuestion("en");
            new VideogamesCountryQuestion("es");
        }

        if (GeneralRepositoryStorer.doesntExist(AnswerCategory.BASKETBALL_VENUE)) {
            new BasketballVenueQuestion("en");
            new BasketballVenueQuestion("es");
        }


        // IMAGES
        if(GeneralRepositoryStorer.doesntExist(AnswerCategory.STADIUM)) {
            new StadiumQuestion("en");
            new StadiumQuestion("es");
        }

        if (GeneralRepositoryStorer.doesntExist(AnswerCategory.PAINTING)) {
            new PaintingQuestion("en");
            new PaintingQuestion("es");
        }

        if (GeneralRepositoryStorer.doesntExist(AnswerCategory.WTPOKEMON)) {
            new WhosThatPokemonQuestion("en");
            new WhosThatPokemonQuestion("es");
        }

        /*
        // VIDEOS not yet supported
        if(GeneralRepositoryStorer.doesntExist(AnswerCategory.SONG.toString())) {
            new SongQuestion("en");
            new SongQuestion("es");
        }
        */
    }
}