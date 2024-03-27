package lab.en2b.quizapi.swagger;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis("api/src/main/java/lab/en2b/quizapi/questions")
                .paths(PathSelectors.any())
                .build()
                ;

    }

}
