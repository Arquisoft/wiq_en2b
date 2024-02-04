package lab.en2b.quizapi.auth.config;

import lab.en2b.quizapi.user.UserService;
import lab.en2b.quizapi.auth.jwt.JwtAuthFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter authFilter;
    @Autowired
    public UserService userService;
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        DaoAuthenticationProvider userPasswordProvider = new DaoAuthenticationProvider();
        userPasswordProvider.setUserDetailsService(userService);
        userPasswordProvider.setPasswordEncoder(passwordEncoder());
        authenticationManagerBuilder.authenticationProvider(userPasswordProvider);
        return authenticationManagerBuilder.build();
    }
    /**
     * Security filter used for filtering all petitions, applying cors and asking for authentication among other things
     * @param http the http request to filter
     * @return the filtered request
     * @throws Exception if any problem happens when filtering
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(authorize ->
                authorize.requestMatchers("/auth/login", "/auth/register","/auth/refresh-token").permitAll()
                .anyRequest().authenticated())
                .cors(Customizer.withDefaults())
                //TODO: add exception handling
                .sessionManagement(configuration -> configuration.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();
    }


}
