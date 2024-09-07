import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ReceiptState } from './receipt.reducer';
import { Purchaser, Receipt } from 'src/app/models/receipt/Receipt';

const selectReceiptState = (state: AppState) => state.receipts;

const filterReceipts = (
  receipts: Receipt[],
  purchaser: Purchaser,
  paymentOption?: number
) => {
  return receipts.filter(
    (receipt) =>
      receipt.purchaser === purchaser &&
      (paymentOption === undefined || receipt.paymentOption === paymentOption)
  );
};

export const selectAllReceipts = createSelector(
  selectReceiptState,
  (receiptState: ReceiptState) => receiptState.receipts
);

export const selectAllReceiptsByPurchaser = (purchaser: Purchaser) =>
  createSelector(selectReceiptState, (receiptState: ReceiptState) =>
    filterReceipts(receiptState.receipts, purchaser)
  );

export const selectReceiptsByPurchaserAndPaymentOption = (
  purchaser: Purchaser,
  paymentOption: number
) =>
  createSelector(selectReceiptState, (receiptState: ReceiptState) =>
    filterReceipts(receiptState.receipts, purchaser, paymentOption)
  );

export const selectReceiptTotal = createSelector(
  selectReceiptState,
  (receiptState: ReceiptState) => {
    const totalE = receiptState.receipts
      .filter((receipt) => receipt.purchaser === 'E')
      .reduce(
        (total, receipt) =>
          total + (receipt.total * receipt.paymentOption) / 100,
        0
      );

    const totalL = receiptState.receipts
      .filter((receipt) => receipt.purchaser === 'L')
      .reduce(
        (total, receipt) =>
          total + (receipt.total * receipt.paymentOption) / 100,
        0
      );

    let person = totalE > totalL ? 'E' : 'L';
    const diff = Math.abs(totalE - totalL);
    if (diff > 0) {
      return `${person} is expected to recieve ${diff}kr`;
    }
    return undefined;
  }
);
