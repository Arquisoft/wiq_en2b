package lab.en2b.quizapi.questions;

import lab.en2b.quizapi.auth.config.SecurityConfig;
import lab.en2b.quizapi.auth.jwt.JwtUtils;
import lab.en2b.quizapi.commons.user.UserService;
import lab.en2b.quizapi.questions.answer.dtos.AnswerDto;
import lab.en2b.quizapi.questions.question.QuestionController;
import lab.en2b.quizapi.questions.question.QuestionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import static lab.en2b.quizapi.commons.utils.TestUtils.asJsonString;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
    void newQuestionShouldReturn403() throws Exception{
        mockMvc.perform(get("/questions/new?lang=en")
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isForbidden());
    }

    @Test
    void newQuestionShouldReturn200() throws Exception{
        mockMvc.perform(get("/questions/new?lang=en")
                        .with(user("test").roles("user"))
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    void newQuestionNoLangShouldReturn200() throws Exception{
        mockMvc.perform(get("/questions/new")
                        .with(user("test").roles("user"))
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    void questionByIdShouldReturn403() throws Exception{
        mockMvc.perform(get("/questions/1")
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isForbidden());
    }

    @Test
    void questionByIdShouldReturn200() throws Exception{
        mockMvc.perform(get("/questions/1")
                        .with(user("test").roles("user"))
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isOk());
    }
    @Test
    void questionNegativeIdShouldReturn400() throws Exception{
        mockMvc.perform(get("/questions/-1")
                        .with(user("test").roles("user"))
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    void answerQuestionShouldReturn403() throws Exception{
        mockMvc.perform(get("/questions/1/answer")
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isForbidden());
    }

    @Test
    void answerQuestionShouldReturn200() throws Exception{
        mockMvc.perform(post("/questions/1/answer")
                        .content(asJsonString(new AnswerDto(1L)))
                        .with(user("test").roles("user"))
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    void answerQuestionEmptyDtoShouldReturn400() throws Exception{
        mockMvc.perform(post("/questions/1/answer")
                        .content(asJsonString(new AnswerDto()))
                        .with(user("test").roles("user"))
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }
    @Test
    void answerQuestionEmptyBodyShouldReturn400() throws Exception{
        mockMvc.perform(post("/questions/1/answer")
                        .with(user("test").roles("user"))
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }
    @Test
    void answerQuestionNegativeQuestionIdShouldReturn400() throws Exception{
        mockMvc.perform(post("/questions/1/answer")
                        .with(user("test").roles("user"))
                        .content(asJsonString(new AnswerDto(-1L)))
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }
    @Test
    void answerQuestionNegativeIdShouldReturn400() throws Exception{
        mockMvc.perform(post("/questions/-1/answer")
                        .with(user("test").roles("user"))
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    void getQuestionCategoriesShouldReturn200() throws Exception{
        mockMvc.perform(get("/questions/categories")
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().isOk());
    }
}
