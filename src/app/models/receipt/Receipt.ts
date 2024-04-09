export type Purchaser = 'E' | 'L';
export type PaymentOption = 50 | 100;

export interface Receipt {
  id?: string;
  total: number;
  tag?: string;
  purchaser: Purchaser;
  paymentOption: PaymentOption;
}
