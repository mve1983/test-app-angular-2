import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';
import { noDoubleCategory } from '../../shared/validators/noDoubleCategory.directive';

@Component({
  selector: 'app-playform',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './playform.component.html',
  styleUrl: './playform.component.css',
})
export class PlayformComponent {
  protected gameService: GameService = inject(GameService);
  private router: Router = inject(Router);

  protected playForm: FormGroup = new FormGroup({
    userData: new FormGroup({
      username: new FormControl(null, Validators.required),
      slogan: new FormControl(null),
    }),
    categories: new FormGroup({
      categoryOne: new FormControl(
        'General Knowledge',
        noDoubleCategory(this.gameService)
      ),
      difficultyOne: new FormControl('easy'),
      categoryTwo: new FormControl(
        'General Knowledge',
        noDoubleCategory(this.gameService)
      ),
      difficultyTwo: new FormControl('easy'),
      categoryThree: new FormControl(
        'General Knowledge',
        noDoubleCategory(this.gameService)
      ),
      difficultyThree: new FormControl('easy'),
      categoryFour: new FormControl(
        'General Knowledge',
        noDoubleCategory(this.gameService)
      ),
      difficultyFour: new FormControl('easy'),
      categoryFive: new FormControl(
        'General Knowledge',
        noDoubleCategory(this.gameService)
      ),
      difficultyFive: new FormControl('easy'),
    }),
  });

  updateDoubleCheckArray(catgeory: string) {
    (this.gameService.currentlyChoosedCategories as any)[catgeory] =
      this.playForm.get('categories')?.get(catgeory)?.value;

    this.playForm
      .get('categories')
      ?.get('categoryOne')
      ?.updateValueAndValidity();
    this.playForm
      .get('categories')
      ?.get('categoryTwo')
      ?.updateValueAndValidity();
    this.playForm
      .get('categories')
      ?.get('categoryThree')
      ?.updateValueAndValidity();
    this.playForm
      .get('categories')
      ?.get('categoryFour')
      ?.updateValueAndValidity();
    this.playForm
      .get('categories')
      ?.get('categoryFive')
      ?.updateValueAndValidity();



  }

  onSubmit(): void {
    this.gameService.initializeGameData(this.playForm.value);
    this.gameService.gameScore = []
    this.router.navigate(['/game']);
  }
}
