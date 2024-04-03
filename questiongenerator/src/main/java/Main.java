import model.AnswerCategory;
import repositories.GeneralRepositoryStorer;
import templates.BallonDOrQuestion;
import templates.CountryCapitalQuestion;
import templates.SongQuestion;
import templates.StadiumQuestion;

public class Main {
    public static void main(String[] args) {

        if(!GeneralRepositoryStorer.existsCategory(AnswerCategory.CAPITAL_CITY)) {
            new CountryCapitalQuestion("en");
            new CountryCapitalQuestion("es");
        }

        /*
        if(!GeneralRepositoryStorer.existsCategory(AnswerCategory.SONG.toString())) {
            new SongQuestion("en");
            new SongQuestion("es");
        }

        if(!GeneralRepositoryStorer.existsCategory(AnswerCategory.STADIUM.toString())) {
            new StadiumQuestion("en");
            new StadiumQuestion("es");
        }
        */


        if (!GeneralRepositoryStorer.existsCategory(AnswerCategory.BALLON_DOR)) {
            new BallonDOrQuestion(""); // No need to specify language code as it is not used
        }

    }
}