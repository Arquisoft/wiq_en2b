import templates.CountryCapitalQuestion;
import templates.SongQuestion;
import templates.StadiumQuestion;

public class Main {
    public static void main(String[] args) {
        new CountryCapitalQuestion("en");
        new CountryCapitalQuestion("es");

        new SongQuestion("en");
        new SongQuestion("es");

        new StadiumQuestion("en");
        new StadiumQuestion("es");
    }
}