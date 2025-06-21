import { createAction, props } from '@ngrx/store';

export enum WordsActionType {
    LoadWords = '[Wordle / Words] Load Words',
    LoadWordsSuccess = '[Wordle / Words] Load Words Success',
    LoadWordsFailure = '[Wordle / Words] Load Words Failure'
}

export const loadWords = createAction(WordsActionType.LoadWords);

export const loadWordsSuccess = createAction(
    WordsActionType.LoadWordsSuccess,
    props<{ words: string[] }>()
);

export const loadWordsFailure = createAction(
    WordsActionType.LoadWordsFailure,
    props<{ error: any }>()
);
