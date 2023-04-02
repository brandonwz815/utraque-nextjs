'use client';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import { InquerySchema, InqueryValues } from '../model/inqueryModel';
import './styles.css';
import './styles-custom.css';

const initialValues: InqueryValues = {
  firstName: '',
  lastName: '',
  /* company: '', */
  country: '',
  email: '',
  phoneNumber: '',
  /* message: '', */
};

export default function Inquery(): JSX.Element {
  return (
    <div>
      <h1>Contact Us</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={InquerySchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log('ready for API call');
          await fetch('api/utraque', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
              'content-type': 'application/json',
              Accept: 'application/json',
            },
          });
          setSubmitting(false);
          // alert(JSON.stringify(values, null, 2));
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

              <label htmlFor='company'>Company (optional)</label>
              <Field
                id='company'
                name='company'
                placeholder='Acme'
              />
              <ErrorMessage name='company' />

              <label htmlFor='country'>Country</label>
              <Field
                id='country'
                name='country'
                placeholder='USA'
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

              <label htmlFor='inqueryMessage'>Message (optional)</label>
              <Field
                as='textarea'
                id='inqueryMessage'
                name='message'
                placeholder='How may Utraque help you?'
              />
              <ErrorMessage name='message' />

              <button
                type='submit'
                /* disabled={isSubmitting} */
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
