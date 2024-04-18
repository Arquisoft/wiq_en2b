package templates;

import model.*;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class VideogamesCountryQuestion extends QuestionTemplate {

    private static final String[] spanishStringsIni = {"¿En que país se desarrolló ", "¿Dónde fue desarrollado ", "¿En qué país se creó ", "¿Dónde se creó "};
    private static final String[] englishStringsIni= {"In which country was ", "Where was ", "In what country was ", "Where was "};

    private static final String[] spanishStringsFin = {"?", "?", "?", "?"};
    private static final String[] englishStringsFin = {" developed?", " developed?", " created?", " created?"};

    List<String> videoGameLabels;

    public VideogamesCountryQuestion(String langCode) {
        super(langCode);
    }

    @Override
    public void setQuery() {
        this.sparqlQuery = "SELECT ?gameLabel (MAX(?unitsSoldValue) as ?maxUnitsSold) (SAMPLE(?countryLabel) as ?country) " +
                "WHERE { " +
                "  ?game wdt:P31 wd:Q7889; " +
                "        wdt:P2664 ?unitsSoldValue. " +
                "  OPTIONAL {\n" +
                "    ?game wdt:P495 ?countryItem. " +
                "    ?countryItem rdfs:label ?countryLabel. " +
                "    FILTER(LANG(?countryLabel) IN (\"en\", \"es\")) " +
                "  } " +
                "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"" + langCode + "\". } " +
                "} " +
                "GROUP BY ?game ?gameLabel " +
                "ORDER BY DESC(?maxUnitsSold) " +
                "LIMIT 150";
    }

    @Override
    public void processResults() {
        videoGameLabels = new ArrayList<>();
        List<Question> questions = new ArrayList<>();
        List<Answer> answers = new ArrayList<>();

        for (int i = 0; i < results.length()-10; i++) {

            JSONObject result = results.getJSONObject(i);

            String videoGameLabel = "";
            String countryLabel = "";

            try {
                JSONObject videoGameLabelObject = result.getJSONObject("gameLabel");
                videoGameLabel = videoGameLabelObject.getString("value");

                JSONObject countryLabelObject = result.getJSONObject("country");
                countryLabel = countryLabelObject.getString("value");
            } catch (Exception e) {
                continue;
            }

            if (needToSkip(videoGameLabel, countryLabel))
                continue;

            Answer a = new Answer(countryLabel, AnswerCategory.GAMES_COUNTRY, langCode);
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

        if (QGHelper.isEntityName(videoGameLabel))
            return true;
        if (QGHelper.isEntityName(countryLabel))
            return true;

        return false;
    }
}
