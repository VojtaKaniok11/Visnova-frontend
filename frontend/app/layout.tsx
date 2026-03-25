import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Jiskra Višňová',
  description: 'Oficiální stránky fotbalového klubu Jiskra Višňová',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-slate-50 text-slate-900 font-sans flex flex-col min-h-screen" suppressHydrationWarning>
        
        {/* Navbar */}
        <header className="fixed w-full z-50 bg-blue-900 shadow-md h-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex justify-between items-center h-full relative">
              {/* Logo (Sticks out below) */}
              <div className="flex-shrink-0 flex items-center h-full -ml-4">
                <Link href="/" className="relative h-28 w-28 group translate-y-6">
                  <Image 
                    src="/logo.png" 
                    alt="Logo Jiskra Višňová" 
                    fill 
                    className="object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </Link>
              </div>

              {/* Navigation */}
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
                <button className="text-white hover:text-yellow-400 focus:outline-none">
                  <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow pt-20">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300 py-12 mt-16 border-t-[6px] border-yellow-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <span className="text-2xl font-bold text-white mb-2 block">Jiskra Višňová</span>
              <p className="text-sm">Oficiální webové stránky fotbalového klubu.</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/" className="hover:text-yellow-400 transition">Domů</Link>
              <Link href="/rozpis" className="hover:text-yellow-400 transition">Rozpis</Link>
              <Link href="/soupiska" className="hover:text-yellow-400 transition">Soupiska</Link>
              <Link href="/historie" className="hover:text-yellow-400 transition">Historie</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} TJ Jiskra Višňová. Všechna práva vyhrazena.
          </div>
        </footer>

      </body>
    </html>
  );
}
