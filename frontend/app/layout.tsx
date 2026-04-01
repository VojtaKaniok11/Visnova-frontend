import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
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
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow pt-[92px]">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300 py-12 mt-16 border-t-[6px] border-yellow-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex flex-col items-center">
              {/* Logo Section - Left on desktop, center on mobile */}
              <div className="md:absolute md:left-0 mb-8 md:mb-0">
                <Link href="/" className="relative h-24 w-24 block">
                  <Image 
                    src="/logo.png" 
                    alt="Logo Jiskra Višňová" 
                    fill 
                    className="object-contain brightness-110 filter"
                    priority
                  />
                </Link>
              </div>

              {/* Contact & Social Section - Centered */}
              <div className="text-center">
                <div className="mb-4">
                  <span className="text-2xl font-bold text-white mb-2 block uppercase tracking-wide">Kontaktujte nás</span>
                  <p className="text-sm">E-mail: <a href="mailto:jiskra.visnova@seznam.cz" className="text-yellow-400 hover:underline transition-all">jiskra.visnova@seznam.cz</a></p>
                  
                  {/* Social Media Links */}
                  <div className="flex justify-center gap-4 mt-6">
                    <a 
                      href="https://www.facebook.com/jiskravisnova1946" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all border border-white/5 group hover:border-yellow-400/50"
                      title="Sledujte nás na Facebooku"
                    >
                      <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-2.201c0-1.137.272-1.621 1.414-1.621h2.586v-4.178c-.461-.06-2.046-.192-3.896-.192-3.856 0-6.104 2.083-6.104 6.201v1.991z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://www.instagram.com/jiskravisnova/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all border border-white/5 group hover:border-yellow-400/50"
                      title="Sledujte nás na Instagramu"
                    >
                      <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/5 text-center text-sm text-slate-500">
              &copy; {new Date().getFullYear()} TJ Jiskra Višňová
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
