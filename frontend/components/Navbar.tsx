'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-blue-900 shadow-md h-[92px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full relative">
          {/* Logo (Fits within header) */}
          <div className="flex-shrink-0 flex items-center h-full">
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

          {/* Navigation (Desktop) */}
          <nav className="hidden md:flex space-x-12">
            <Link href="/" className="text-white hover:text-yellow-400 font-bold tracking-wide transition-colors uppercase text-lg">
              Domů
            </Link>
            <Link href="/rozpis" className="text-white hover:text-yellow-400 font-bold tracking-wide transition-colors uppercase text-lg">
              Rozpis
            </Link>
            <Link href="/soupiska" className="text-white hover:text-yellow-400 font-bold tracking-wide transition-colors uppercase text-lg">
              Soupiska
            </Link>
            <Link href="/historie" className="text-white hover:text-yellow-400 font-bold tracking-wide transition-colors uppercase text-lg">
              Historie
            </Link>
          </nav>

          {/* Mobile menu button minimal */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-400 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
