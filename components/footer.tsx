import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#1B2A4A] py-10 px-6 mt-auto">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 40 40" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="1" fill="none" opacity="0.6" />
            <ellipse cx="20" cy="23" rx="7" ry="5.5" fill="white" opacity="0.9" />
            <circle cx="20" cy="14" r="5.5" fill="white" opacity="0.9" />
            <circle cx="18" cy="13" r="1" fill="#1B2A4A" />
            <circle cx="22" cy="13" r="1" fill="#1B2A4A" />
            <path d="M18.5 15.5 Q20 16.5 21.5 15.5" stroke="#1B2A4A" strokeWidth="0.6" fill="none" strokeLinecap="round" />
            <ellipse cx="14" cy="12" rx="2.5" ry="3.5" fill="#B8975A" opacity="0.8" />
            <ellipse cx="26" cy="12" rx="2.5" ry="3.5" fill="#B8975A" opacity="0.8" />
            <ellipse cx="20" cy="9" rx="3" ry="2.5" fill="#B8975A" opacity="0.6" />
          </svg>
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
