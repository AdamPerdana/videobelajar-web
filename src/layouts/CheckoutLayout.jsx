import React from 'react';
import Navbar from './Navbar';
import Container from './Container';
import Stepper from '../components/Stepper';



export default function CheckoutLayout({ langkah, tertunda = false, bawahNavbar, children }) {
  return (
    <div className="min-h-screen flex flex-col bg-cream font-sans text-textPrimary">
      <Navbar>
        <Stepper aktif={langkah} tertunda={tertunda} />
      </Navbar>

      {bawahNavbar}

      <main className="flex-1">
        <Container className="py-7 md:py-16">{children}</Container>
      </main>
    </div>
  );
}
