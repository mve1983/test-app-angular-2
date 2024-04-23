import { Component, inject } from '@angular/core';
import { GameService } from '../services/game.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  protected gameService: GameService = inject(GameService);
  questionCount = 1;

  protected giveAnswer(answer: string) {
    this.gameService.gameScore.push({
      question: this.gameService.question().question,
      yourAnswer: answer,
      correctAnswer: this.gameService.question().correctAnswer,
      difficulty: this.gameService.question().difficulty,
      yourPoints: this.calculatePoints(
        answer,
        this.gameService.question().correctAnswer,
        this.gameService.question().difficulty
      ),
    });

    this.gameService.question.set({
      question: '',
      possibleAnswers: [],
      correctAnswer: '',
      category: '',
      difficulty: '',
    });

    this.questionCount++;
    if (this.questionCount > 5) return;
    this.gameService.fetchHelper(this.questionCount);
  }

  private calculatePoints(
    given: string,
    correct: string,
    difficulty: string
  ): number {
    if (given !== correct) return 0;

    if (difficulty.toLowerCase() === 'easy') return 2;
    if (difficulty.toLowerCase() === 'medium') return 4;
    if (difficulty.toLowerCase() === 'hard') return 6;

    return 0;
  }

  protected totalPoints() {
   return this.gameService.gameScore.reduce((a, c) => {
      return a + c.yourPoints
    },0);
  }
}
