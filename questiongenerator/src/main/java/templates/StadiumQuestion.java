package templates;

import model.*;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class StadiumQuestion extends QuestionTemplate {

    private static final String[] spanishStringsIni = {"¿Cómo se llama este estadio?", "¿Cuál es el nombre de este estadio?", "¿Cuál es este estadio?", "¿Con qué nombre se conoce a este estadio?"};
    private static final String[] englishStringsIni= {"What is the name of this stadium?", "How's this stadium called", "Which stadium is this?", "How do they call this stadium?"};

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

        System.out.println("Processing Stadiums");
        System.out.println(results.toString());

        stadiumLabels = new ArrayList<>();
        List<Question> questions = new ArrayList<>();
        List<Answer> answers = new ArrayList<>();

        for (int i = 0; i < results.length(); i++) {

            JSONObject result = results.getJSONObject(i);


            JSONObject stadiumLabelObject = result.getJSONObject("stadiumLabel");
            String stadiumLabel = stadiumLabelObject.getString("value");

            JSONObject imageObject = result.getJSONObject("image");
            String imageLink = imageObject.getString("value");

            if (needToSkip(stadiumLabel, imageLink))
                continue;


            Answer a = new Answer(stadiumLabel, AnswerCategory.STADIUM, langCode);
            answers.add(a);

            imageLink = imageLink.replace("http://", "https://");
            if (langCode.equals("es"))
                questions.add(new Question(a, spanishStringsIni[i%4] + QGHelper.LINKCONCAT + imageLink, QuestionCategory.SPORTS, QuestionType.IMAGE));
            else
                questions.add(new Question(a, englishStringsIni[i%4] + QGHelper.LINKCONCAT + imageLink, QuestionCategory.SPORTS, QuestionType.IMAGE));
        }

        repository.saveAll(new ArrayList<>(answers));
        repository.saveAll(new ArrayList<>(questions));
    }

    private boolean needToSkip(String stadiumLabel, String imageLink) {
        if (stadiumLabels.contains(stadiumLabel)) {
            return true;
        }
        stadiumLabels.add(stadiumLabel);

        if (QGHelper.notAllowedExtension(imageLink)){
            return true;
        }

        return false;
    }
}
