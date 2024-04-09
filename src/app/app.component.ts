import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PaymentOption, Receipt } from './models/receipt/Receipt';
import { addReceipt, removeReceipt } from './state/receipts/receipt.actions';
import { Observable } from 'rxjs';
import {
  selectAllReceipts,
  selectReceiptsByPurchaserAndPaymentOption,
  selectReceiptTotal,
} from './state/receipts/receipt.selectors';
import { AppState } from './state/app.state';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  receipts$: Observable<Receipt[]> = this.store.select(selectAllReceipts);
  receiptsByPurchaserE50$: Observable<Receipt[]> = this.store.select(
    selectReceiptsByPurchaserAndPaymentOption('E', 50)
  );
  receiptsByPurchaserE100$: Observable<Receipt[]> = this.store.select(
    selectReceiptsByPurchaserAndPaymentOption('E', 100)
  );
  receiptsByPurchaserL50$: Observable<Receipt[]> = this.store.select(
    selectReceiptsByPurchaserAndPaymentOption('L', 50)
  );
  receiptsByPurchaserL100$: Observable<Receipt[]> = this.store.select(
    selectReceiptsByPurchaserAndPaymentOption('L', 100)
  );
  total$: Observable<string> = this.store.select(selectReceiptTotal);

  addReceiptForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {
    this.addReceiptForm = this.formBuilder.group({
      total: '',
      tag: '',
      purchaser: 'E',
      paymentOption: '50',
    });
  }

  submitReceipt() {
    if (this.addReceiptForm.valid) {
      const { total, tag, purchaser, paymentOption } =
        this.addReceiptForm.value;
      this.store.dispatch(
        addReceipt({
          total: Number(total),
          tag,
          purchaser,
          paymentOption: Number(paymentOption) as PaymentOption,
        })
      );
    }
  }

  removeReceipt(receipt: Receipt) {
    this.store.dispatch(removeReceipt({ id: receipt.id as string }));
  }
}
