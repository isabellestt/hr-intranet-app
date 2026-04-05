'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Search, Bell, ChevronDown, X, ChevronRight } from 'lucide-react'
import {
  User, FileText, CalendarCheck, Clock, Receipt, BookOpen,
  Users, GraduationCap, Building2, MessageSquare, Rocket, BarChart2,
} from 'lucide-react'

// ── Search index (keep in sync with HomePage) ─────────────────────────────────

interface SearchEntry {
  title:    string
  excerpt:  string
  href:     string
  category: string
  icon:     React.ElementType
  keywords: string[]
}

const SEARCH_INDEX: SearchEntry[] = [
  { title: 'Personal Profile',         excerpt: 'View and update your personal details, bank account, and contact information.',        href: '/employee-self-service',                   category: 'Employee Self-Service',  icon: User,          keywords: ['profile', 'personal', 'bank', 'name', 'address', 'contact', 'nationality'] },
  { title: 'Payslips',                 excerpt: 'Download your monthly payslips going back to 2024.',                                   href: '/employee-self-service/payslips',          category: 'Employee Self-Service',  icon: FileText,      keywords: ['payslip', 'salary', 'pay', 'wages', 'income', 'download'] },
  { title: 'Leave Application',        excerpt: 'Apply for annual, medical, urgent, or unpaid leave.',                                  href: '/employee-self-service/leave',             category: 'Employee Self-Service',  icon: CalendarCheck, keywords: ['leave', 'annual', 'medical', 'sick', 'urgent', 'apply', 'holiday', 'off', 'vacation'] },
  { title: 'Attendance',               excerpt: 'View your attendance history, clock-in/out times, and shift records.',                 href: '/employee-self-service/attendance',        category: 'Employee Self-Service',  icon: Clock,         keywords: ['attendance', 'clock', 'shift', 'present', 'absent', 'hours'] },
  { title: 'Claims & Reimbursement',   excerpt: 'Submit expense claims and track reimbursement status.',                                href: '/employee-self-service/claims',            category: 'Employee Self-Service',  icon: Receipt,       keywords: ['claims', 'reimbursement', 'expense', 'receipt', 'refund', 'money'] },
  { title: 'HR Policy Library',        excerpt: 'Browse employment, leave, compensation, and conduct policies.',                         href: '/hr-information',                          category: 'HR Information',         icon: BookOpen,      keywords: ['policy', 'policies', 'rules', 'hr', 'employment', 'conduct', 'handbook'] },
  { title: 'Employee Handbook',        excerpt: 'Full handbook covering company profile, remuneration, benefits, and regulations.',      href: '/hr-information/handbook',                category: 'HR Information',         icon: BookOpen,      keywords: ['handbook', 'manual', 'benefits', 'remuneration', 'rules', 'regulations'] },
  { title: 'Benefits Policies',        excerpt: 'Medical, dental, insurance, and staff benefits overview.',                              href: '/hr-information/benefits',                category: 'HR Information',         icon: BookOpen,      keywords: ['benefits', 'medical', 'dental', 'insurance', 'coverage', 'health'] },
  { title: 'FAQ',                      excerpt: 'Answers to the most common HR questions.',                                              href: '/hr-information/faq',                     category: 'HR Information',         icon: BookOpen,      keywords: ['faq', 'questions', 'help', 'answers', 'common', 'how to'] },
  { title: 'Company Calendar',         excerpt: 'View upcoming company events, public holidays, and key dates.',                        href: '/work-tasks',                              category: 'Work & Tasks',           icon: CalendarCheck, keywords: ['calendar', 'events', 'holiday', 'schedule', 'dates', 'upcoming'] },
  { title: 'Employee Task Dashboard',  excerpt: 'Track your assigned projects and task progress.',                                       href: '/work-tasks/project-dashboard',           category: 'Work & Tasks',           icon: BarChart2,     keywords: ['tasks', 'projects', 'dashboard', 'progress', 'work', 'assignments'] },
  { title: 'Facilities Booking',       excerpt: 'Book meeting rooms, training rooms, and other hotel facilities.',                       href: '/work-tasks/facilities-booking',          category: 'Work & Tasks',           icon: Building2,     keywords: ['facilities', 'booking', 'room', 'meeting', 'training', 'venue', 'reserve'] },
  { title: 'Organisational Chart',     excerpt: 'View the full hotel org chart with department structure.',                              href: '/people-communication',                   category: 'People & Communication', icon: Users,         keywords: ['org chart', 'organisation', 'departments', 'hierarchy', 'team', 'structure', 'manager'] },
  { title: 'Company Updates',          excerpt: 'Latest announcements and news from management.',                                        href: '/people-communication/company-updates',   category: 'People & Communication', icon: MessageSquare, keywords: ['updates', 'announcements', 'news', 'notices', 'company'] },
  { title: 'Birthday Calendar',        excerpt: 'Upcoming staff birthdays this month.',                                                  href: '/people-communication/birthday-calendar', category: 'People & Communication', icon: Users,         keywords: ['birthday', 'birthdays', 'staff', 'celebration', 'colleagues'] },
  { title: 'Learning & Development',   excerpt: 'Browse training programmes, e-learning courses, and development opportunities.',       href: '/learning-development',                   category: 'Learning & Development', icon: GraduationCap, keywords: ['learning', 'training', 'courses', 'development', 'e-learning', 'skills', 'education'] },
  { title: 'Training Proposal',        excerpt: 'Submit a non-technical training proposal for manager approval.',                        href: '/learning-development/training-proposal', category: 'Learning & Development', icon: GraduationCap, keywords: ['training proposal', 'course request', 'sponsor', 'external course', 'fee'] },
  { title: 'Onboarding',               excerpt: 'Complete your onboarding surveys and review the onboarding deck.',                      href: '/hr-processes',                           category: 'HR Processes',           icon: Rocket,        keywords: ['onboarding', 'new staff', 'orientation', 'induction', 'survey', 'compliance'] },
  { title: 'Internal Job Postings',    excerpt: 'Browse and apply for open internal positions across the hotel.',                        href: '/hr-processes/internal-job-postings',     category: 'HR Processes',           icon: Rocket,        keywords: ['jobs', 'internal', 'vacancies', 'apply', 'career', 'promotion', 'transfer', 'role'] },
  { title: 'Pulse Survey',             excerpt: 'Complete your periodic employee pulse survey.',                                         href: '/engagement-feedback',                    category: 'Engagement & Feedback',  icon: BarChart2,     keywords: ['pulse', 'survey', 'feedback', 'engagement', 'satisfaction'] },
  { title: 'Feedback & Suggestions',   excerpt: 'Submit anonymous or named suggestions, compliments, or concerns to HR.',               href: '/engagement-feedback/feedback',           category: 'Engagement & Feedback',  icon: MessageSquare, keywords: ['feedback', 'suggestion', 'compliment', 'concern', 'anonymous', 'ideas'] },
]

