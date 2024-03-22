package templates;

import model.*;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class StadiumQuestion extends QuestionTemplate {

    List<String> stadiumLabels;

    public StadiumQuestion(String langCode) {
        super(langCode);
    }

    @Override
    protected void setQuery() {
        this.sparqlQuery =
                "SELECT ?stadiumLabel ?image " +
                        "WHERE { " +
                        "  ?stadium wdt:P31/wdt:P279* wd:Q483110; " +
                        "           wdt:P18 ?image;  " +
                        "           wdt:P1083 ?capacity;  " +
                        "           wdt:P17 ?country. " +
                        "  ?country wdt:P361 wd:Q46. " +
                        "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"" + langCode + "\". } } " +
                        "GROUP BY ?stadium ?stadiumLabel ?image ?capacity ?countryLabel " +
                        "HAVING (?capacity > 25000) " +
                        "LIMIT 100";
    }

    @Override
    public void processResults() {
        stadiumLabels = new ArrayList<>();
        List<Question> questions = new ArrayList<>();
        List<Answer> answers = new ArrayList<>();

        for (int i = 0; i < results.length(); i++) {

            JSONObject result = results.getJSONObject(i);


            JSONObject stadiumLabelObject = result.getJSONObject("stadiumLabel");
            String stadiumLabel = stadiumLabelObject.getString("value");

            JSONObject imageObject = result.getJSONObject("image");
            String imageLink = imageObject.getString("value");

            if (needToSkip(stadiumLabel))
                continue;


            Answer a = new Answer(stadiumLabel, AnswerCategory.STADIUM, langCode);
            answers.add(a);

            if (langCode.equals("es"))
                questions.add(new Question(a, "¿Cuál es este estadio? " + imageLink, QuestionCategory.SPORTS, QuestionType.IMAGE));
            else
                questions.add(new Question(a, "Which stadium is this?" + imageLink, QuestionCategory.SPORTS, QuestionType.IMAGE));
        }

        repository.saveAll(new ArrayList<>(answers));
        repository.saveAll(new ArrayList<>(questions));
    }

    private boolean needToSkip(String stadiumLabel) {
        if (stadiumLabels.contains(stadiumLabel)) {
            return true;
        }
        stadiumLabels.add(stadiumLabel);

        boolean isEntityName = true; // Check if it is like Q232334
        if (stadiumLabel.startsWith("Q") ){
            for (int i=1; i<stadiumLabel.length(); i++){
                if (!Character.isDigit(stadiumLabel.charAt(i))){
                    isEntityName = false;
                }
            }
            if (isEntityName){
                return true;
            }
        }

        return false;
    }
}
