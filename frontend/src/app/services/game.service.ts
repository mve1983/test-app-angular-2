import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, map } from 'rxjs/operators';
import {
  CurrentlyChoosedCategories,
  GameCategory,
  GameData,
  GameScore,
  Question,
} from '../../types/game';

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly http: HttpClient = inject(HttpClient);
  private lastFetch = 0;
  private fetchInterval: ReturnType<typeof setInterval>;
  private apiToken = '';

  public gameCategories: GameCategory[] = [];
  public gameDifficulties = ['easy', 'medium', 'hard'];
  public gameData: GameData;
  public question = signal<Question>({
    question: '',
    possibleAnswers: [],
    correctAnswer: '',
    category: '',
    difficulty: '',
  });
  public gameScore: GameScore[] = [];
  public currentlyChoosedCategories: CurrentlyChoosedCategories = {
    categoryOne: 'General Knowledge',
    categoryTwo: 'General Knowledge',
    categoryThree: 'General Knowledge',
    categoryFour: 'General Knowledge',
    categoryFive: 'General Knowledge',
  };

  public getGameToken(refresh: boolean = false): void {
    if (!refresh) return;
    this.http
      .get('https://opentdb.com/api_token.php?command=request')
      .pipe(
        first(),
        map((res: any) => res)
      )
      .subscribe((res) => (this.apiToken = res.token));
  }

  public getGameCategories(refresh: boolean = false): void {
    if (!refresh) return;
    this.http
      .get('https://opentdb.com/api_category.php')
      .pipe(
        first(),
        map((res: any) => res)
      )
      .subscribe((res) => (this.gameCategories = res.trivia_categories));
  }

  public initializeGameData(input: GameData): void {
    this.gameData = input;
    this.fetchQuestion(1);
  }

  // this is needed, because the open trivia db as a free and open db
  // will send timeouts if another request is fired in under 5s
  public fetchHelper(question: number) {
    this.fetchInterval = setInterval(() => {
      if (Math.abs(Date.now() - this.lastFetch) > 5500) {
        this.fetchQuestion(question);
        clearInterval(this.fetchInterval);
      }
    }, 100);
  }

  private fetchQuestion(question: number): void {
    this.lastFetch = Date.now();
    let category: number | undefined;
    let difficulty: string | undefined;

    switch (question) {
      case 1:
        category = this.gameCategories.filter(
          (category) => category.name === this.gameData.categories.categoryOne
        )[0].id;
        difficulty = this.gameData.categories.difficultyOne.toLowerCase();
        break;
      case 2:
        category = category = this.gameCategories.filter(
          (category) => category.name === this.gameData.categories.categoryTwo
        )[0].id;
        difficulty = this.gameData.categories.difficultyTwo.toLowerCase();
        break;
      case 3:
        category = category = this.gameCategories.filter(
          (category) => category.name === this.gameData.categories.categoryThree
        )[0].id;
        difficulty = this.gameData.categories.difficultyThree.toLowerCase();
        break;
      case 4:
        category = category = this.gameCategories.filter(
          (category) => category.name === this.gameData.categories.categoryFour
        )[0].id;
        difficulty = this.gameData.categories.difficultyFour.toLowerCase();
        break;
      case 5:
        category = category = this.gameCategories.filter(
          (category) => category.name === this.gameData.categories.categoryFive
        )[0].id;
        difficulty = this.gameData.categories.difficultyFive.toLowerCase();
        break;
      default:
        console.log(`Upsi`);
    }

    this.http
      .get(
        `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple&token=${this.apiToken}`
      )
      .pipe(
        first(),
        map((res: any) => res)
      )
      .subscribe((res) => {
        this.question.set({
          question: res.results[0].question,
          possibleAnswers: this.shuffleArray([
            res.results[0].correct_answer,
            ...res.results[0].incorrect_answers,
          ]),
          correctAnswer: res.results[0].correct_answer,
          category: res.results[0].category,
          difficulty: res.results[0].difficulty,
        });
      });
  }

  private shuffleArray(array: any[]): any {
    let currentIndex = array.length;
    let newArray = array;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [newArray[currentIndex], newArray[randomIndex]] = [
        newArray[randomIndex],
        newArray[currentIndex],
      ];
    }

    return newArray;
  }
}
