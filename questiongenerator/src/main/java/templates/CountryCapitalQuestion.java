package templates;

import model.QuestionCategory;
import model.QuestionType;
import model.Answer;
import model.AnswerCategory;
import model.Question;
import org.json.JSONObject;

public class CountryCapitalQuestion extends QuestionTemplate{


    public CountryCapitalQuestion(String langCode) {
        super(langCode);
    }

    @Override
    public void setQuery() {
        this.sparqlQuery =
                "SELECT ?country ?countryLabel ?capital ?capitalLabel " +
                        "WHERE { ?country wdt:P31 wd:Q3624078; wdt:P36 ?capital. SERVICE wikibase:label { bd:serviceParam wikibase:language \"" + langCode + "\". } } " +
                        "ORDER BY ?countryLabel";
    }

    @Override
    public void processResults() {
        for (int i = 0; i < results.length(); i++) {
            JSONObject result = results.getJSONObject(i);
            String countryLabel = result.getJSONObject("countryLabel").getString("value");
            String capitalLabel = result.getJSONObject("capitalLabel").getString("value");

            if (needToSkip(countryLabel))
                continue;

            Answer a = new Answer(capitalLabel, AnswerCategory.CITY);
            answerRepository.save(a);

            String content;
            if (langCode.equals("en"))
                content = "What is the capital of " + countryLabel + "?";
            else
                content = "¿Cuál es la capital de " + countryLabel + "?";

            questionRepository.save(new Question(content, a, QuestionCategory.GEOGRAPHY, AnswerCategory.CITY, langCode, QuestionType.TEXT));
        }
    }

    private boolean needToSkip(String countryLabel) {
        return countryLabel.equals("Q3932086") || countryLabel.equals("realm of the United Kingdom") || countryLabel.equals("Republic of Geneva")
                || countryLabel.equals("República de Ginebra") || countryLabel.equals("Q124653007");
    }
}
