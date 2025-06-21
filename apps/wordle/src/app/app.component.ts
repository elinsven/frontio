import { Component, computed, inject, OnInit } from '@angular/core';
import { GuessListComponent } from "./components/guess-list/guess-list.component";
import { KeyboardComponent } from "./components/keyboard/keyboard.component";
import { Store } from '@ngrx/store';
import { getGuesses } from './store/selectors/guess.selector';
import { addLetter, removeLetter, resetState, submitGuess } from './store/actions/guess.actions';
import { MatButtonModule } from '@angular/material/button';
import { GuessStatus } from './types';
import { loadWords } from './store/actions/words.action';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

@Component({
  imports: [GuessListComponent, KeyboardComponent, MatButtonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);

  readonly guesses = this.store.selectSignal(getGuesses);
  readonly gameOver = computed(() => this.guesses().every(g => g.status === GuessStatus.Submitted));

  ngOnInit(): void {
    this.store.dispatch(loadWords());
  }

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
