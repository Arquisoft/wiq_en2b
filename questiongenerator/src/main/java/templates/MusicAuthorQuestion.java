package templates;

import model.*;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class MusicAuthorQuestion extends QuestionTemplate {


    List<String> authorLabels;

    private static final String[] spanishStringsIni = {"¿Quién es el autor de '", "¿Quién canta '", "¿Quién es el cantante de '", "¿Quién es el intérprete de '"};
    private static final String[] englishStringsIni= {"Who is the author of '", "Who sings '", "Who is the singer of '", "Who is the performer of '"};

    private static final String[] spanishStringsFin = {"'?", "'?", "'?", "'?"};
    private static final String[] englishStringsFin = {"'?", "'?", "'?", "'?"};


    public MusicAuthorQuestion(String langCode) {
        super(langCode);
    }

    @Override
    public void setQuery() {
        this.sparqlQuery = "SELECT DISTINCT ?songLabel ?performerLabel ?awardLabel  " +
                "WHERE { " +
                "  ?song wdt:P31 wd:Q134556; " +
                "        wdt:P175 ?performer; " +
                "        p:P166 ?statement. " +
                "  ?statement ps:P166 ?award. " +
                "  SERVICE wikibase:label { " +
                "    bd:serviceParam wikibase:language \"en, es\"." +
                "  } " +
                "}" +
                "LIMIT 100";
    }

    @Override
    public void processResults() {
        authorLabels = new ArrayList<>();
        List<Question> questions = new ArrayList<>();
        List<Answer> answers = new ArrayList<>();

        for (int i = 0; i < results.length(); i++) {
            JSONObject result = results.getJSONObject(i);

            String songLabel = "";
            String performerLabel = "";

            try {
                JSONObject songObject = result.getJSONObject("songLabel");
                songLabel = songObject.getString("value");

                JSONObject performerLabelObject = result.getJSONObject("performerLabel");
                performerLabel = performerLabelObject.getString("value");
            } catch (Exception e) {
                continue;
            }

            if (needToSkip(songLabel, performerLabel))
                continue;

            Answer a = new Answer(performerLabel, AnswerCategory.SONG, langCode);
            answers.add(a);

            String questionString = "";

            if (langCode.equals("es"))
                questionString = spanishStringsIni[i%4] + songLabel + spanishStringsFin[i%4];
            else
                questionString = englishStringsIni[i%4] + songLabel + englishStringsFin[i%4];

            questions.add(new Question(a, questionString, QuestionCategory.MUSIC, QuestionType.TEXT));
        }

        repository.saveAll(new ArrayList<>(answers));
        repository.saveAll(new ArrayList<>(questions));
    }

    private boolean needToSkip(String musicLabel, String genreLabel) {
        if (authorLabels.contains(musicLabel)) {
            return true;
        }
        authorLabels.add(musicLabel);

        if (musicLabel.equals("") || genreLabel.equals(""))
            return true;
        if (QGHelper.isEntityName(musicLabel) || QGHelper.isEntityName(genreLabel))
            return true;

        return false;
    }
}
