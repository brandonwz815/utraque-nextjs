'use client';

import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import { InferType } from 'yup';
import yup from './yup-extended';
import './styles.css';
import './styles-custom.css';

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
  company: yup.string().optional(),
  country: yup.string().required('Company name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .verifiedAllDigits('Phone number should be all digits'),
  message: yup.string().notRequired(),
});

type Values = InferType<typeof InquerySchema>;

const initialValues: Values = {
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
          // await new Promise((r) => setTimeout(r, 500));
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
