import { createAction, props } from '@ngrx/store';
import { Receipt } from '../../models/receipt/Receipt';

export const addReceipt = createAction(
  '[Receipt Page] Add Receipt',
  props<Receipt>()
);

export const removeReceipt = createAction(
  '[Receipt Page] Remove Receipt',
  props<{ id: string }>()
);

export const resetState = createAction('[Receipt Page] Remove Receipt');
