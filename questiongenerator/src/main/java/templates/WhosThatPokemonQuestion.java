package templates;

import model.*;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class WhosThatPokemonQuestion extends QuestionTemplate {


    List<String> pokemonLabels;

    private static final String[] spanishStrings = {"¿Quién es este Pokémon?", "¿Cuál es este Pokémon?", "¿Qué Pokémon es este?", "¿Cómo se llama este Pokémon?"};
    private static final String[] englishStrings = {"Who's that Pokémon?", "What Pokémon is this?", "What's the name of this Pokémon?", "Who is  this Pokémon?"};

    public WhosThatPokemonQuestion(String langCode) {
        super(langCode);
    }

    @Override
    public void setQuery() {
        this.sparqlQuery = "SELECT ?pokemonLabel ?pokemonIndex " +
                "WHERE { " +
                "  ?pokemon wdt:P1441 wd:Q864; " +
                "           wdt:P1685 ?pokemonIndex. " +
                "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"" + langCode + "\". } " +
                "} ";
    }

    @Override
    public void processResults() {
        pokemonLabels = new ArrayList<>();
        List<Question> questions = new ArrayList<>();
        List<Answer> answers = new ArrayList<>();

        String spanishString = "";
        String englishString = "";

        for (int i = 0; i < results.length(); i++) {
            JSONObject result = results.getJSONObject(i);
            String pokemonLabel = result.getJSONObject("pokemonLabel").getString("value");
            String pokemonIndex = result.getJSONObject("pokemonIndex").getString("value");

            if (needToSkip(pokemonLabel, pokemonIndex)) {
                continue;
            }

            int pokedexNum = Integer.parseInt(pokemonIndex);

            Answer a = new Answer(pokemonLabel, AnswerCategory.WTPOKEMON, langCode);
            answers.add(a);

            if (langCode.equals("es")){
                spanishString = spanishStrings[i%4] + QGHelper.LINKCONCAT + "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokedexNum + ".png";
                questions.add(new Question(a, spanishString, QuestionCategory.POKEMON, QuestionType.TEXT));
            }
            else{
                englishString = englishStrings[i%4] + QGHelper.LINKCONCAT + "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokedexNum + ".png";
                questions.add(new Question(a, englishString, QuestionCategory.POKEMON, QuestionType.TEXT));
            }
        }

        repository.saveAll(new ArrayList<>(answers));
        repository.saveAll(new ArrayList<>(questions));
    }

    private boolean needToSkip(String pokemonLabel, String pokemonIndex){
        if (pokemonLabels.contains(pokemonLabel)) {
            return true;
        }
        pokemonLabels.add(pokemonLabel);

        // If pokemonIndex is not a number, skip
        try {
            Integer.parseInt(pokemonIndex);
        } catch (NumberFormatException e) {
            return true;
        }

        return false;
    }
}
