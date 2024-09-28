import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Receipt } from 'src/app/models/receipt/Receipt';
import { MatList, MatListItem } from '@angular/material/list';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    standalone: true,
    imports: [
        MatList,
        MatListItem,
        MatIconButton,
        MatIcon,
        MatDivider,
    ],
})
export class ListComponent {
  @Input() receipts: Receipt[] = [];
  @Output() removeReceipt = new EventEmitter<Receipt>();
}
