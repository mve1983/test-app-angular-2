import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { GameService } from '../../app/services/game.service';
import { arrayValuesAreUnique } from '../utils/arrayValuesAreUnique';

export function noDoubleCategory(gameService: GameService): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let forbidden = false;
    const currentlyChoosedCategories = Object.values(
      gameService.currentlyChoosedCategories
    );
    if (!currentlyChoosedCategories.every(arrayValuesAreUnique)) forbidden = true;
    return forbidden ? { doubleCategory: { value: control.value } } : null;
  };
}

