// yup-extended.ts
import * as yup from 'yup';
import { AnyObject, Flags, Maybe, Message } from 'yup';

yup.addMethod<yup.StringSchema>(
  yup.string,
  'verifiedAllDigits',
  function (message?: Message<any>) {
    return this.transform((value) => (value ? value : '')).test({
      name: 'isAllDigits',
      message,
      test(value: Maybe<string>) {
        return /^\d+$/.test(value!);
      },
    });
  }
);

declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TDefault = undefined,
    TFlags extends Flags = ''
  > extends yup.Schema<TType, TContext, TDefault, TFlags> {
    verifiedAllDigits(message:string): StringSchema<TType, TContext>;
  }
}

export default yup;
