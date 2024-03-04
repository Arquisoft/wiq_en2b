package lab.en2b.quizapi.questions;

import lab.en2b.quizapi.auth.config.SecurityConfig;
import lab.en2b.quizapi.auth.jwt.JwtUtils;
import lab.en2b.quizapi.commons.user.UserService;
import lab.en2b.quizapi.questions.question.QuestionController;
import lab.en2b.quizapi.questions.question.QuestionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(QuestionController.class)
@AutoConfigureMockMvc
@Import(SecurityConfig.class)
public class QuestionControllerTest {
    @Autowired
    MockMvc mockMvc;
    @MockBean
    JwtUtils jwtUtils;
    @MockBean
    QuestionService questionService;
    @MockBean
    UserService userService;
    @Test
    void getQuestionNoAuthShouldReturn403() throws Exception {
        mockMvc.perform(get("/questions")
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isForbidden());
    }
    @Test
    void getQuestionShouldReturn200() throws Exception {
        mockMvc.perform(get("/questions")
                        .with(user("test").roles("user"))
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isOk());
    }
}
