// yup-extended.ts
import * as yup from 'yup';
import { AnyObject, Flags, Maybe } from 'yup';

yup.addMethod<yup.StringSchema>(yup.string, 'verifiedAllDigits', function () {
  return this.transform((value) => (value ? value : '')).test((value) =>
    /^\d+$/.test(value!)
  );
});

declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TDefault = undefined,
    TFlags extends Flags = ''
  > extends yup.Schema<TType, TContext, TDefault, TFlags> {
    verifiedAllDigits(): StringSchema<TType, TContext>;
  }
}

export default yup;
