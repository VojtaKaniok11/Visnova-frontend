'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-blue-900 shadow-md h-[92px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Desktop Navigation */}
        <div className="hidden md:grid md:grid-cols-3 items-center h-full">
          {/* Left Links */}
          <div className="flex justify-end gap-x-[52px] translate-x-[2px]">
            <Link href="/" className="text-white hover:text-yellow-400 font-bold tracking-wide transition-colors uppercase text-lg">
              Domů
            </Link>
            <Link href="/rozpis" className="text-white hover:text-yellow-400 font-bold tracking-wide transition-colors uppercase text-lg">
              Rozpis
            </Link>
          </div>

          {/* Center Logo */}
          <div className="flex justify-center items-center">
            <Link href="/" className="relative h-[74px] w-[74px]">
              <Image 
                src="/logo.png" 
                alt="Logo Jiskra Višňová" 
                fill 
                className="object-contain drop-shadow-xl"
                priority
              />
            </Link>
          </div>

          {/* Right Links */}
          <div className="flex justify-start gap-x-[52px] -translate-x-[2px]">
            <Link href="/soupiska" className="text-white hover:text-yellow-400 font-bold tracking-wide transition-colors uppercase text-lg">
              Soupiska
            </Link>
            <Link href="/historie" className="text-white hover:text-yellow-400 font-bold tracking-wide transition-colors uppercase text-lg">
              Historie
            </Link>
          </div>
        </div>

        {/* Mobile Navigation (Logo Left, Menu Right) */}
        <div className="md:hidden flex justify-between items-center h-full relative">
          <Link href="/" className="relative h-[60px] w-[60px]">
            <Image 
              src="/logo.png" 
              alt="Logo Jiskra Višňová" 
              fill 
              className="object-contain"
              priority
            />
          </Link>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-yellow-400 focus:outline-none transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-blue-900 border-t border-white/5 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <nav className="flex flex-col space-y-2 px-4 py-6">
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-yellow-400 font-bold tracking-wide transition-colors uppercase text-xl py-3 border-b border-white/5"
          >
            Domů
          </Link>
          <Link 
            href="/rozpis" 
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-yellow-400 font-bold tracking-wide transition-colors uppercase text-xl py-3 border-b border-white/5"
          >
            Rozpis
          </Link>
          <Link 
            href="/soupiska" 
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-yellow-400 font-bold tracking-wide transition-colors uppercase text-xl py-3 border-b border-white/5"
          >
            Soupiska
          </Link>
          <Link 
            href="/historie" 
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-yellow-400 font-bold tracking-wide transition-colors uppercase text-xl py-3"
          >
            Historie
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
