package templates;

import model.*;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class VideogamesGenreQuestion extends QuestionTemplate {
    List<String> videoGameLabels;

    private static final String[] spanishStringsIni = {"¿A qué género pertenece ", "¿Cuál es el género de ", "¿Qué tipo de género es ", "¿En qué género se clasifica "};
    private static final String[] englishStringsIni= {"What genre is ", "What is the genre of ", "What genre of game is ", "What genre categorizes "};

    private static final String[] spanishStringsFin = {"?", "?", "?", "?"};
    private static final String[] englishStringsFin = {"?", "?", "?", "?"};

    public VideogamesGenreQuestion(String langCode) {
        super(langCode);
    }

    @Override
    public void setQuery() {
        this.sparqlQuery = "SELECT ?gameLabel (MAX(?unitsSoldValue) as ?maxUnitsSold) (SAMPLE(?genreLabel) as ?genre) " +
                "WHERE { " +
                "  ?game wdt:P31 wd:Q7889; " +
                "        wdt:P2664 ?unitsSoldValue. " +
                "  OPTIONAL { " +
                "    ?game wdt:P136 ?genreItem. " +
                "    ?genreItem rdfs:label ?genreLabel. " +
                "    FILTER(LANG(?genreLabel) IN (\"en\", \"es\")) " +
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

        for (int i = 0; i < results.length(); i++) {

            JSONObject result = results.getJSONObject(i);

            String videoGameLabel = "";
            String genreLabel = "";

            try {
                JSONObject videoGameLabelObject = result.getJSONObject("gameLabel");
                videoGameLabel = videoGameLabelObject.getString("value");

                JSONObject genreLabelObject = result.getJSONObject("genre");
                genreLabel = genreLabelObject.getString("value");
            } catch (Exception e) {
                continue;
            }

            if (needToSkip(videoGameLabel, genreLabel))
                continue;

            Answer a = new Answer(genreLabel, AnswerCategory.GAMES_GENRE, langCode);
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

    private boolean needToSkip(String videoGameLabel, String genreLabel) {
        if (videoGameLabels.contains(videoGameLabel)) {
            return true;
        }
        videoGameLabels.add(videoGameLabel);

        if (QGHelper.isEntityName(videoGameLabel) || QGHelper.isEntityName(genreLabel))
            return true;


        return false;
    }
}
