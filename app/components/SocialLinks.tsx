import Image from 'next/image';
import Link from 'next/link';

export default function SocialLinks() {
  return (
    <section className='w-full mx-auto'>
      <Link href={'https://www.facebook.com/Utraque-558319467652121'}>
        <Image
          className='border-4 border-black dark:border-slate-50 drop-shadow-xl shadow-black rounded-full mx-auto mt-8'
          src='/images/facebook1.svg'
          width={100}
          height={50}
          alt='facebook'
          priority={true}
        />
      </Link>
      <Link href={'https://twitter.com/utraque'} >
        <Image
          className='border-4 border-black dark:border-slate-50 drop-shadow-xl shadow-black rounded-full mx-auto mt-8'
          src='/images/twitter1.svg'
          width={100}
          height={50}
          alt='twitter'
          priority={true}
        />
        </Link>
      <Link href={'https://www.linkedin.com/company/utraque'} >
        <Image
          className='border-4 border-black dark:border-slate-50 drop-shadow-xl shadow-black rounded-full mx-auto mt-8'
          src='/images/linkedin1.svg'
          width={100}
          height={50}
          alt='linkedin'
          priority={true}
        /></Link>
    </section>
  );
}
