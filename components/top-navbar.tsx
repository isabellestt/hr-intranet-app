'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Megaphone,
  Settings,
  Search,
} from 'lucide-react'

export default function TopNavbar() {
  const pathname = usePathname()

  return (
    <header className="h-16 flex items-center justify-between px-4 gap-4" style={{ backgroundColor: '#B8D4E8' }}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 flex-shrink-0">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: '#1A2E55' }}
        >
          {/* Lion silhouette SVG */}
          <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="20" cy="26" rx="9" ry="7" fill="#B8D4E8" />
            <circle cx="20" cy="15" r="7" fill="#B8D4E8" />
            <ellipse cx="20" cy="14" rx="5" ry="4" fill="#B8D4E8" />
            <circle cx="17.5" cy="13.5" r="1.2" fill="#1A2E55" />
            <circle cx="22.5" cy="13.5" r="1.2" fill="#1A2E55" />
            <path d="M18.5 16.5 Q20 17.5 21.5 16.5" stroke="#1A2E55" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <ellipse cx="14" cy="12" rx="3" ry="4" fill="#c8a86a" opacity="0.7" />
            <ellipse cx="26" cy="12" rx="3" ry="4" fill="#c8a86a" opacity="0.7" />
            <ellipse cx="20" cy="9" rx="4" ry="3" fill="#c8a86a" opacity="0.5" />
          </svg>
        </div>
        <div className="font-serif">
          <div className="text-xs tracking-[0.2em] uppercase font-semibold leading-none" style={{ color: '#1A2E55' }}>The</div>
          <div className="text-sm tracking-[0.3em] uppercase font-bold leading-none" style={{ color: '#1A2E55' }}>Ritz-Carlton</div>
          <div className="text-[9px] tracking-[0.15em] uppercase leading-none mt-0.5" style={{ color: '#1A2E55' }}>HR Intranet</div>
        </div>
      </Link>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#1A2E55' }} />
          <input
            type="text"
            placeholder="Search this site"
            className="w-full pl-9 pr-4 py-2 rounded-full text-sm outline-none border border-transparent focus:border-[#1A2E55] bg-white/80 placeholder-[#6b7a96]"
            style={{ color: '#1A2E55' }}
          />
        </div>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <Link
          href="/"
          className={`p-2 rounded-full transition-colors ${pathname === '/' ? 'bg-[#1A2E55]/20' : 'hover:bg-[#1A2E55]/10'}`}
          title="Home"
        >
          <Home className="w-5 h-5" style={{ color: '#1A2E55' }} />
        </Link>
        <button className="p-2 rounded-full hover:bg-[#1A2E55]/10 transition-colors" title="Announcements">
          <Megaphone className="w-5 h-5" style={{ color: '#1A2E55' }} />
        </button>
        <button className="p-2 rounded-full hover:bg-[#1A2E55]/10 transition-colors" title="Settings">
          <Settings className="w-5 h-5" style={{ color: '#1A2E55' }} />
        </button>
        <div
          className="ml-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold font-serif flex-shrink-0"
          style={{ backgroundColor: '#1A2E55' }}
        >
          KN
        </div>
      </div>
    </header>
  )
}
