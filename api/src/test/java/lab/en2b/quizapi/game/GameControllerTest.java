package lab.en2b.quizapi.game;

import lab.en2b.quizapi.auth.config.SecurityConfig;
import lab.en2b.quizapi.auth.jwt.JwtUtils;
import lab.en2b.quizapi.commons.user.UserService;
import lab.en2b.quizapi.questions.question.QuestionController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(GameController.class)
@AutoConfigureMockMvc
@Import(SecurityConfig.class)
public class GameControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    JwtUtils jwtUtils;

    @MockBean
    UserService userService;

    @MockBean
    GameService gameService;

    @Test
    void newQuestionShouldReturn403() throws Exception{
        mockMvc.perform(post("/games/new")
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isForbidden());
    }

    @Test
    void newQuestionShouldReturn200() throws Exception{
        mockMvc.perform(post("/games/new")
                        .with(user("test").roles("user"))
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    void startRoundShouldReturn403() throws Exception{
        mockMvc.perform(post("/games/1/startRound")
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isForbidden());
    }

    @Test
    void startRoundShouldReturn200() throws Exception{
        mockMvc.perform(post("/games/1/startRound")
                        .with(user("test").roles("user"))
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    void getCurrentQuestionShouldReturn403() throws Exception{
        mockMvc.perform(get("/games/1/question")
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isForbidden());
    }

    @Test
    void getCurrentQuestionShouldReturn200() throws Exception{
        mockMvc.perform(get("/games/1/question")
                        .with(user("test").roles("user"))
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    void answerQuestionShouldReturn403() throws Exception{
        mockMvc.perform(post("/games/1/answer?answerId=1")
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isForbidden());
    }

    @Test
    void answerQuestionShouldReturn200() throws Exception{
        mockMvc.perform(post("/games/1/answer?answerId=1")
                        .with(user("test").roles("user"))
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    void answerQuestionShouldReturn400() throws Exception{
        mockMvc.perform(post("/games/1/answer")
                        .with(user("test").roles("user"))
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    void changeLanguageShouldReturn403() throws Exception{
        mockMvc.perform(post("/games/1/language?language=en")
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isForbidden());
    }

    @Test
    void changeLanguageShouldReturn200() throws Exception{
        mockMvc.perform(post("/games/1/language?language=en")
                        .with(user("test").roles("user"))
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isOk());
    }

}
