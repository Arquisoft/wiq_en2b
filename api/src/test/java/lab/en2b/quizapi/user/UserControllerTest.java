package lab.en2b.quizapi.user;

import lab.en2b.quizapi.auth.config.SecurityConfig;
import lab.en2b.quizapi.auth.jwt.JwtUtils;
import lab.en2b.quizapi.commons.user.UserController;
import lab.en2b.quizapi.commons.user.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc
@Import(SecurityConfig.class)
public class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    JwtUtils jwtUtils;

    @MockBean
    UserService userService;

    @Test
    void getPersonalDetailsShouldReturn200() throws Exception{
        mockMvc.perform(get("/users/details")
                        .with(user("test").roles("user")))
                .andExpect(status().isOk());
    }

    @Test
    void getPersonalDetailsShouldReturn403() throws Exception{
        mockMvc.perform(get("/users/details"))
                .andExpect(status().isForbidden());
    }

}
