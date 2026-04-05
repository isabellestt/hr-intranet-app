'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  User, FileText, CalendarCheck, Clock, Receipt, BookOpen,
  Users, GraduationCap, Search, X, ArrowRight,
  Building2, MessageSquare, Rocket, BarChart2, ChevronRight,
} from 'lucide-react'
import TopNavbar from '@/components/top-navbar'
import Footer from '@/components/footer'
import CalendarWidget from '@/components/calendar-widget'
import { announcements } from '@/lib/mock-data'

// ── Search index ──────────────────────────────────────────────────────────────
// Every searchable destination in the intranet. Add entries here as new
// pages are built — they will automatically appear in search results.

interface SearchEntry {
  title:    string
  excerpt:  string
  href:     string
  category: string
  icon:     React.ElementType
  keywords: string[]
}

const SEARCH_INDEX: SearchEntry[] = [
  // Employee Self-Service
  { title: 'Personal Profile',         excerpt: 'View and update your personal details, bank account, and contact information.',        href: '/employee-self-service',             category: 'Employee Self-Service', icon: User,          keywords: ['profile', 'personal', 'bank', 'name', 'address', 'contact', 'nationality'] },
  { title: 'Payslips',                 excerpt: 'Download your monthly payslips going back to 2024.',                                    href: '/employee-self-service/payslips',    category: 'Employee Self-Service', icon: FileText,      keywords: ['payslip', 'salary', 'pay', 'wages', 'income', 'download'] },
  { title: 'Leave Application',        excerpt: 'Apply for annual, medical, urgent, or unpaid leave.',                                   href: '/employee-self-service/leave',       category: 'Employee Self-Service', icon: CalendarCheck, keywords: ['leave', 'annual', 'medical', 'sick', 'urgent', 'apply', 'holiday', 'off', 'vacation'] },
  { title: 'Attendance',               excerpt: 'View your attendance history, clock-in/out times, and shift records.',                  href: '/employee-self-service/attendance',  category: 'Employee Self-Service', icon: Clock,         keywords: ['attendance', 'clock', 'shift', 'present', 'absent', 'hours'] },
  { title: 'Claims & Reimbursement',   excerpt: 'Submit expense claims and track reimbursement status.',                                 href: '/employee-self-service/claims',      category: 'Employee Self-Service', icon: Receipt,       keywords: ['claims', 'reimbursement', 'expense', 'receipt', 'refund', 'money'] },

  // HR Information & Policies
  { title: 'HR Policy Library',        excerpt: 'Browse employment, leave, compensation, and conduct policies.',                          href: '/hr-information',                    category: 'HR Information',        icon: BookOpen,      keywords: ['policy', 'policies', 'rules', 'hr', 'employment', 'conduct', 'handbook'] },
  { title: 'Employee Handbook',        excerpt: 'Full handbook covering company profile, remuneration, benefits, and regulations.',       href: '/hr-information/handbook',           category: 'HR Information',        icon: BookOpen,      keywords: ['handbook', 'manual', 'benefits', 'remuneration', 'rules', 'regulations'] },
  { title: 'Benefits Policies',        excerpt: 'Medical, dental, insurance, and staff benefits overview.',                               href: '/hr-information/benefits',           category: 'HR Information',        icon: BookOpen,      keywords: ['benefits', 'medical', 'dental', 'insurance', 'coverage', 'health'] },
  { title: 'FAQ',                      excerpt: 'Answers to the most common HR questions.',                                               href: '/hr-information/faq',                category: 'HR Information',        icon: BookOpen,      keywords: ['faq', 'questions', 'help', 'answers', 'common', 'how to'] },

  // Work & Task Management
  { title: 'Company Calendar',         excerpt: 'View upcoming company events, public holidays, and key dates.',                         href: '/work-task-management/calendar',     category: 'Work & Task Management', icon: CalendarCheck, keywords: ['calendar', 'events', 'holiday', 'schedule', 'dates', 'upcoming'] },
  { title: 'Employee Task Dashboard',  excerpt: 'Track your assigned projects and task progress.',                                        href: '/work-task-management/tasks',        category: 'Work & Task Management', icon: BarChart2,     keywords: ['tasks', 'projects', 'dashboard', 'progress', 'work', 'assignments'] },
  { title: 'Facilities Booking',       excerpt: 'Book meeting rooms, training rooms, and other hotel facilities.',                        href: '/work-task-management/facilities',   category: 'Work & Task Management', icon: Building2,     keywords: ['facilities', 'booking', 'room', 'meeting', 'training', 'venue', 'reserve'] },

  // People & Communication
  { title: 'Organisational Chart',     excerpt: 'View the full hotel org chart with department structure.',                               href: '/people-communication/org-chart',   category: 'People & Communication', icon: Users,         keywords: ['org chart', 'organisation', 'departments', 'hierarchy', 'team', 'structure', 'manager'] },
  { title: 'Company Updates',          excerpt: 'Latest announcements and news from management.',                                         href: '/people-communication/updates',      category: 'People & Communication', icon: MessageSquare, keywords: ['updates', 'announcements', 'news', 'notices', 'company'] },
  { title: 'Birthday Calendar',        excerpt: 'Upcoming staff birthdays this month.',                                                   href: '/people-communication/birthdays',    category: 'People & Communication', icon: Users,         keywords: ['birthday', 'birthdays', 'staff', 'celebration', 'colleagues'] },
  { title: 'Staff Directory',          excerpt: 'Search for colleagues by name, department, or role.',                                    href: '/people-communication',              category: 'People & Communication', icon: Users,         keywords: ['staff', 'directory', 'colleagues', 'employees', 'contact', 'find', 'search people'] },

  // Learning & Development
  { title: 'Learning & Development',   excerpt: 'Browse training programmes, e-learning courses, and development opportunities.',        href: '/learning-development',              category: 'Learning & Development', icon: GraduationCap, keywords: ['learning', 'training', 'courses', 'development', 'e-learning', 'skills', 'education'] },
  { title: 'Training Proposal',        excerpt: 'Submit a non-technical training proposal for manager approval.',                         href: '/learning-development/proposal',     category: 'Learning & Development', icon: GraduationCap, keywords: ['training proposal', 'course request', 'sponsor', 'external course', 'fee'] },

  // HR Processes
  { title: 'Onboarding',               excerpt: 'Complete your onboarding surveys and review the onboarding deck.',                       href: '/hr-processes/onboarding',           category: 'HR Processes',           icon: Rocket,        keywords: ['onboarding', 'new staff', 'orientation', 'induction', 'survey', 'compliance'] },
  { title: 'Internal Job Postings',    excerpt: 'Browse and apply for open internal positions across the hotel.',                         href: '/hr-processes/jobs',                 category: 'HR Processes',           icon: Rocket,        keywords: ['jobs', 'internal', 'vacancies', 'apply', 'career', 'promotion', 'transfer', 'role'] },

  // Engagement & Feedback
  { title: 'Pulse Survey',             excerpt: 'Complete your periodic employee pulse survey.',                                          href: '/engagement/pulse',                  category: 'Engagement & Feedback',  icon: BarChart2,     keywords: ['pulse', 'survey', 'feedback', 'engagement', 'satisfaction'] },
  { title: 'Feedback & Suggestions',   excerpt: 'Submit anonymous or named suggestions, compliments, or concerns to HR.',                href: '/engagement/feedback',               category: 'Engagement & Feedback',  icon: MessageSquare, keywords: ['feedback', 'suggestion', 'compliment', 'concern', 'anonymous', 'ideas'] },
]

