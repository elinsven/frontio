import { createAction, props } from '@ngrx/store';
import { Receipt } from '../../utils/types';

export enum ReceiptActionType {
  AddRecipt = '[Receipt Page] Add Receipt',
  RemoveReceipt = '[Receipt Page] Remove Receipt',
  ResetState = '[Receipt Page] Reset State',
}

export const addReceipt = createAction(
  ReceiptActionType.AddRecipt,
  props<Receipt>()
);

export const removeReceipt = createAction(
  ReceiptActionType.RemoveReceipt,
  props<{ id: string }>()
);

export const resetState = createAction(ReceiptActionType.ResetState);
