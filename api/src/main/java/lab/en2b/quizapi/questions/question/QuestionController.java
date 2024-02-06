package lab.en2b.quizapi.questions.question;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    @GetMapping("/dummy")
    private String getDummyQuestion(){
        return "Who the hell is Steve Jobs?";
    }
}
