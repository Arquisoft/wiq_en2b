package lab.en2b.quizapi.questions.question;

import jakarta.validation.Valid;
import jakarta.validation.constraints.PositiveOrZero;
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

    @PostMapping("/{questionId}/answer")
    private ResponseEntity<AnswerCheckResponseDto> answerQuestion(@PathVariable @PositiveOrZero Long questionId, @Valid @RequestBody AnswerDto answerDto){
        return ResponseEntity.ok(questionService.answerQuestion(questionId,answerDto));
    }

    @GetMapping("/new")
    private ResponseEntity<QuestionResponseDto> generateQuestion(@RequestParam String lang){
        return ResponseEntity.ok(questionService.getRandomQuestion(lang));
    }

    @GetMapping("/{id}")
    private ResponseEntity<QuestionResponseDto> getQuestionById(@PathVariable @PositiveOrZero Long id){
        return ResponseEntity.ok(questionService.getQuestionById(id));
    }
}
