import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import style from './Payment.module.css';
import { PaymentCardIcon } from '../../assets/icons/svgs';

interface PaymentCardProps {
  onSubmit: (values: PaymentCardValues) => void;
  initialValues?: PaymentCardValues;
  disabled?: boolean;
}

interface PaymentCardValues {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

const validationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required('Card number is required')
    .test('valid-card-number', 'Invalid card number', (value) =>
      value ? /^[0-9]{16}$/.test(value.replace(/\s/g, '')) : false
    ),
  expiryDate: Yup.string()
    .required('Expiry date is required')
    .test('valid-expiry-date', 'Invalid expiry date', (value) => {
      if (!value) return false;
      const [month, year] = value.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      return (
        /^(0[1-9]|1[0-2])\/\d{2}$/.test(value) &&
        parseInt(year, 10) >= currentYear &&
        (parseInt(year, 10) > currentYear ||
          parseInt(month, 10) >= currentMonth)
      );
    }),
  cvc: Yup.string()
    .required('CVC is required')
    .matches(/^[0-9]{3,4}$/, 'CVC must be 3 or 4 digits'),
});

const PaymentCard: React.FC<PaymentCardProps> = ({
  onSubmit,
  initialValues = { cardNumber: '', expiryDate: '', cvc: '' },
  disabled = false,
}) => {
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    return v.length >= 2 ? `${v.slice(0, 2)}/${v.slice(2, 4)}` : v;
  };

  const formatCVC = (value: string) => value.replace(/\D/g, '').slice(0, 4);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const { name, value } = event.target;
    let formattedValue = value;

    switch (name) {
      case 'cardNumber':
        formattedValue = formatCardNumber(value);
        break;
      case 'expiryDate':
        formattedValue = formatExpiryDate(value);
        break;
      case 'cvc':
        formattedValue = formatCVC(value);
        break;
    }

    setFieldValue(name, formattedValue);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue }) => (
        <Form className={style.customPaymentCardInputField}>
          <div className={style.customPaymentCardInputFieldInner}>
            <span className={style.iconContainer}>
              <PaymentCardIcon />
            </span>
            <Field
              name="cardNumber"
              type="text"
              placeholder="1234 5678 1234 5678"
              className={style.cardNumberInputField}
              disabled={disabled}
              onChange={(e: any) => handleChange(e, setFieldValue)}
              maxLength={19}
            />
            <Field
              name="expiryDate"
              type="text"
              placeholder="MM/YY"
              className={style.cardValidityInputField}
              disabled={disabled}
              onChange={(e: any) => handleChange(e, setFieldValue)}
              maxLength={5}
            />
            <Field
              name="cvc"
              type="text"
              placeholder="CVC"
              className={style.cardCvcNumberInputField}
              disabled={disabled}
              onChange={(e: any) => handleChange(e, setFieldValue)}
              maxLength={4}
            />
          </div>
          <ErrorMessage
            name="cardNumber"
            component="span"
            className={style.errorText}
          />
          <ErrorMessage
            name="expiryDate"
            component="span"
            className={style.errorText}
          />
          <ErrorMessage
            name="cvc"
            component="span"
            className={style.errorText}
          />
        </Form>
      )}
    </Formik>
  );
};

export default PaymentCard;
