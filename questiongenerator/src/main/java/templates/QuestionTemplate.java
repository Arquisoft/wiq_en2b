package templates;

import repositories.AnswerRepositoryImpl;
import repositories.QuestionRepositoryImpl;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
public abstract class QuestionTemplate {
    protected String sparqlQuery;
    protected JSONArray results;
    protected String langCode = "es";

    protected AnswerRepositoryImpl answerRepository;
    protected QuestionRepositoryImpl questionRepository;

    public QuestionTemplate(String langCode) {
        this.answerRepository = new AnswerRepositoryImpl();
        this.questionRepository = new QuestionRepositoryImpl();

        this.langCode = langCode;
        setQuery();
        call();
        processResults();
    }

    public abstract void setQuery();

    public void call() {
        // Set up the HTTP client
        HttpClient httpClient = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://query.wikidata.org/sparql"))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .header("Accept", "application/json")  // Specify JSON format
                .POST(HttpRequest.BodyPublishers.ofString("query=" + sparqlQuery))
                .build();

        // Send the HTTP request and get the response
        HttpResponse<String> response = null;
        try {
            response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        JSONObject jsonResponse = new JSONObject(response.body());
        JSONArray results = jsonResponse.getJSONObject("results").getJSONArray("bindings");

        this.results = results; // Save the results. If this method is overwritten this line MUST be kept
    }

    public abstract void processResults();

}
