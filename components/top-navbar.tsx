'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Search, Bell, ChevronDown } from 'lucide-react'

const navItems = [
  {
    label: 'Employee Self-Service',
    href: '/employee-self-service',
    subItems: [
      { label: 'Personal Profile', href: '/employee-self-service' },
      { label: 'Payslips', href: '/employee-self-service/payslips' },
      { label: 'Leave Application', href: '/employee-self-service/leave' },
      { label: 'Attendance', href: '/employee-self-service/attendance' },
      { label: 'Claims & Reimbursement', href: '/employee-self-service/claims' },
    ],
  },
  {
    label: 'HR Information & Policies',
    href: '/hr-information',
    subItems: [
      { label: 'HR Policy Library', href: '/hr-information' },
      { label: 'Employee Handbook', href: '/hr-information/handbook' },
      { label: 'Benefits Policies', href: '/hr-information/benefits' },
      { label: 'FAQ', href: '/hr-information/faq' },
    ],
  },
  { label: 'Work & Tasks', href: '/work-tasks', subItems: [] },
  { label: 'People & Communication', href: '/people-communication', subItems: [] },
  { label: 'Learning & Development', href: '/learning-development', subItems: [] },
  { label: 'HR Processes', href: '/hr-processes', subItems: [] },
  { label: 'Engagement & Feedback', href: '/engagement-feedback', subItems: [] },
]

export default function TopNavbar() {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-[#E5E5E5] sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 flex-shrink-0">
        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
          {/* Lion crest SVG */}
          <svg viewBox="0 0 40 40" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" stroke="#1B2A4A" strokeWidth="1.5" fill="none" />
            <ellipse cx="20" cy="23" rx="7" ry="5.5" fill="#1B2A4A" />
            <circle cx="20" cy="14" r="5.5" fill="#1B2A4A" />
            <circle cx="18" cy="13" r="1" fill="white" />
            <circle cx="22" cy="13" r="1" fill="white" />
            <path d="M18.5 15.5 Q20 16.5 21.5 15.5" stroke="white" strokeWidth="0.6" fill="none" strokeLinecap="round" />
            <ellipse cx="14" cy="12" rx="2.5" ry="3.5" fill="#B8975A" opacity="0.9" />
            <ellipse cx="26" cy="12" rx="2.5" ry="3.5" fill="#B8975A" opacity="0.9" />
            <ellipse cx="20" cy="9" rx="3" ry="2.5" fill="#B8975A" opacity="0.7" />
          </svg>
        </div>
        <div className="font-serif">
          <div className="text-[10px] tracking-[0.25em] uppercase font-medium leading-none text-[#1B2A4A]">The</div>
          <div className="text-sm tracking-[0.2em] uppercase font-semibold leading-tight text-[#1B2A4A]">Ritz-Carlton</div>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="hidden lg:flex items-center gap-1">
        {navItems.map((item) => (
          <div
            key={item.href}
            className="relative"
            onMouseEnter={() => item.subItems.length > 0 && setOpenDropdown(item.label)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <Link
              href={item.href}
              className={`flex items-center gap-1 px-3 py-2 text-xs font-sans font-medium transition-colors ${
                isActive(item.href)
                  ? 'text-[#1B2A4A]'
                  : 'text-[#666] hover:text-[#1B2A4A]'
              }`}
            >
              {item.label}
              {item.subItems.length > 0 && <ChevronDown className="w-3 h-3" />}
            </Link>
            {/* Gold underline for active */}
            {isActive(item.href) && (
              <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#B8975A]" />
            )}
            {/* Dropdown */}
            {item.subItems.length > 0 && openDropdown === item.label && (
              <div className="absolute top-full left-0 mt-0 bg-white border border-[#E5E5E5] shadow-lg min-w-[200px] py-1 z-50">
                {item.subItems.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className="block px-4 py-2.5 text-xs font-sans text-[#444] hover:bg-[#F5F4F0] hover:text-[#1B2A4A] border-l-2 border-transparent hover:border-[#B8975A] transition-all"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Right Icons */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <button className="p-2 hover:bg-[#F5F4F0] transition-colors" title="Search">
          <Search className="w-4 h-4 text-[#1B2A4A]" />
        </button>
        <button className="p-2 hover:bg-[#F5F4F0] transition-colors" title="Notifications">
          <Bell className="w-4 h-4 text-[#1B2A4A]" />
        </button>
        <div
          className="w-8 h-8 flex items-center justify-center text-white text-xs font-semibold font-sans flex-shrink-0 bg-[#1B2A4A]"
        >
          KSN
        </div>
      </div>
    </header>
  )
}
