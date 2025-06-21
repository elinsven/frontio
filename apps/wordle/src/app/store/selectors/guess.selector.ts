import { createSelector } from "@ngrx/store";
import { GuessState, WordleState } from "../reducers/guess.reducer";

const getGuessState = (state: WordleState) => state.guess;

export const getGuesses = createSelector(
    getGuessState,
    (state: GuessState
    ) => state.guesses
);