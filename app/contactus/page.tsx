'use client';

import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import yup from './yup-extended';

const InquerySchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'First name is too short')
    .max(70, 'First name is too long')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(2, 'Last name is too short')
    .max(70, 'Last name is too long')
    .required('Last name is required'),
  company: yup.string().required(),
  country: yup.string().required(),
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .verifiedAllDigits(),
  message: yup.string().notRequired(),
});

interface Values {
  firstName: string;
  lastName: string;
  company: string;
  country: string;
  email: string;
  phoneNumber: number;
  message?: string;
}

const initialValues: Values = {
  firstName: '',
  lastName: '',
  company: '',
  country: '',
  email: '',
  phoneNumber: 0,
  /* message: '', */
};

export default function Inquery() {
  return (
    <div>
      <h1>Contact Us</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={InquerySchema}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values }) => (
          <Form>
            <div className=''>
              <label htmlFor='firstName'>First Name</label>
              <Field
                id='firstName'
                name='firstName'
                placeholder='John'
              />
              <ErrorMessage name='firstName' />

              <label htmlFor='lastName'>Last Name</label>
              <Field
                id='lastName'
                name='lastName'
                placeholder='Doe'
              />
              <ErrorMessage name='lastName' />

              <label htmlFor='company'>Company</label>
              <Field
                id='company'
                name='company'
                placeholder='U.S.A'
              />
              <ErrorMessage name='company' />

              <label htmlFor='country'>Country</label>
              <Field
                id='country'
                name='country'
                placeholder='Acme'
              />
              <ErrorMessage name='country' />

              <label htmlFor='email'>Email</label>
              <Field
                id='email'
                name='email'
                placeholder='john.doe@acme.com'
                type='email'
              />
              <ErrorMessage name='email' />

              <label htmlFor='phoneNumber'>Phone Number (Numbers only)</label>
              <Field
                id='phoneNumber'
                name='phoneNumber'
                placeholder='1112223333'
              />
              <ErrorMessage name='phoneNumber' />

              <button type='submit'>Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
