package templates;

import model.*;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class SongQuestion extends QuestionTemplate {

    private static final String[] spanishStringsIni = {"¿Cómo se llama esta canción?", "¿Cuál es esta canción?", "¿Qué canción es esta?", "¿Cómo se llama esta canción?"};
    private static final String[] englishStringsIni= {"What is the name of this song?", "Which song is this?", "What song is this?", "What is the name of this song?"};

    List<String> songLabels;

    public SongQuestion(String langCode) {
        super(langCode);
    }

    @Override
    public void setQuery() {
        this.sparqlQuery =
                "SELECT DISTINCT ?songLabel ?link " +
                        "WHERE {" +
                        "  {" +
                        "    SELECT DISTINCT ?songLabel (SAMPLE(?link) AS ?link)" +
                        "    WHERE {" +
                        "      ?song wdt:P31 wd:Q105543609;           " +
                        "            rdfs:label ?songLabel;            " +
                        "            wdt:P1651 ?link.                   " +
                        "      FILTER(LANG(?songLabel) = \"es\" || LANG(?songLabel) = \"en\") " +
                        "    }" +
                        "    GROUP BY ?songLabel" +
                        "  }" +
                        "}" +
                        "LIMIT 100";
    }

    @Override
    public void processResults() {
        songLabels=new ArrayList<>();
        List<Question> questions = new ArrayList<>();
        List<Answer> answers = new ArrayList<>();

        for (int i = 0; i < results.length(); i++) {

            JSONObject result = results.getJSONObject(i);


            JSONObject songLabelObject = result.getJSONObject("songLabel");
            String songLabel = songLabelObject.getString("value");

            JSONObject linkObject = result.getJSONObject("link");
            String link = linkObject.getString("value");

            if (needToSkip(songLabel))
                continue;

            String musicVideoLink = "https://www.youtube.com/watch?v=" + link;

            Answer a = new Answer(songLabel, AnswerCategory.SONG, langCode);
            answers.add(a);

            if (langCode.equals("es"))
                questions.add(new Question(a, spanishStringsIni[i%4] + QGHelper.LINKCONCAT + musicVideoLink, QuestionCategory.MUSIC, QuestionType.AUDIO));
            else
                questions.add(new Question(a, englishStringsIni[i%4] + QGHelper.LINKCONCAT + musicVideoLink, QuestionCategory.MUSIC, QuestionType.AUDIO));
        }

        repository.saveAll(new ArrayList<>(answers));
        repository.saveAll(new ArrayList<>(questions));
    }

    private boolean needToSkip(String songLabel) {
        if (songLabels.contains(songLabel)) {
            return true;
        }
        songLabels.add(songLabel);

        if (QGHelper.isEntityName(songLabel)){
            return true;
        }

        return false;
    }
}
