import { createAction, props } from "@ngrx/store";

export enum GuessActionType {
    AddLetter = "[Wordle / Guess] Add Letter",
    RemoveLetter = "[Wordle / Guess] Remove Letter",
    SubmitGuess = "[Wordle / Guess] Submit Guess",
    ResetState = "[Wordle / Guess] Reset State"
}

export const addLetter = createAction(
    GuessActionType.AddLetter,
    props<{ letter: string }>());

export const removeLetter = createAction(
    GuessActionType.RemoveLetter);

export const submitGuess = createAction(
    GuessActionType.SubmitGuess);

export const resetState = createAction(
    GuessActionType.ResetState);