// ── Quick links (unchanged) ───────────────────────────────────────────────────

const quickLinks = [
  { label: 'My Profile',              icon: User,          href: '/employee-self-service'           },
  { label: 'My Payslips',             icon: FileText,      href: '/employee-self-service/payslips'  },
  { label: 'Leave Application',       icon: CalendarCheck, href: '/employee-self-service/leave'     },
  { label: 'Attendance',              icon: Clock,         href: '/employee-self-service/attendance'},
  { label: 'Claims',                  icon: Receipt,       href: '/employee-self-service/claims'    },
  { label: 'HR Policies',             icon: BookOpen,      href: '/hr-information'                  },
  { label: 'Staff Directory',         icon: Users,         href: '/people-communication'            },
  { label: 'Learning & Development',  icon: GraduationCap, href: '/learning-development'            },
]

// ── Search logic ──────────────────────────────────────────────────────────────

function runSearch(query: string): SearchEntry[] {
  const q = query.toLowerCase().trim()
  if (!q) return []

  return SEARCH_INDEX.filter((entry) => {
    const haystack = [
      entry.title,
      entry.excerpt,
      entry.category,
      ...entry.keywords,
    ].join(' ').toLowerCase()
    return haystack.includes(q)
  }).slice(0, 8)   // cap at 8 results
}

// ── Global Search Bar ─────────────────────────────────────────────────────────

