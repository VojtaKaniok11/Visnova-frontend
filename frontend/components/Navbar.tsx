'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 h-[92px]">
      {/* Glossy Backdrop with Team Colors */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 border-b-4 border-yellow-500 shadow-2xl backdrop-blur-md opacity-95"></div>
      
      {/* Decorative inner glow */}
      <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Desktop Navigation */}
        <div className="hidden md:grid md:grid-cols-3 items-center h-full">
          {/* Left Links */}
          <div className="flex justify-end gap-x-12">
            {[
              { name: 'Domů', href: '/' },
              { name: 'Rozpis', href: '/rozpis' },
            ].map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="relative text-white hover:text-yellow-400 font-bold tracking-widest transition-all duration-300 uppercase text-[17px] group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(250,204,21,0.6)]"></span>
              </Link>
            ))}
          </div>

          {/* Center Logo - With a glow effect container */}
          <div className="flex justify-center items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-yellow-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Link href="/" className="relative h-[82px] w-[82px] block transform transition-transform duration-500 hover:scale-110">
                <Image 
                  src="/logo.png" 
                  alt="Logo Jiskra Višňová" 
                  fill 
                  className="object-contain drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]"
                  priority
                />
              </Link>
            </div>
          </div>

          {/* Right Links */}
          <div className="flex justify-start gap-x-12">
            {[
              { name: 'Soupiska', href: '/soupiska' },
              { name: 'Historie', href: '/historie' },
            ].map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="relative text-white hover:text-yellow-400 font-bold tracking-widest transition-all duration-300 uppercase text-[17px] group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(250,204,21,0.6)]"></span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between items-center h-full relative z-10">
          <Link href="/" className="relative h-16 w-16 transform transition-transform hover:scale-105 active:scale-95">
            <Image 
              src="/logo.png" 
              alt="Logo Jiskra Višňová" 
              fill 
              className="object-contain drop-shadow-lg"
              priority
            />
          </Link>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-12 h-12 flex items-center justify-center text-white hover:text-yellow-400 transition-colors group"
            aria-label="Toggle menu"
          >
            <div className={`w-8 h-8 flex flex-col justify-center items-center transition-all duration-300`}>
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`}></span>
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 my-1 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) bg-blue-950 border-t border-white/10 ${isOpen ? 'max-h-screen shadow-2xl' : 'max-h-0 opacity-0'}`}>
        <nav className="flex flex-col px-6 py-8 space-y-2 bg-gradient-to-b from-blue-950 to-blue-900/95">
          {[
            { name: 'Domů', href: '/' },
            { name: 'Rozpis', href: '/rozpis' },
            { name: 'Soupiska', href: '/soupiska' },
            { name: 'Historie', href: '/historie' },
          ].map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between text-white hover:text-yellow-400 font-bold tracking-widest transition-all duration-300 uppercase text-lg py-4 border-b border-white/5 active:bg-white/5 px-2 rounded-lg"
            >
              {link.name}
              <svg className="w-5 h-5 text-yellow-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