function runSearch(query: string): SearchEntry[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  return SEARCH_INDEX.filter((entry) => {
    const haystack = [entry.title, entry.excerpt, entry.category, ...entry.keywords].join(' ').toLowerCase()
    return haystack.includes(q)
  }).slice(0, 8)
}

// ── Nav items ─────────────────────────────────────────────────────────────────

const navItems = [
  {
    label: 'Employee Self-Service',
    href: '/employee-self-service',
    subItems: [
      { label: 'Personal Profile',       href: '/employee-self-service'           },
      { label: 'Payslips',               href: '/employee-self-service/payslips'  },
      { label: 'Leave Application',      href: '/employee-self-service/leave'     },
      { label: 'Attendance',             href: '/employee-self-service/attendance'},
      { label: 'Claims & Reimbursement', href: '/employee-self-service/claims'    },
    ],
  },
  {
    label: 'HR Information & Policies',
    href: '/hr-information',
    subItems: [
      { label: 'HR Policy Library', href: '/hr-information'          },
      { label: 'Employee Handbook', href: '/hr-information/handbook' },
      { label: 'Benefits Policies', href: '/hr-information/benefits' },
      { label: 'FAQ',               href: '/hr-information/faq'      },
    ],
  },
  {
    label: 'Work & Tasks',
    href: '/work-tasks',
    subItems: [
      { label: 'Company Calendar',        href: '/work-tasks'                    },
      { label: 'Employee Task Dashboard', href: '/work-tasks/project-dashboard'  },
      { label: 'Facilities Booking',      href: '/work-tasks/facilities-booking' },
    ],
  },
  {
    label: 'People & Communication',
    href: '/people-communication',
    subItems: [
      { label: 'Organisational Chart', href: '/people-communication'                    },
      { label: 'Company Updates',      href: '/people-communication/company-updates'    },
      { label: 'Birthday Calendar',    href: '/people-communication/birthday-calendar'  },
    ],
  },
  {
    label: 'Learning & Development',
    href: '/learning-development',
    subItems: [
      { label: 'Internal Training',  href: '/learning-development'                   },
      { label: 'Training Proposal',  href: '/learning-development/training-proposal' },
      { label: 'FAQ',                href: '/learning-development/faq'               },
    ],
  },
  {
    label: 'HR Processes',
    href: '/hr-processes',
    subItems: [
      { label: 'Onboarding',            href: '/hr-processes'                        },
      { label: 'Competency Framework',  href: '/hr-processes/competency-framework'   },
      { label: 'Internal Job Postings', href: '/hr-processes/internal-job-postings'  },
    ],
  },
  {
    label: 'Engagement & Feedback',
    href: '/engagement-feedback',
    subItems: [
      { label: 'Pulse Survey', href: '/engagement-feedback'          },
      { label: 'Feedback',     href: '/engagement-feedback/feedback' },
    ],
  },
  { label: 'News Room', href: '/newsroom', subItems: [] },
]

// ── Navbar search widget (inline, right-aligned) ──────────────────────────────

