import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Receipt } from 'src/app/models/receipt/Receipt';

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.scss'],
})
export class ReceiptListComponent {
  @Input() receipts50: Receipt[] = [];
  @Input() receipts100: Receipt[] = [];
  @Output() removeReceipt = new EventEmitter<Receipt>();
}
