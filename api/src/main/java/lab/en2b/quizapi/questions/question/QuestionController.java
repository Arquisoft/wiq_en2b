package lab.en2b.quizapi.questions.question;

import lab.en2b.quizapi.questions.answer.dtos.AnswerDto;
import lab.en2b.quizapi.questions.question.dtos.AnswerCheckResponseDto;
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

    // TODO: REMOVE WHEN NOT USED FOR TESTING
    @GetMapping
    private ResponseEntity<List<QuestionResponseDto>> getQuestions() {
        return ResponseEntity.ok(questionService.getQuestions());
    }

    @PostMapping("/{questionId}/answer")
    private ResponseEntity<AnswerCheckResponseDto> answerQuestion(@PathVariable Long questionId, @RequestBody AnswerDto answerDto){
        return ResponseEntity.ok(questionService.answerQuestion(questionId,answerDto));
    }

    @GetMapping("/new")
    private ResponseEntity<QuestionResponseDto> generateQuestion(){
        return ResponseEntity.ok(questionService.getQuestion());
    }

    @GetMapping("/{id}")
    private ResponseEntity<QuestionResponseDto> getQuestionById(@PathVariable Long id){
        return ResponseEntity.ok(questionService.getQuestionById(id));
    }
}
