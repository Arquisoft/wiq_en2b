package templates;

import model.*;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class BallonDOrQuestion extends QuestionTemplate {

    /**
     * It is not necessary to specify the language code for this question
     * @param langCode IGNORED, spanish and english languages are generated at the same time
     */
    public BallonDOrQuestion(String langCode) {
        super(langCode);
    }

    @Override
    protected void setQuery() {
        this.sparqlQuery =
                "SELECT ?playerLabel ?year " +
                        "WHERE { " +
                        "  wd:Q166177 p:P1346 ?statement. " +
                        "  ?statement ps:P1346 ?player. " +
                        "  ?statement pq:P585 ?year. " +
                        "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"en\". } " +
                        "} " +
                        "ORDER BY ?year";
    }

    @Override
    protected void processResults() {
        List<Question> questions = new ArrayList<>();
        List<Answer> answers = new ArrayList<>();
        for (int i = 0; i < results.length(); i++) {
            JSONObject result = results.getJSONObject(i);
            String playerLabel = result.getJSONObject("playerLabel").getString("value");
            String year = result.getJSONObject("year").getString("value").substring(0, 4);

            if (needToSkip(playerLabel, year))
                continue;

            // EXCEPTION FOR THIS TYPE OF QUESTION
            // English
            Answer a = new Answer(playerLabel, AnswerCategory.BALLON_DOR, "en");
            answers.add(a);
            questions.add(new Question(a, "Who won the Ballon d'Or in " + year + "?", QuestionCategory.SPORTS, QuestionType.TEXT));

            // Spanish
            a = new Answer(playerLabel, AnswerCategory.BALLON_DOR, "es");
            answers.add(a);
            questions.add(new Question(a, "¿Quién ganó el Balón de Oro en " + year + "?", QuestionCategory.SPORTS, QuestionType.TEXT));

        }

        repository.saveAll(new ArrayList<>(answers));
        repository.saveAll(new ArrayList<>(questions));
    }

    // Method to check if the player name or year is missing
    private boolean needToSkip(String playerLabel, String year) {
        return playerLabel.isEmpty() || year.isEmpty();
    }
}
