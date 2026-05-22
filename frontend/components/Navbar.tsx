'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Domů', href: '/' },
    { name: 'Rozpis', href: '/rozpis' },
    { name: 'Historie', href: '/historie' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8" style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))', willChange: 'transform', transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)' }}>
      <div className="max-w-7xl mx-auto relative">
        {/* Main Navbar Container - Floating Island Style */}
        <div className="relative flex items-center justify-between rounded-2xl overflow-hidden bg-blue-950 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] py-2">
          {/* Subtle Glow Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-blue-800/40 to-blue-900/40"></div>
          
          {/* Decorative Top Border for premium feel */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between w-full px-8 relative z-10">
            {/* Left Links */}
            <div className="flex items-center gap-x-10 flex-1 justify-end pr-4">
              {navLinks.slice(0, 2).map((link) => (
                <NavLink key={link.name} link={link} active={pathname === link.href} />
              ))}
            </div>

            {/* Center Logo - Reduced size for slimmer look */}
            <div className="flex justify-center px-6">
              <Link href="/" className="relative group">
                <div className="absolute -inset-4 bg-yellow-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-[72px] w-[72px] transition-transform duration-500 group-hover:scale-110">
                  <Image 
                    src="/logo.png" 
                    alt="Logo Jiskra Višňová" 
                    fill 
                    className="object-contain drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Right Links */}
            <div className="flex items-center gap-x-10 flex-1 justify-start pl-4">
              {navLinks.slice(2).map((link) => (
                <NavLink key={link.name} link={link} active={pathname === link.href} />
              ))}
            </div>
          </div>

          {/* Mobile Navigation Header */}
          <div className="md:hidden flex justify-between items-center w-full px-6 relative z-10 py-1">
            <Link href="/" className="relative h-12 w-12 transform transition-transform hover:scale-105 active:scale-95">
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
              className="relative w-10 h-10 flex items-center justify-center text-white hover:text-yellow-400 transition-colors group focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 relative flex items-center justify-center">
                <span className={`absolute block w-full h-0.5 bg-current transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}></span>
                <span className={`absolute block w-full h-0.5 bg-current transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute block w-full h-0.5 bg-current transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div 
          className={`md:hidden absolute top-full left-0 right-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] 
            ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
        >
          <div className="bg-blue-950 border-t border-white/10 shadow-2xl p-4 space-y-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-300 group
                  ${pathname === link.href ? 'bg-white/10 text-yellow-400' : 'text-white/80 hover:bg-white/5 hover:text-white'}`}
              >
                <span className="font-bold tracking-widest uppercase text-base">{link.name}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border border-white/10 group-hover:border-yellow-400/50 group-hover:bg-yellow-400/10 transition-all duration-300`}>
                  <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ link, active }: { link: { name: string; href: string }; active: boolean }) => (
  <Link 
    href={link.href} 
    className={`relative font-bold tracking-[0.15em] transition-all duration-300 uppercase text-[15px] group py-2
      ${active ? 'text-yellow-400' : 'text-white/90 hover:text-white'}`}
  >
    {link.name}
    {/* Animated Underline */}
    <span 
      className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-yellow-500 to-yellow-300 transition-all duration-500 
        ${active ? 'w-full shadow-[0_0_12px_rgba(234,179,8,0.6)]' : 'w-0 group-hover:w-full opacity-0 group-hover:opacity-100'}`}
    ></span>
    
    {/* Micro-dot Indicator */}
    <span 
      className={`absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full transition-all duration-500
        ${active ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 group-hover:opacity-50 group-hover:translate-y-0'}`}
    ></span>
  </Link>
);

export default Navbar;
