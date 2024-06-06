import { Component } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Question } from '../models/question.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
  currentQuestion: Question = new Question();
  currentAnswer: string = "";
  isResult: boolean = false;
  isCurrentCorrect: boolean = false;

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.questionService.getQuestion()
    .subscribe(res => {
      Object.assign(this.currentQuestion, res);     
    });
  }

  isAnswerCorrect(answer: string) {
    return this.currentQuestion.correctAnswer === answer;
  }

  checkAnswer(ev: Event) {
    let currentElement = (ev.target as HTMLElement);
    this.currentAnswer = currentElement.getAttribute("data-value")!;
    this.isCurrentCorrect = this.isAnswerCorrect(this.currentAnswer);
    this.isResult = true;
  }

  nextQuestion() {
    // reset to default
    this.currentAnswer = "";
    this.isResult = false;
    // getting new question
    this.questionService.getQuestion()
    .subscribe( {next: (res: Response) => {
      Object.assign(this.currentQuestion, res);
    console.log(this.currentQuestion);
    },
    error: (err: HttpErrorResponse) => {
      console.log(err.error);
      this.currentQuestion = new Question();
    }
    
  });
}

}
