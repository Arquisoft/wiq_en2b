package lab.en2b.quizapi.questions.question;

import lab.en2b.quizapi.questions.answer.dtos.AnswerDto;
import lab.en2b.quizapi.questions.question.dtos.QuestionResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping
    private ResponseEntity<List<QuestionResponseDto>> getQuestions() {
        return ResponseEntity.ok(questionService.getQuestions());
    }

    @PostMapping("/{questionId}/answer")
    private ResponseEntity<String> answerQuestion(@RequestParam Long questionId, @RequestBody AnswerDto answerDto){
        return ResponseEntity.ok(questionService.answerQuestion(questionId,answerDto));
    }

    @GetMapping("/new")
    private ResponseEntity<Question> generateQuestion(){
        return ResponseEntity.ok(questionService.getQuestion());
    }
}
