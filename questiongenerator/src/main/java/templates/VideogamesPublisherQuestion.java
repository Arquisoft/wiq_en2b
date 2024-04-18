package templates;

import model.*;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class VideogamesPublisherQuestion extends QuestionTemplate {
    List<String> videoGameLabels;

    private static final String[] spanishStringsIni = {"¿Que compañía publicó ", "¿Quién publicó ", "¿Qué empresa publicó ", "¿Quién fue el publicador de "};
    private static final String[] englishStringsIni= {"Who published ", "What company published ", "Who was the publisher of ", "Which company published "};

    private static final String[] spanishStringsFin = {"?", "?", "?", "?"};
    private static final String[] englishStringsFin = {"?", "?", "?", "?"};

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
