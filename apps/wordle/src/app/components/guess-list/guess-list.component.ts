import { Component, input } from '@angular/core';
import { GuessRowComponent } from "../guess-row/guess-row.component";
import { Guess } from '../../types';

@Component({
  selector: 'app-guess-list',
  imports: [GuessRowComponent],
  templateUrl: './guess-list.component.html',
})
export class GuessListComponent {
  guesses = input.required<Guess[]>()

}
