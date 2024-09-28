import { Component, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { PaymentOption, Purchaser, Receipt } from './models/receipt/Receipt';
import {
  addReceipt,
  removeReceipt,
  resetState,
} from './state/receipts/receipt.actions';
import {
  selectAllReceipts,
  selectReceiptsByPurchaserAndPaymentOption,
  selectReceiptTotal,
} from './state/receipts/receipt.selectors';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly store = inject(Store);

  receipts: Signal<Receipt[]> = this.store.selectSignal(selectAllReceipts);
  receiptsByPurchaserE50: Signal<Receipt[]> = this.store.selectSignal(
    selectReceiptsByPurchaserAndPaymentOption('E', 50)
  );
  receiptsByPurchaserE100: Signal<Receipt[]> = this.store.selectSignal(
    selectReceiptsByPurchaserAndPaymentOption('E', 100)
  );
  receiptsByPurchaserL50: Signal<Receipt[]> = this.store.selectSignal(
    selectReceiptsByPurchaserAndPaymentOption('L', 50)
  );
  receiptsByPurchaserL100: Signal<Receipt[]> = this.store.selectSignal(
    selectReceiptsByPurchaserAndPaymentOption('L', 100)
  );
  total: Signal<string | undefined> =
    this.store.selectSignal(selectReceiptTotal);
  addReceiptForm: FormGroup = new FormBuilder().group({
    total: new FormControl('', [
      Validators.required,
      Validators.pattern('\\d+\\s?[lLeE]\\s?[a-zåäöA-ZÅÄÖ0-9\\s]*'),
    ]),
    paymentOption: new FormControl('50'),
  });

  get totalFormControl(): AbstractControl {
    return this.addReceiptForm.controls['total'];
  }

  get paymentOptionFormControl(): AbstractControl {
    return this.addReceiptForm.controls['paymentOption'];
  }

  submitReceipt() {
    const totalValue = this.totalFormControl.value;
    const total = Number(totalValue.match('^\\d+\\s?')[0]);
    const purchaser: Purchaser = totalValue.match('[lLeE]')[0].toUpperCase();

    if (this.addReceiptForm.valid && total && purchaser) {
      const tag =
        totalValue.match('[lLeE]\\s?([a-zåäöA-ZÅÄÖ0-9\\s]*)')[1] || '';

      this.store.dispatch(
        addReceipt({
          id: Date.now().toString(),
          total,
          tag,
          purchaser,
          paymentOption: Number(
            this.paymentOptionFormControl.value
          ) as PaymentOption,
        })
      );

      this.resetForm();
    }
  }

  removeReceipt(receipt: Receipt) {
    this.store.dispatch(removeReceipt({ id: receipt.id }));
  }

  onComplete() {
    const doc = new jsPDF();

    const currentDate: string = new Date().toDateString();
    doc.text(currentDate, 10, 10);

    doc.text('E', 10, 30);
    doc.text('50%', 10, 40);
    let x: number = 40;
    this.receiptsByPurchaserE50().forEach((receipt) => {
      x += 10;
      doc.text(`${receipt.total.toString()} ${receipt.tag}`, 10, x);
    });
    x += 20;
    doc.text('100%', 10, x);
    this.receiptsByPurchaserE100().forEach((receipt) => {
      x += 10;
      doc.text(`${receipt.total.toString()} ${receipt.tag}`, 10, x);
    });
    x += 20;
    doc.text('L', 10, x);
    x += 10;
    doc.text('50%', 10, x);
    this.receiptsByPurchaserL50().forEach((receipt) => {
      x += 10;
      doc.text(`${receipt.total.toString()} ${receipt.tag}`, 10, x);
    });
    x += 20;
    doc.text('100%', 10, x);
    this.receiptsByPurchaserL100().forEach((receipt) => {
      x += 10;
      doc.text(`${receipt.total.toString()} ${receipt.tag}`, 10, x);
    });
    x += 20;
    doc.text(this.total() as string, 10, x);

    doc.save(`Kvitton ${currentDate}.pdf`);

    this.resetForm();
    this.store.dispatch(resetState());
  }

  private resetForm() {
    this.totalFormControl.reset();
    this.totalFormControl.setErrors(null);
    this.paymentOptionFormControl.setValue('50');
  }
}
