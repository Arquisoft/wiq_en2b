package templates;

import model.*;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class VideogamesReleaseDate extends QuestionTemplate {
    List<String> videoGameLabels;

    private static final String[] spanishStringsIni = {"¿Cuándo fue publicado ", "¿En qué fecha fue lanzado ", "¿Cuándo fue lanzado ", "¿En qué fecha fue publicado "};
    private static final String[] englishStringsIni= {"When was ", "On what date was ", "When was ", "On what date was "};

    private static final String[] spanishStringsFin = {"?", "?", "?", "?"};
    private static final String[] englishStringsFin = {" released?", " released?", " launched?", " launched?"};

    public VideogamesReleaseDate(String langCode) {
        super(langCode);
    }

    @Override
    public void setQuery() {
        this.sparqlQuery = "SELECT ?gameLabel (MAX(?unitsSoldValue) as ?maxUnitsSold) (MIN(?publicationDate) as ?oldestPublicationDate)\n" +
                "WHERE { " +
                "  ?game wdt:P31 wd:Q7889; " +
                "        wdt:P2664 ?unitsSoldValue. " +
                "  ?game wdt:P577 ?publicationDate. " +
                "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"" + langCode + "\". } " +
                "} " +
                "GROUP BY ?game ?gameLabel " +
                "ORDER BY DESC(?maxUnitsSold) " +
                "LIMIT 150 ";
    }

    @Override
    public void processResults() {
        videoGameLabels = new ArrayList<>();
        List<Question> questions = new ArrayList<>();
        List<Answer> answers = new ArrayList<>();

        for (int i = 0; i < results.length()-10; i++) {

            JSONObject result = results.getJSONObject(i);

            String videoGameLabel = "";
            String publishDateLabel = "";

            try {
                JSONObject videoGameLabelObject = result.getJSONObject("gameLabel");
                videoGameLabel = videoGameLabelObject.getString("value");

                JSONObject publishDateLabelObject = result.getJSONObject("oldestPublicationDate");
                publishDateLabel = publishDateLabelObject.getString("value");

                publishDateLabel = publishDateLabel.substring(0, 4);

            } catch (Exception e) {
                continue;
            }

            if (needToSkip(videoGameLabel, publishDateLabel))
                continue;

            Answer a = new Answer(publishDateLabel, AnswerCategory.GAMES_RELEASE, langCode);
            answers.add(a);

            String questionString = "";

            if (langCode.equals("es"))
                questionString = spanishStringsIni[i%4] + videoGameLabel + spanishStringsFin[i%4];
            else
                questionString = englishStringsIni[i%4] + videoGameLabel + englishStringsFin[i%4];

            questions.add(new Question(a, questionString, QuestionCategory.VIDEOGAMES, QuestionType.TEXT));
        }

        repository.saveAll(new ArrayList<>(answers));
        repository.saveAll(new ArrayList<>(questions));
    }

    private boolean needToSkip(String videoGameLabel, String countryLabel) {
        if (videoGameLabels.contains(videoGameLabel)) {
            return true;
        }
        videoGameLabels.add(videoGameLabel);

        if (QGHelper.isEntityName(videoGameLabel) || QGHelper.isEntityName(countryLabel))
            return true;

        return false;
    }
}

