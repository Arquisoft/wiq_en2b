package templates;

import model.*;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class PaintingQuestion extends QuestionTemplate {

    List<String> paintingLabels;

    public PaintingQuestion(String langCode) {
        super(langCode);
    }

    @Override
    public void setQuery() {
        this.sparqlQuery =
                "SELECT DISTINCT ?paintingLabel ?authorLabel ?image " +
                        "WHERE { " +
                        "  ?painting wdt:P31 wd:Q3305213; " +
                        "           wdt:P170 ?author; " +
                        "           wdt:P18 ?image; " +
                        "           wdt:P1343 wd:Q66362718. " +
                        "  ?author wdt:P106 wd:Q1028181. " +
                        "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"" + langCode + "\". } " +
                        "} " +
                        "LIMIT 100";
    }

    @Override
    public void processResults() {
        paintingLabels = new ArrayList<>();
        List<Question> questions = new ArrayList<>();
        List<Answer> answers = new ArrayList<>();

        for (int i = 0; i < results.length(); i++) {

            JSONObject result = results.getJSONObject(i);


            JSONObject paintingLabelObject = result.getJSONObject("paintingLabel");
            String paintingLabel = paintingLabelObject.getString("value");

            JSONObject authorLabelObject = result.getJSONObject("authorLabel");
            String authorLabel = authorLabelObject.getString("value");

            JSONObject imageObject = result.getJSONObject("image");
            String imageLink = imageObject.getString("value");

            if (needToSkip(paintingLabel, imageLink))
                continue;

            String answerText = "";
            if (langCode.equals("es"))
                answerText = paintingLabel + " de " + authorLabel;
            else
                answerText = paintingLabel + " by " + authorLabel;

            Answer a = new Answer(answerText, AnswerCategory.PAINTING, langCode);
            answers.add(a);

            imageLink = imageLink.replace("http://", "https://");
            if (langCode.equals("es"))
                questions.add(new Question(a, "¿Cuál es este cuadro?" + QGHelper.LINKCONCAT + imageLink, QuestionCategory.ART, QuestionType.IMAGE));
            else
                questions.add(new Question(a, "Which painting is this?" + QGHelper.LINKCONCAT + imageLink, QuestionCategory.ART, QuestionType.IMAGE));
        }

        repository.saveAll(new ArrayList<>(answers));
        repository.saveAll(new ArrayList<>(questions));
    }

    private boolean needToSkip(String paintingLabel, String imageLink) {
        if (paintingLabels.contains(paintingLabel)) {
            return true;
        }
        paintingLabels.add(paintingLabel);

        if (QGHelper.isEntityName(paintingLabel)){
            return true;
        }

        if (QGHelper.notAllowedExtension(imageLink)){
            return true;
        }

        return false;
    }
}
