import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { Receipt } from '../../app/utils/types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [MatList, MatListItem, MatIconButton, MatIcon, MatDivider],
})
export class ListComponent {
  @Input() receipts: Receipt[] = [];
  @Output() removeReceipt = new EventEmitter<Receipt>();
}
