import { createReducer, on } from '@ngrx/store';
import {
  addReceipt,
  removeReceipt,
  resetState,
} from '../actions/receipt.actions';
import { Receipt } from '../../utils/types';

// TODO use adapter

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
