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
      console.log(this.currentQuestion.correctAnswer)     
    });
  }

  isAnswerCorrect(answer: string) {
    return this.currentQuestion.correctAnswer === answer;
  }

  checkAnswer(ev: Event) {
    let currentElement = (ev.target as HTMLElement);
    currentElement.classList.add("selected");
    this.currentAnswer = currentElement.getAttribute("data-value")!;
    this.isCurrentCorrect = this.isAnswerCorrect(this.currentAnswer);
    // if (this.isCurrentCorrect)
    this.isResult = true;
  }

  nextQuestion() {
    this.isResult = false;
    this.questionService.getQuestion()
    .subscribe(res => {
      Object.assign(this.currentQuestion, res);
      console.log(this.currentQuestion.correctAnswer)     
    });
  }

}
