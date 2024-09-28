import { createReducer, on } from '@ngrx/store';
import { Receipt } from 'src/app/models/receipt/Receipt';
import { addReceipt, removeReceipt, resetState } from './receipt.actions';

export interface ReceiptState {
  receipts: Receipt[];
}

export const initialState: ReceiptState = { receipts: [] };

export const receiptReducer = createReducer(
  initialState,
  on(addReceipt, (state, { id, total, tag, purchaser, paymentOption }) => ({
    ...state,
    receipts: [...state.receipts, { id, total, tag, purchaser, paymentOption }],
  })),
  on(removeReceipt, (state, { id }) => ({
    ...state,
    receipts: state.receipts.filter((receipt) => receipt.id !== id),
  })),
  on(resetState, () => initialState)
);
