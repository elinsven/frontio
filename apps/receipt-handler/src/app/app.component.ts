import { Component, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addReceipt,
  removeReceipt,
  resetState,
} from './store/actions/receipt.actions';
import {
  selectAllReceipts,
  selectReceiptsByPurchaserAndPaymentOption,
  selectReceiptTotal,
} from './store/selectors/receipt.selectors';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Receipt, Purchaser, PaymentOption } from './utils/types';
import { ReceiptListComponent } from '../components';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [ReceiptListComponent, MatRadioModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true
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
    // TODO download csv file
    /*  const headers: string[] = ['E 50%', 'E 100%', 'L 50%', 'L 100%'];
    const combinedData: string[][] = this.receiptsByPurchaserE50().map(
      (_, i) => [
        this.receiptsByPurchaserE50()[i].total.toString() || '',
        this.receiptsByPurchaserE100()[i].total.toString() || '',
        this.receiptsByPurchaserL50()[i].total.toString() || '',
        this.receiptsByPurchaserL100()[i].total.toString() || '',
      ]
    );
    const csvContent: string = this.convertToCSV([headers, ...combinedData]);
    this.downloadFile(csvContent); */
    this.resetForm();
    this.store.dispatch(resetState());
  }

  private resetForm() {
    this.totalFormControl.reset();
    this.totalFormControl.setErrors(null);
    this.paymentOptionFormControl.setValue('50');
  }

  /*  private convertToCSV(data: string[][]): string {
    return data.map((row) => row.join(',')).join('\r\n');
  }

  private downloadFile(csvContent: string): void {
    const currentDate: string = new Date().toISOString();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kvitton-${currentDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  } */
}
