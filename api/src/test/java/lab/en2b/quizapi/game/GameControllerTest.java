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

}
