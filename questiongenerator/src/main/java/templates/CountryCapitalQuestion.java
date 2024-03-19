package templates;

import model.QuestionCategory;
import model.QuestionType;
import model.Answer;
import model.AnswerCategory;
import model.Question;
import org.json.JSONObject;
import repositories.Storable;

import java.util.ArrayList;
import java.util.List;

/**
 * Implementation for a question where the capital of a country is asked and all the capitals are returned.
 */
public class CountryCapitalQuestion extends QuestionTemplate {

    /**
     * Only need to invoke the constructor, and it will automatically do the HTTP request and the response recovery.
     * @param langCode representation for the language to be used for the question. ("en" for English, "es" for Spanish)
     */
    public CountryCapitalQuestion(String langCode) {
        super(langCode);
    }

    /**
     * Query to be sent to WikiData QS.
     * It retrieves the name of the capital of every country in the language specified in @langCode
     */
    @Override
    protected void setQuery() {
        this.sparqlQuery =
                "SELECT ?country ?countryLabel ?capital ?capitalLabel " +
                        "WHERE { ?country wdt:P31 wd:Q3624078; wdt:P36 ?capital. SERVICE wikibase:label { bd:serviceParam wikibase:language \"" + langCode + "\". } } " +
                        "ORDER BY ?countryLabel";
    }

    /**
     * Method where the results are processed. It also is in charge of saving both, the question and every possible capital.
     * Question: what is the capital of X country?
     */
    @Override
    protected void processResults() {
        List<Question> questions = new ArrayList<>();
        List<Answer> answers = new ArrayList<>();
        for (int i = 0; i < results.length(); i++) {
            JSONObject result = results.getJSONObject(i);
            String countryLabel = result.getJSONObject("countryLabel").getString("value");
            String capitalLabel = result.getJSONObject("capitalLabel").getString("value");

            // Ignoring answers that may compromise the game flow (Country does not have a name i.e.)
            if (needToSkip(countryLabel))
                continue;

            //Saving the answer
            Answer a = new Answer(capitalLabel, AnswerCategory.CITY);
            answers.add(a);

            //Saving the question
            String content;
            if (langCode.equals("en"))
                content = "What is the capital of " + countryLabel + "?";
            else
                content = "¿Cuál es la capital de " + countryLabel + "?";
            questions.add(new Question(content, a, QuestionCategory.GEOGRAPHY, langCode, QuestionType.TEXT));
        }
        addRandomAnswers(answers, questions);
        repository.saveAll(new ArrayList<>(answers));
        repository.saveAll(new ArrayList<>(questions));
    }

    private void addRandomAnswers(List<Answer> answers, List<Question> questions) {
        for(Question q : questions) {
            q.getAnswers().add(answers.get((int) (Math.random() * (answers.size()-1))));
        }
    }

    /**
     * Auxiliar method for @processResults. It returns whether a country must be skipped as an entry in DB or not
     *
     */
    private boolean needToSkip(String countryLabel) {
        return countryLabel.equals("Q3932086") || countryLabel.equals("realm of the United Kingdom") || countryLabel.equals("Republic of Geneva")
                || countryLabel.equals("República de Ginebra") || countryLabel.equals("Q124653007");
    }
}
