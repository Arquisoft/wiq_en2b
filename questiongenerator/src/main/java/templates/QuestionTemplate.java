package templates;

import repositories.GeneralRepositoryStorer;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

/**
 * Base template for questions to be implemented in the future.
 */
public abstract class QuestionTemplate {
    // Query to be sent to WikiData QS
    protected String sparqlQuery;
    // Response given by WikiData QS for the query sent
    protected JSONArray results;
    // Language code representing in what language the query must be sent. Spanish as a default value.
    protected String langCode = "es";

    protected GeneralRepositoryStorer repository = new GeneralRepositoryStorer();

    /**
     * Constructor for QuestionTemplates which is also the one in charge of the whole question retrieval process for a query
     * For future types of question, only need to override abstract methods and calling super() on constructor
     * When instancing a question, only constructor invocation is required.
     * For reference in future implementations: look at CountryCapitalQuestion
     */
    public QuestionTemplate(String langCode) {
        this.langCode = langCode;
        setQuery();
        call();
        processResults();
    }

    /**
     * Update the value of @sparqlQuery with the query to be sent.
     */
    protected abstract void setQuery();

    /**
     * Method for the whole processing the @results given by WikiData QS as a JSON.
     * It also is in charge of storing both the processed answers and the question in all languages
     */
    protected abstract void processResults();

    /**
     * Method in charge of the HTTP request with WikiData QS.
     * It allows to send only one query, so it does not support questions whose answer require multiple queries.
     * CAUTION: Remember to update the results field of the field if this method gets overwritten.
     */
    private void call() {
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
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException(e);
        }

        JSONObject jsonResponse = new JSONObject(response.body());
        JSONArray results = jsonResponse.getJSONObject("results").getJSONArray("bindings");

        this.results = results; // Save the results. If this method is overwritten this line MUST be kept
    }

}
