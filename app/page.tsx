'use client'

import Link from 'next/link'
import { Search, User, FileText, CalendarCheck, Users, GraduationCap, Rocket, MessageSquare } from 'lucide-react'
import TopNavbar from '@/components/top-navbar'
import CalendarWidget, { StaffDirectoryWidget } from '@/components/calendar-widget'

const sections = [
  { label: 'Employee Self-Service', icon: User, href: '/employee-self-service' },
  { label: 'HR Information & Policies', icon: FileText, href: '/hr-information' },
  { label: 'Work & Task Management', icon: CalendarCheck, href: '/work-tasks' },
  { label: 'People & Communication', icon: Users, href: '/people-communication' },
  { label: 'Learning & Development', icon: GraduationCap, href: '/learning-development' },
  { label: 'HR Processes', icon: Rocket, href: '/hr-processes' },
  { label: 'Engagement & Feedback', icon: MessageSquare, href: '/engagement-feedback' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopNavbar />

      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="/hero-hotel.jpg"
          alt="Ritz-Carlton luxury hotel lobby"
          className="w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-5"
          style={{ background: 'linear-gradient(135deg, rgba(26,46,85,0.78) 0%, rgba(10,18,35,0.68) 100%)' }}
        >
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white text-center text-balance drop-shadow">
            Welcome, KSN!
          </h1>
          <div className="relative w-full max-w-md px-4">
            <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A2E55]" />
            <input
              type="text"
              placeholder="Search Forms & Templates"
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-sm bg-white/95 focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-[#1A2E55] placeholder-[#6b7a96]"
            />
          </div>
        </div>
      </div>

      {/* Section Cards */}
      <div className="px-6 py-6 bg-white">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 max-w-6xl mx-auto">
          {sections.map(({ label, icon: Icon, href }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all hover:shadow-md hover:-translate-y-0.5 group"
              style={{ backgroundColor: '#B8D4E8' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ backgroundColor: '#1A2E55' }}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-semibold text-center leading-tight font-sans" style={{ color: '#1A2E55' }}>
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Staff Directory + Calendar */}
      <div className="flex flex-col md:flex-row gap-6 px-6 pb-10 max-w-6xl mx-auto w-full">
        {/* Staff Directory ~70% */}
        <div className="flex-[7] min-w-0 bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <StaffDirectoryWidget />
        </div>
        {/* Calendar ~30% */}
        <div className="flex-[3] min-w-0">
          <h2 className="font-serif text-xl font-bold mb-3" style={{ color: '#1A2E55' }}>
            Calendar
          </h2>
          <CalendarWidget />
        </div>
      </div>
    </div>
  )
}
