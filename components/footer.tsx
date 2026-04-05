import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#1B2A4A] py-10 px-6 mt-auto">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            <Image
              src="/ritz-carlton-logo-white.png"
              alt="Ritz-Carlton Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <div className="font-serif text-white">
            <div className="text-[9px] tracking-[0.25em] uppercase font-medium leading-none opacity-80">The</div>
            <div className="text-xs tracking-[0.2em] uppercase font-semibold leading-tight">Ritz-Carlton</div>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs font-sans">
          <Link href="#" className="text-white/60 hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <span className="text-white/30">|</span>
          <Link href="#" className="text-white/60 hover:text-white transition-colors">
            HR Contact
          </Link>
          <span className="text-white/30">|</span>
          <Link href="#" className="text-white/60 hover:text-white transition-colors">
            IT Support
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-white/40 text-xs font-sans">
          &copy; {new Date().getFullYear()} The Ritz-Carlton Hotel Company, L.L.C. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
