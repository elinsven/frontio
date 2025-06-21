import { Component, input } from '@angular/core';
import { Letter, LetterStatus } from '../../types';

@Component({
  selector: 'app-guess-row',
  imports: [],
  templateUrl: './guess-row.component.html',
})
export class GuessRowComponent {
  guess = input<Letter[]>();
  
  readonly letterStatus = LetterStatus;
}
