import { Component } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Question } from '../models/question.model';

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
    this.currentAnswer = (ev.target as HTMLElement).getAttribute("data-value")!;
    this.isCurrentCorrect = this.isAnswerCorrect(this.currentAnswer);
    this.isResult = true;
  }

  nextQuestion() {
    // reset to default
    this.currentAnswer = "";
    this.isResult = false;
    // getting new question
    this.questionService.getQuestion()
    .subscribe( {next: (res) => {
      Object.assign(this.currentQuestion, res);
    console.log(this.currentQuestion);
    },
    error: (err) => {
      console.log(err.error);
      this.currentQuestion = new Question();
    } 
  });
  }
}
