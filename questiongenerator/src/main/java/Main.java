import model.AnswerCategory;
import repositories.GeneralRepositoryStorer;
import templates.BallonDOrQuestion;
import templates.CountryCapitalQuestion;
import templates.SongQuestion;
import templates.StadiumQuestion;

public class Main {
    public static void main(String[] args) {

        if(!GeneralRepositoryStorer.existsCategory(AnswerCategory.CAPITAL_CITY.toString())) {
            new CountryCapitalQuestion("en");
            new CountryCapitalQuestion("es");
        }

        if(!GeneralRepositoryStorer.existsCategory(AnswerCategory.SONG.toString())) {
            new SongQuestion("en");
            new SongQuestion("es");
        }

        if(!GeneralRepositoryStorer.existsCategory(AnswerCategory.STADIUM.toString())) {
            new StadiumQuestion("en");
            new StadiumQuestion("es");
        }






    }
}