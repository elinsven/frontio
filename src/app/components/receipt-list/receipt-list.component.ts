import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Receipt } from 'src/app/models/receipt/Receipt';

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.scss'],
})
export class ReceiptListComponent {
  @Input() receipts50$: Observable<Receipt[]> = of([]);
  @Input() receipts100$: Observable<Receipt[]> = of([]);
  @Output() removeReceipt = new EventEmitter<Receipt>();
}
