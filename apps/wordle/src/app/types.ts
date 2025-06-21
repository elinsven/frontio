export interface Guess {
    id: string;
    status: GuessStatus;
    letters: Letter[];
}

export interface Letter {
    letter: string;
    status?: LetterStatus;
}

export enum GuessStatus {
    Active = "active",
    Submitted = "submitted",
    Pending = "pending",
}

export enum LetterStatus {
    Correct = "correct",
    WrongPosition = "wrongPosition",
    NotInWord = "notInWord",
}