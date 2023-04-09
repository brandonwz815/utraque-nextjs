import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='bg-slate-600 p-4 sticky top-0 drop-shadow-x2 z-10'>
      <div className='prose prose-xl mx-auto flex justify-between flex-col'>
        <Link href={'/'}>Home</Link>
        <Link href={'/#about'}>About</Link>
        <Link href={'/#contact'}>Contact Us</Link>
      </div>
    </nav>
  );
};

export default Navbar;
