import React from 'react';

function ThankyouLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}

export default ThankyouLayout;
