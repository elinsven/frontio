import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Receipt } from 'src/app/models/receipt/Receipt';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() receipts: Receipt[] = [];
  @Output() removeReceipt = new EventEmitter<Receipt>();
}
