package lab.en2b.quizapi.questions.question;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionService questionService;

    @GetMapping("/dummy")
    private String getDummyQuestion(){
        return "Who the hell is Steve Jobs?";
    }

    @GetMapping("/questions")
    private ResponseEntity<List<Question>> getQuestions() { return ResponseEntity.ok(questionService.getQuestions()); }
}
