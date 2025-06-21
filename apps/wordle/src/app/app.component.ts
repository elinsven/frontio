import { Component, computed, inject } from '@angular/core';
import { GuessListComponent } from "./components/guess-list/guess-list.component";
import { KeyboardComponent } from "./components/keyboard/keyboard.component";
import { Store } from '@ngrx/store';
import { getGuesses } from './store/selectors/guess.selector';
import { addLetter, removeLetter, resetState, submitGuess } from './store/actions/guess.actions';
import { MatButtonModule } from '@angular/material/button';
import { GuessStatus } from './types';

@Component({
  imports: [GuessListComponent, KeyboardComponent, MatButtonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly store = inject(Store);

  readonly guesses = this.store.selectSignal(getGuesses);
  readonly gameOver = computed(() => this.guesses().every(g => g.status === GuessStatus.Submitted));

  onLetterClick(letter: string): void {
    this.store.dispatch(addLetter({ letter }));
  }

  onEnterClick(): void {
    this.store.dispatch(submitGuess())
  }

  onBackspaceClick(): void {
    this.store.dispatch(removeLetter())
  }

  onNewGameClick(): void {
    this.store.dispatch(resetState())
  }
}
