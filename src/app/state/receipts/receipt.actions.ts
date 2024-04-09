import { createAction, props } from '@ngrx/store';
import { Receipt } from 'src/app/models/receipt/Receipt';

export const addReceipt = createAction(
  '[Receipt Page] Add Receipt',
  props<Receipt>()
);

export const removeReceipt = createAction(
  '[Receipt Page] Remove Receipt',
  props<{ id: string }>()
);
