export interface PaymentCardInterface {
  onSubmit: (values: PaymentCardValues) => void;
  initialValues?: PaymentCardValues;
  disabled?: boolean;
  onValidityChange: (isValid: boolean) => void;
}

export interface PaymentCardValues {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}
