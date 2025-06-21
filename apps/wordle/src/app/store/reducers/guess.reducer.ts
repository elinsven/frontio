import { createReducer, on } from "@ngrx/store"
import { Guess, GuessStatus, Letter, LetterStatus } from "../../types"
import { addLetter, removeLetter, resetState, submitGuess } from "../actions/guess.actions"

export interface WordleState {
    guess: GuessState;
}

export interface GuessState {
    guesses: Guess[];
    answer: string;
}

const initialState: GuessState = {
    guesses: [
        { id: "1", status: GuessStatus.Active, letters: [] },
        { id: "2", status: GuessStatus.Pending, letters: [] },
        { id: "3", status: GuessStatus.Pending, letters: [] },
        { id: "4", status: GuessStatus.Pending, letters: [] },
        { id: "5", status: GuessStatus.Pending, letters: [] },
        { id: "6", status: GuessStatus.Pending, letters: [] }
    ],
    answer: "APPLE" // TODO This should be set to the actual answer word
}

export const guessReducer = createReducer(
    initialState,
    on(addLetter, (state, { letter }) => {
        const currentGuess = state.guesses.find(g => g.status === GuessStatus.Active);
        if (currentGuess) {
            return {
                ...state,
                guesses: state.guesses.map(g =>
                    g.id === currentGuess.id && g.letters.length < 5
                        ? { ...g, letters: [...g.letters, { letter }] }
                        : g
                )
            };
        }
        return state;
    }),
    on(removeLetter, (state) => {
        const currentGuess = state.guesses.find(g => g.status === GuessStatus.Active);
        if (currentGuess && currentGuess.letters.length > 0) {
            return {
                ...state,
                guesses: state.guesses.map(g =>
                    g.id === currentGuess.id
                        ? { ...g, letters: g.letters.slice(0, -1) }
                        : g
                )
            };
        }
        return state;
    }),
    on(submitGuess, (state) => {
        const currentGuess = state.guesses.find(g => g.status === GuessStatus.Active);
        if (currentGuess && currentGuess.letters.length === 5) {
            const currentIndex = state.guesses.findIndex(g => g.id === currentGuess.id);
            return {
                ...state,
                guesses: state.guesses.map((g, index) => {
                    if (index === currentIndex) {
                        return { ...g, status: GuessStatus.Submitted, letters: setLetterStatus(g, state.answer) };
                    }

                    if (index === currentIndex + 1 && index < state.guesses.length) {
                        return { ...g, status: GuessStatus.Active };
                    }

                    return g
                }
                )
            };
        }
        return state;
    }),
    on(resetState, () => initialState
    )
)

function setLetterStatus(guess: Guess, answer: string): Letter[] {
    const answerLetterCounts: Record<string, number> = {};

    for (const letter of answer) {
        answerLetterCounts[letter] = (answerLetterCounts[letter] || 0) + 1;
    }

    const result = guess.letters.map((letterObj, index) => {
        const letter = letterObj.letter;
        if (answer[index] === letter) {
            answerLetterCounts[letter]--;
            return { ...letterObj, status: LetterStatus.Correct };
        }
        return { ...letterObj, status: null };
    });

    return result.map((letterObj) => {
        if (letterObj.status === LetterStatus.Correct) {
            return letterObj;
        }

        const letter = letterObj.letter;
        if (answerLetterCounts[letter] > 0) {
            answerLetterCounts[letter]--;
            return { ...letterObj, status: LetterStatus.WrongPosition };
        } else {
            return { ...letterObj, status: LetterStatus.NotInWord };
        }
    });
}