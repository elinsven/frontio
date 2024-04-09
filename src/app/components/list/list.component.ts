import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Receipt } from 'src/app/models/receipt/Receipt';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() receipts$: Observable<Receipt[]> = of([]);
  @Output() removeReceipt = new EventEmitter<Receipt>();
}
