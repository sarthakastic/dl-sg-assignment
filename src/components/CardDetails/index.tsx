import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './CardDetails.module.css';

interface CardDetailsProps {
  onSubmit: (values: CardDetailsValues) => void;
}

interface CardDetailsValues {
  cardNumber: string;
  expiry: string;
  cvc: string;
}

const CardDetailsSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .matches(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, 'Invalid card number format')
    .required('Card number is required'),
  expiry: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date format (MM/YY)')
    .required('Expiry date is required'),
  cvc: Yup.string()
    .matches(/^\d{3,4}$/, 'CVC must be 3 or 4 digits')
    .required('CVC is required'),
});

const CardDetails: React.FC<CardDetailsProps> = ({ onSubmit }) => {
  const [focused, setFocused] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      cardNumber: '',
      expiry: '',
      cvc: '',
    },
    validationSchema: CardDetailsSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const handleFocus = (field: string) => {
    setFocused(field);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    formik.handleBlur(e);
    setFocused(null);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          id="cardNumber"
          placeholder="1234 5678 1234 5678"
          className={`${styles.input} ${
            focused === 'cardNumber' ? styles.focused : ''
          }`}
          value={formik.values.cardNumber}
          onChange={(e) => {
            const formatted = formatCardNumber(e.target.value);
            formik.setFieldValue('cardNumber', formatted);
          }}
          onFocus={() => handleFocus('cardNumber')}
          onBlur={handleBlur}
        />
        {/* <div className={styles.expiryAndCvc}> */}
        <input
          type="text"
          id="expiry"
          placeholder="MM/YY"
          className={`${styles.input} ${styles.expiry} ${
            focused === 'expiry' ? styles.focused : ''
          }`}
          value={formik.values.expiry}
          onChange={formik.handleChange}
          onFocus={() => handleFocus('expiry')}
          onBlur={handleBlur}
        />
        <input
          type="text"
          id="cvc"
          placeholder="CVC"
          className={`${styles.input} ${styles.cvc} ${
            focused === 'cvc' ? styles.focused : ''
          }`}
          value={formik.values.cvc}
          onChange={formik.handleChange}
          onFocus={() => handleFocus('cvc')}
          onBlur={handleBlur}
        />
        {/* </div> */}
      </div>
      {(formik.errors.cardNumber && formik.touched.cardNumber) ||
      (formik.errors.expiry && formik.touched.expiry) ||
      (formik.errors.cvc && formik.touched.cvc) ? (
        <div className={styles.errorContainer}>
          {formik.errors.cardNumber && formik.touched.cardNumber && (
            <p className={styles.error}>{formik.errors.cardNumber}</p>
          )}
          {formik.errors.expiry && formik.touched.expiry && (
            <p className={styles.error}>{formik.errors.expiry}</p>
          )}
          {formik.errors.cvc && formik.touched.cvc && (
            <p className={styles.error}>{formik.errors.cvc}</p>
          )}
        </div>
      ) : null}
      <p className={styles.disclaimer}>
        You will not be charged right now. Subscription will only start once
        your listing is published and live.
      </p>
    </form>
  );
};

export default CardDetails;
