import { Injectable, inject } from "@angular/core";
import { mergeMap, map, catchError, of } from "rxjs";
import { WordsService } from "../../services/words.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadWords, loadWordsFailure, loadWordsSuccess } from "../actions/words.action";

@Injectable()
export class WordsEffects {
private readonly actions$ = inject(Actions);
private readonly wordsService = inject(WordsService);


  loadWords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWords),
      mergeMap(() =>
        this.wordsService.getWords().pipe(
          map(response => loadWordsSuccess({ words: response.words })),
          catchError(error => of(loadWordsFailure({ error })))
        )
      )
    )
  );

}