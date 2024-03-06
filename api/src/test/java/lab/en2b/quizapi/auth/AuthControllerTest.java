package lab.en2b.quizapi.auth;

import lab.en2b.quizapi.auth.config.SecurityConfig;
import lab.en2b.quizapi.auth.dtos.JwtResponseDto;
import lab.en2b.quizapi.auth.dtos.LoginDto;
import lab.en2b.quizapi.auth.dtos.RefreshTokenDto;
import lab.en2b.quizapi.auth.dtos.RegisterDto;
import lab.en2b.quizapi.auth.dtos.RefreshTokenResponseDto;
import lab.en2b.quizapi.auth.jwt.JwtUtils;
import lab.en2b.quizapi.commons.user.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;

import static lab.en2b.quizapi.commons.utils.TestUtils.asJsonString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc
@Import(SecurityConfig.class)
public class AuthControllerTest {
    @Autowired
    MockMvc mockMvc;
    @MockBean
    AuthService authService;
    @MockBean
    JwtUtils jwtUtils;
    @MockBean
    UserService userService;
    RefreshTokenResponseDto defaultRefreshTokenResponseDto = RefreshTokenResponseDto.builder().build();
    @Test
    void registerUserShouldReturn200() throws Exception {;
        testRegister(asJsonString( new RegisterDto("test@email.com","test","testing"))
                ,status().isOk());
    }
    @Test
    void registerEmptyBodyShouldReturn400() throws Exception {
        testRegister("{}",status().isBadRequest());
    }
    @Test
    void registerEmptyEmailShouldReturn400() throws Exception {
        testRegister(asJsonString( new RegisterDto("","test","testing")),
                status().isBadRequest());
    }

    @Test
    void registerInvalidEmailShouldReturn400() throws Exception {
        testRegister(asJsonString( new RegisterDto("iAmAnInvalidEmail","test","testing")),
                status().isBadRequest());
    }

    @Test
    void registerEmptyUsernameShouldReturn400() throws Exception {
        testRegister(asJsonString( new RegisterDto("test@email.com","","testing")),
                status().isBadRequest());
    }

    @Test
    void registerEmptyPasswordShouldReturn400() throws Exception {
        testRegister(asJsonString( new RegisterDto("test@email.com","test","")),
                status().isBadRequest());
    }

    @Test
    void loginUserShouldReturn200() throws Exception {
        when(authService.login(any())).thenReturn(JwtResponseDto.builder().build());
        testLogin(asJsonString( new LoginDto("test@email.com","password"))
                ,status().isOk());
    }

    @Test
    void loginEmptyBodyShouldReturn400() throws Exception {
        testLogin("{}",status().isBadRequest());
    }
    @Test
    void loginEmptyEmailShouldReturn400() throws Exception {
        testLogin(asJsonString( new LoginDto("","password")),
                status().isBadRequest());
    }

    @Test
    void loginInvalidEmailShouldReturn400() throws Exception {
        testLogin(asJsonString( new LoginDto("iAmAnInvalidEmail","password")),
                status().isBadRequest());
    }

    @Test
    void refreshTokenShouldReturn200() throws Exception {
        when(authService.refreshToken(any())).thenReturn(defaultRefreshTokenResponseDto);
        testRefreshToken(asJsonString( new RefreshTokenDto("58ca95e9-c4ef-45fd-93cf-55c040aaff9c"))
                ,status().isOk());
    }

    @Test
    void refreshTokenEmptyBodyShouldReturn400() throws Exception {
        testRefreshToken("{}",status().isBadRequest());
    }

    @Test
    void refreshTokenEmptyTokenShouldReturn400() throws Exception {
       testRefreshToken(asJsonString( new RefreshTokenDto("")), status().isBadRequest());
    }

    private void testRegister(String content, ResultMatcher code) throws Exception {
        mockMvc.perform(post("/auth/register")
                        .content(content)
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(code);
    }

    private void testLogin(String content, ResultMatcher code) throws Exception {
        mockMvc.perform(post("/auth/login")
                        .content(content)
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(code);
    }

    private void testRefreshToken(String content, ResultMatcher code) throws Exception {
        mockMvc.perform(post("/auth/refresh-token")
                        .content(content)
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(code);
    }
}
