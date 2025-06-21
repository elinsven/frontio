import { Component, output } from '@angular/core';
import { MatButtonModule } from "@angular/material/button"

@Component({
  selector: 'app-keyboard',
  imports: [MatButtonModule],
  templateUrl: './keyboard.component.html',
})
export class KeyboardComponent {
  letterClick = output<string>();
  enterClick = output<void>();
  backspaceClick = output<void>();

  onLetterClick(letter: string): void {
    this.letterClick.emit(letter);
  }

  onEnterClick(): void {
    this.enterClick.emit();
  }

  onBackspaceClick(): void {
    this.backspaceClick.emit();
  }
}
