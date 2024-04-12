import model.AnswerCategory;
import repositories.GeneralRepositoryStorer;
import templates.BallonDOrQuestion;
import templates.CountryCapitalQuestion;
import templates.VideogamesPublisherQuestion;

public class Main {
    public static void main(String[] args) {

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


        /*
        // IMAGES

        if(GeneralRepositoryStorer.doesntExist(AnswerCategory.STADIUM.toString())) {
            new StadiumQuestion("en");
            new StadiumQuestion("es");
        }

        if (GeneralRepositoryStorer.doesntExist(AnswerCategory.PAINTING)) {
            new PaintingQuestion("en");
            new PaintingQuestion("es");
        }
        */


        /*
        // VIDEOS
        if(GeneralRepositoryStorer.doesntExist(AnswerCategory.SONG.toString())) {
            new SongQuestion("en");
            new SongQuestion("es");
        }
        */
    }
}