function GlobalSearchBar() {
  const router                  = useRouter()
  const [query,   setQuery]     = useState('')
  const [results, setResults]   = useState<SearchEntry[]>([])
  const [focused, setFocused]   = useState(false)
  const [active,  setActive]    = useState(-1)   // keyboard nav index
  const inputRef                = useRef<HTMLInputElement>(null)
  const dropdownRef             = useRef<HTMLDivElement>(null)

  // Re-run search whenever query changes
  useEffect(() => {
    setResults(runSearch(query))
    setActive(-1)
  }, [query])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current   && !inputRef.current.contains(e.target as Node)
      ) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive(i => Math.max(i - 1, -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const target = active >= 0 ? results[active] : results[0]
      if (target) { router.push(target.href); setFocused(false); setQuery('') }
    } else if (e.key === 'Escape') {
      setFocused(false)
      inputRef.current?.blur()
    }
  }

  const showDropdown = focused && query.length > 0

  // Group results by category for display
  const grouped = results.reduce<Record<string, SearchEntry[]>>((acc, r) => {
    if (!acc[r.category]) acc[r.category] = []
    acc[r.category].push(r)
    return acc
  }, {})

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Input row */}
      <div
        className="flex items-center gap-3 px-5 py-3 transition-all"
        style={{
          backgroundColor: 'rgba(255,255,255,0.12)',
          border:          focused ? '1px solid rgba(255,255,255,0.7)' : '1px solid rgba(255,255,255,0.35)',
          backdropFilter:  'blur(8px)',
        }}
      >
        <Search className="w-4 h-4 flex-shrink-0 text-white/60" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search forms, policies, pages…"
          className="flex-1 bg-transparent font-sans text-sm text-white placeholder-white/40 outline-none"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); inputRef.current?.focus() }}
            className="flex-shrink-0 text-white/40 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown results */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 z-50 overflow-hidden"
          style={{
            backgroundColor: '#0F1D38',
            border:          '1px solid rgba(255,255,255,0.12)',
            boxShadow:       '0 16px 48px rgba(0,0,0,0.5)',
            maxHeight:       420,
            overflowY:       'auto',
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
                  {/* Category header */}
                  <div
                    className="px-5 py-2 font-sans text-xs uppercase tracking-widest"
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
                        onClick={() => { setFocused(false); setQuery('') }}
                        onMouseEnter={() => setActive(globalIdx)}
                        className="flex items-start gap-3 px-5 py-3 transition-colors"
                        style={{
                          backgroundColor: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                          borderBottom:    '1px solid rgba(255,255,255,0.04)',
                        }}
                      >
                        <Icon
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                          style={{ color: isActive ? '#B8975A' : 'rgba(255,255,255,0.4)' }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-sm font-semibold text-white truncate">{entry.title}</p>
                          <p className="font-sans text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.45)' }}>
                            {entry.excerpt}
                          </p>
                        </div>
                        <ChevronRight
                          className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                          style={{ color: isActive ? '#B8975A' : 'rgba(255,255,255,0.2)' }}
                        />
                      </Link>
                    )
                  })}
                </div>
              ))}

              {/* Footer hint */}
              <div
                className="flex items-center justify-between px-5 py-2 font-sans text-xs"
                style={{
                  color:           'rgba(255,255,255,0.25)',
                  borderTop:       '1px solid rgba(255,255,255,0.06)',
                  backgroundColor: 'rgba(0,0,0,0.2)',
                }}
              >
                <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
                <span>↑↓ navigate · Enter to go · Esc to close</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopNavbar />

      {/* Hero Banner */}
      {/*
        The image lives in its own overflow-hidden div so it gets cropped correctly.
        The overlay sits as a sibling, positioned over the image with negative margin,
        but is NOT inside overflow-hidden — so the search dropdown can spill below.
      */}
      <div className="relative">
        {/* Cropped image */}
        <div className="h-[400px] overflow-hidden">
          <img
            src="/hero-hotel.jpg"
            alt="Ritz-Carlton luxury hotel lobby"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Overlay — sits over the image, overflow visible so dropdown escapes */}
        <div className="absolute inset-x-0 top-0 h-[400px] bg-gradient-to-b from-black/50 via-black/40 to-black/60 flex flex-col items-center justify-center px-6">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white text-center mb-3">
            Welcome back, KSN
          </h1>
          <p className="text-[#B8975A] text-sm tracking-[0.3em] uppercase font-sans mb-8">
            The Ritz-Carlton &middot; Human Resources Portal
          </p>

          {/* Global search bar */}
          <GlobalSearchBar />
        </div>
      </div>

      {/* Quick Access */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-serif text-2xl font-semibold text-[#1B2A4A]">Quick Access</h2>
            <div className="flex-1 h-px bg-[#B8975A] max-w-[60px]" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickLinks.map(({ label, icon: Icon, href }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-4 p-6 bg-white border border-[#E5E5E5] hover:border-[#B8975A] hover:shadow-md transition-all group"
              >
                <Icon className="w-6 h-6 text-[#1B2A4A] group-hover:text-[#B8975A] transition-colors" />
                <span className="font-serif text-sm text-[#1B2A4A] text-center">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements + Calendar */}
      <section className="py-16 px-6 bg-[#F5F4F0]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">

            {/* Announcements */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-serif text-2xl font-semibold text-[#1B2A4A]">Announcements & Updates</h2>
                <div className="flex-1 h-px bg-[#B8975A] max-w-[60px]" />
              </div>
              <div className="space-y-6">
                {announcements.map((item, i) => (
                  <article key={i} className="pb-6 border-b border-[#E5E5E5] last:border-0">
                    <time className="text-xs font-sans text-[#888] uppercase tracking-wide">{item.date}</time>
                    <h3 className="font-serif text-lg font-semibold text-[#1B2A4A] mt-2 mb-2">{item.title}</h3>
                    <p className="text-sm font-sans text-[#666] leading-relaxed mb-3">{item.excerpt}</p>
                    <button className="text-[#B8975A] text-sm font-sans font-medium hover:underline">
                      Read more &rarr;
                    </button>
                  </article>
                ))}
              </div>
            </div>

            {/* Calendar */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-serif text-xl font-semibold text-[#1B2A4A]">Calendar</h2>
                <div className="flex-1 h-px bg-[#B8975A] max-w-[40px]" />
              </div>
              <CalendarWidget />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}