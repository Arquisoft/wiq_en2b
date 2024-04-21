package templates;

import model.*;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class BasketballVenueQuestion extends QuestionTemplate {

    private List<String> teamLabels;

    private static final String[] spanishStringsIni = {"¿Cómo se llama el estadio de ", "¿Dónde juega el equipo ", "¿Cuál es el estadio del equipo ", "¿Dónde se juegan los partidos del equipo "};
    private static final String[] englishStringsIni= {"What is the venue of ", "What is the stadium of ", "Which name receives the venue of ", "Where does "};

    private static final String[] spanishStringsFin = {"?", "?", "?", "?"};
    private static final String[] englishStringsFin = {"?", "?", "?", " play?"};

    public BasketballVenueQuestion(String langCode) {
        super(langCode);
    }

    @Override
    public void setQuery() {
        this.sparqlQuery = "SELECT ?teamLabel ?venueLabel " +
                "WHERE { " +
                "  ?team wdt:P31 wd:Q13393265; " +
                "        wdt:P118 ?league; " +
                "        wdt:P115 ?venue. " +
                "  VALUES ?league {wd:Q1126104 wd:Q155223} " +
                "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"" + langCode + "\". } " +
                "} ";
    }

    @Override
    public void processResults() {
        teamLabels = new ArrayList<>();
        List<Question> questions = new ArrayList<>();
        List<Answer> answers = new ArrayList<>();

        for (int i = 0; i < results.length(); i++) {
            JSONObject result = results.getJSONObject(i);
            String teamLabel = result.getJSONObject("teamLabel").getString("value");
            String venueLabel = result.getJSONObject("venueLabel").getString("value");

            if (needToSkip(teamLabel, venueLabel)) {
                continue;
            }

            Answer a = new Answer(venueLabel, AnswerCategory.BASKETBALL_VENUE, langCode);
            answers.add(a);

            String questionString = "";

            if (langCode.equals("es"))
                questionString = spanishStringsIni[i%4] + teamLabel + spanishStringsFin[i%4];
            else
                questionString = englishStringsIni[i%4] + teamLabel + englishStringsFin[i%4];

            questions.add(new Question(a, questionString, QuestionCategory.SPORTS, QuestionType.TEXT));
        }
        repository.saveAll(new ArrayList<>(answers));
        repository.saveAll(new ArrayList<>(questions));
    }

    private boolean needToSkip(String teamLabel, String venueLabel){
        if (teamLabels.contains(teamLabel)) {
            return true;
        }
        teamLabels.add(teamLabel);

        if (QGHelper.isEntityName(teamLabel) || QGHelper.isEntityName(venueLabel))
            return true;

        return false;
    }
}
