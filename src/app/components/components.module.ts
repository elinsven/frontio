import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ReceiptListComponent } from './receipt-list/receipt-list.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        MatListModule,
        MatDividerModule,
        MatButtonModule,
        MatIconModule,
        ListComponent, ReceiptListComponent,
    ],
    exports: [ListComponent, ReceiptListComponent],
})
export class ComponentsModule {}
