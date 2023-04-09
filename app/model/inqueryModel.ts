import { InferType } from 'yup';
import yup from '../inquery/yup-extended';

export const InquerySchema = yup.object().shape({
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
  message: yup.string().optional(),
  // message: yup.string().notRequired(),
});

export type InqueryValues = InferType<typeof InquerySchema>;
