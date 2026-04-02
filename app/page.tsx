'use client'

import Link from 'next/link'
import { User, FileText, CalendarCheck, Clock, Receipt, BookOpen, Users, GraduationCap } from 'lucide-react'
import TopNavbar from '@/components/top-navbar'
import Footer from '@/components/footer'
import CalendarWidget from '@/components/calendar-widget'
import { announcements } from '@/lib/mock-data'

const quickLinks = [
  { label: 'My Profile', icon: User, href: '/employee-self-service' },
  { label: 'My Payslips', icon: FileText, href: '/employee-self-service/payslips' },
  { label: 'Leave Application', icon: CalendarCheck, href: '/employee-self-service/leave' },
  { label: 'Attendance', icon: Clock, href: '/employee-self-service/attendance' },
  { label: 'Claims', icon: Receipt, href: '/employee-self-service/claims' },
  { label: 'HR Policies', icon: BookOpen, href: '/hr-information' },
  { label: 'Staff Directory', icon: Users, href: '/people-communication' },
  { label: 'Learning & Development', icon: GraduationCap, href: '/learning-development' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopNavbar />

      {/* Hero Banner */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="/hero-hotel.jpg"
          alt="Ritz-Carlton luxury hotel lobby"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 flex flex-col items-center justify-center px-6">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white text-center mb-3">
            Welcome back, KSN
          </h1>
          <p className="text-[#B8975A] text-sm tracking-[0.3em] uppercase font-sans mb-8">
            The Ritz-Carlton &middot; Human Resources Portal
          </p>
          <button className="px-8 py-3 border border-white text-white text-sm font-sans font-medium tracking-wide hover:bg-white hover:text-[#1B2A4A] transition-colors">
            Search Forms & Templates
          </button>
        </div>
      </div>

      {/* Quick Access Section */}
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

      {/* Announcements + Calendar Section */}
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
