package templates;

import model.*;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class VideogamesPublisherQuestion extends QuestionTemplate {
    List<String> videoGameLabels;

    public VideogamesPublisherQuestion(String langCode) {
        super(langCode);
    }

    @Override
    public void setQuery() {
        this.sparqlQuery =
                "SELECT ?gameLabel (MAX(?unitsSoldValue) as ?maxUnitsSold) (SAMPLE(?publisherLabel) as ?publisher) " +
                        "WHERE { " +
                        "  ?game wdt:P31 wd:Q7889; " +
                        "        wdt:P2664 ?unitsSoldValue. " +
                        "  OPTIONAL { " +
                        "    ?game wdt:P123 ?publisher. " +
                        "    ?publisher rdfs:label ?publisherLabel. " +
                        "    FILTER(LANG(?publisherLabel) IN (\"en\", \"es\")) " +
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
            String publisherLabel = "";

            try {
                JSONObject videoGameLabelObject = result.getJSONObject("gameLabel");
                videoGameLabel = videoGameLabelObject.getString("value");

                JSONObject publisherLabelObject = result.getJSONObject("publisher");
                publisherLabel = publisherLabelObject.getString("value");
            } catch (Exception e) {
                continue;
            }

            if (needToSkip(videoGameLabel, publisherLabel))
                continue;

            Answer a = new Answer(publisherLabel, AnswerCategory.GAMES_PUBLISHER, langCode);
            answers.add(a);

            if (langCode.equals("es"))
                questions.add(new Question(a, "¿Qué compañía publicó " + videoGameLabel + "?", QuestionCategory.VIDEOGAMES, QuestionType.TEXT));
            else
                questions.add(new Question(a, "Who published " + videoGameLabel + "?", QuestionCategory.VIDEOGAMES, QuestionType.TEXT));
        }

        repository.saveAll(new ArrayList<>(answers));
        repository.saveAll(new ArrayList<>(questions));
    }

    private boolean needToSkip(String videoGameLabel, String publisherLabel) {
        if (videoGameLabels.contains(videoGameLabel)) {
            return true;
        }
        videoGameLabels.add(videoGameLabel);

        if (QGHelper.isEntityName(videoGameLabel) || QGHelper.isEntityName(publisherLabel))
            return true;

        return false;
    }
}