function NavbarSearch({ onClose }: { onClose: () => void }) {
  const router       = useRouter()
  const inputRef     = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [query,   setQuery]   = useState('')
  const [results, setResults] = useState<SearchEntry[]>([])
  const [active,  setActive]  = useState(-1)

  useEffect(() => { inputRef.current?.focus() }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => { setResults(runSearch(query)); setActive(-1) }, [query])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown')      { e.preventDefault(); setActive(i => Math.min(i + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(i => Math.max(i - 1, -1)) }
    else if (e.key === 'Enter') {
      e.preventDefault()
      const target = active >= 0 ? results[active] : results[0]
      if (target) { router.push(target.href); onClose() }
    }
  }

  const grouped = results.reduce<Record<string, SearchEntry[]>>((acc, r) => {
    if (!acc[r.category]) acc[r.category] = []
    acc[r.category].push(r)
    return acc
  }, {})

  return (
    // Sits inline in the right-icons row; dropdown is positioned relative to this container
    <div ref={containerRef} className="relative">
      {/* Input pill */}
      <div
        className="flex items-center gap-2 px-3 py-1.5"
        style={{
          width:  320,
          border: '1px solid #1B2A4A',
        }}
      >
        <Search className="w-3.5 h-3.5 flex-shrink-0 text-[#1B2A4A]/40" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search pages, forms, policies…"
          className="flex-1 bg-transparent font-sans text-xs text-[#1B2A4A] placeholder-[#1B2A4A]/35 outline-none"
        />
        <button
          onClick={onClose}
          className="flex-shrink-0 text-[#1B2A4A]/30 hover:text-[#1B2A4A] transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Dropdown — right-aligned to the input, 400px wide */}
      {query.length > 0 && (
        <div
          className="absolute right-0 top-full mt-1 overflow-y-auto"
          style={{
            width:           400,
            backgroundColor: '#0F1D38',
            border:          '1px solid rgba(255,255,255,0.1)',
            borderTop:       '2px solid #B8975A',
            boxShadow:       '0 16px 48px rgba(0,0,0,0.35)',
            maxHeight:       400,
            zIndex:          100,
          }}
        >
          {results.length === 0 ? (
            <div className="px-5 py-4 font-sans text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              No results for "{query}"
            </div>
          ) : (
            <>
              {Object.entries(grouped).map(([category, entries]) => (
                <div key={category}>
                  <div
                    className="px-5 py-1.5 font-sans text-xs uppercase tracking-widest"
                    style={{
                      color:           '#B8975A',
                      backgroundColor: 'rgba(184,151,90,0.06)',
                      borderBottom:    '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {category}
                  </div>
                  {entries.map((entry) => {
                    const globalIdx = results.indexOf(entry)
                    const isActive  = globalIdx === active
                    const Icon      = entry.icon
                    return (
                      <Link
                        key={entry.href}
                        href={entry.href}
                        onClick={onClose}
                        onMouseEnter={() => setActive(globalIdx)}
                        className="flex items-start gap-3 px-5 py-2.5 transition-colors"
                        style={{
                          backgroundColor: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                          borderBottom:    '1px solid rgba(255,255,255,0.04)',
                        }}
                      >
                        <Icon className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: isActive ? '#B8975A' : 'rgba(255,255,255,0.35)' }} />
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-xs font-semibold text-white truncate">{entry.title}</p>
                          <p className="font-sans text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>
                            {entry.excerpt}
                          </p>
                        </div>
                        <ChevronRight className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: isActive ? '#B8975A' : 'rgba(255,255,255,0.2)' }} />
                      </Link>
                    )
                  })}
                </div>
              ))}
              <div
                className="flex items-center justify-between px-5 py-1.5 font-sans"
                style={{
                  fontSize:        10,
                  color:           'rgba(255,255,255,0.25)',
                  borderTop:       '1px solid rgba(255,255,255,0.06)',
                  backgroundColor: 'rgba(0,0,0,0.2)',
                }}
              >
                <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
                <span>↑↓ · Enter · Esc</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function TopNavbar() {
  const pathname                            = usePathname()
  const [openDropdown, setOpenDropdown]     = useState<string | null>(null)
  const [searchOpen,   setSearchOpen]       = useState(false)

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-[#E5E5E5] sticky top-0 z-50 relative">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 flex-shrink-0">
        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
          <Image
            src="/ritz-carlton-logo.png"
            alt="Ritz-Carlton Logo"
            width={36}
            height={36}
            className="object-contain"
          />
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
                isActive(item.href) ? 'text-[#1B2A4A]' : 'text-[#666] hover:text-[#1B2A4A]'
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

      {/* Right icons */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {searchOpen ? (
          <NavbarSearch onClose={() => setSearchOpen(false)} />
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 hover:bg-[#F5F4F0] transition-colors"
            title="Search"
          >
            <Search className="w-4 h-4 text-[#1B2A4A]" />
          </button>
        )}
        <button className="p-2 hover:bg-[#F5F4F0] transition-colors" title="Notifications">
          <Bell className="w-4 h-4 text-[#1B2A4A]" />
        </button>
        <div className="w-8 h-8 flex items-center justify-center text-white text-xs font-semibold font-sans flex-shrink-0 bg-[#1B2A4A]">
          <Link href="/employee-self-service">KSN</Link>
        </div>
      </div>

      {/* No overlay — NavbarSearch is inline above */}
    </header>
  )
}