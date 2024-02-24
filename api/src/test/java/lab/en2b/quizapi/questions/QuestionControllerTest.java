package lab.en2b.quizapi.questions;

import lab.en2b.quizapi.auth.config.SecurityConfig;
import lab.en2b.quizapi.questions.question.QuestionController;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(QuestionController.class)
@AutoConfigureMockMvc
@Import(SecurityConfig.class)
public class QuestionControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Test
    void getQuestionShouldReturn200() throws Exception {
        mockMvc.perform(get("/questions")
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isOk());
    }
}
