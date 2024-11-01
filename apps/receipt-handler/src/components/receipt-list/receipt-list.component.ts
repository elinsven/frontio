import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { Receipt } from '../../app/utils/types';

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.scss'],
  standalone: true,
  imports: [ListComponent],
})
export class ReceiptListComponent {
  @Input() receipts50: Receipt[] = [];
  @Input() receipts100: Receipt[] = [];
  @Output() removeReceipt = new EventEmitter<Receipt>();
}
