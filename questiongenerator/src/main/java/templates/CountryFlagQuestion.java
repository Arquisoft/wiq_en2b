package templates;

import model.QuestionCategory;
import model.QuestionType;
import model.Answer;
import model.AnswerCategory;
import model.Question;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class CountryFlagQuestion extends QuestionTemplate {

    private static final String[] spanishStringsIni = {"¿Que país tiene esta bandera? ", "¿A qué país pertenece esta bandera? ", "¿De qué país es esta bandera? ", "¿Cuál es el país de esta bandera? "};
    private static final String[] englishStringsIni= {"Which country has this flag? ", "To which country belongs this flag? ", "From which country is this flag? ", "What is the country represented by this flag? "};

    List<String> countryLabels;

    public CountryFlagQuestion(String langCode) {
        super(langCode);
    }

    @Override
    public void setQuery() {
        this.sparqlQuery = "SELECT ?countryLabel ?flagLabel\n" +
                "WHERE " +
                "{ " +
                "  ?country wdt:P31 wd:Q6256; " +
                "           wdt:P41 ?flag. " +
                "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"" + langCode + "\". } " +
                "}";
    }

    @Override
    public void processResults() {
        countryLabels = new ArrayList<>();
        List<Question> questions = new ArrayList<>();
        List<Answer> answers = new ArrayList<>();

        for (int i = 0; i < results.length(); i++) {
            JSONObject result = results.getJSONObject(i);
            String countryLabel = result.getJSONObject("countryLabel").getString("value");
            String flagLabel = result.getJSONObject("flagLabel").getString("value");

            if (needToSkip(countryLabel, flagLabel)) {
                continue;
            }

            Answer a = new Answer(countryLabel, AnswerCategory.COUNTRY_FLAG, langCode);
            answers.add(a);

            if (langCode.equals("es")){
                String questionString = spanishStringsIni[i%4] + QGHelper.LINKCONCAT + flagLabel;
                questions.add(new Question(a, questionString, QuestionCategory.GEOGRAPHY, QuestionType.IMAGE));
            } else {
                String questionString = englishStringsIni[i%4] + QGHelper.LINKCONCAT + flagLabel;
                questions.add(new Question(a, questionString, QuestionCategory.GEOGRAPHY, QuestionType.IMAGE));
            }
        }
        repository.saveAll(new ArrayList<>(answers));
        repository.saveAll(new ArrayList<>(questions));
    }

    private boolean needToSkip(String countryLabel, String venueLabel){
        if (countryLabels.contains(countryLabel)) {
            return true;
        }
        countryLabels.add(countryLabel);

        if (QGHelper.isEntityName(countryLabel) || QGHelper.isEntityName(venueLabel)) {
            return true;
        }

        return false;
    }
}
