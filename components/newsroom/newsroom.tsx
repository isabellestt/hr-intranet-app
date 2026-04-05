'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronRight, Clock, Bookmark, TrendingUp } from 'lucide-react'
import TopNavbar from '@/components/top-navbar'
import Footer from '@/components/footer'

// ── Hard-coded data ────────────────────────────────────────────────────────────

const TOP_NEWS_HERO = {
  tag:     'Leadership',
  date:    'Today, 9:00 AM',
  title:   'The Ritz-Carlton Recognised as Top Employer in Asia-Pacific for the Third Consecutive Year',
  excerpt: 'The award, presented at the 2026 Asia Hospitality Excellence Summit, recognises our ongoing commitment to employee development, wellbeing, and an exceptional workplace culture.',
  image:   '/news/hero-award.jpg',
  imageFallbackColor: '#1B2A4A',
}

const TOP_NEWS_SIDE = [
  {
    date:    'Today, 11:30 AM',
    tag:     'Operations',
    title:   'New Guest Services Protocol Launches Across All Singapore Properties',
    excerpt: 'A refreshed Gold Standards framework for VIP guest interactions takes effect from 1 May 2026, following a six-month pilot across three properties.',
    image:   '/news/guest-services.jpg',
    color:   '#C8A96E',
  },
  {
    date:    'Yesterday, 3:15 PM',
    tag:     'Sustainability',
    title:   'Our Zero-Waste Kitchen Initiative Cuts Food Waste by 38% in Q1',
    excerpt: "The F&B team's composting and portion-optimisation programme has exceeded its first-quarter target ahead of schedule.",
    image:   '/news/sustainability.jpg',
    color:   '#2D6A4F',
  },
]

const LATEST_NEWS_CARDS = [
  { date: '3 days ago', tag: 'HR Update',      title: 'Mid-Year Performance Review Cycle Opens 1 June',         image: '/news/perf-review.jpg',   color: '#1B2A4A' },
  { date: '5 days ago', tag: 'Learning',        title: 'New E-Learning Library: 200+ Hospitality Courses Added', image: '/news/elearning.jpg',     color: '#8C4A1A' },
  { date: '1 week ago', tag: 'Benefits',        title: 'Enhanced Medical Benefits Take Effect This Quarter',     image: '/news/benefits.jpg',      color: '#5A2D8C' },
  { date: '2 weeks ago', tag: 'Wellbeing',      title: 'Staff Wellness Week Returns — Register by 20 April',    image: '/news/wellness.jpg',      color: '#1A6B5A' },
]

const ANNOUNCEMENT_BANNER = {
  label:   'COMPANY INITIATIVE',
  title:   'The Ritz-Carlton Ladies & Gentlemen Scholarship 2026',
  cta:     'LEARN MORE',
  color:   '#B8975A',
}

const TRENDING_TOPICS = [
  'Performance Reviews', 'Q2 Benefits Enrolment', 'Sustainability',
  'Learning & Development', 'Gold Standards', 'Wellness Week',
  'Internal Mobility', 'Digital Transformation',
]

const STAFF_SPOTLIGHTS = [
  { name: 'Sarah Tan',       role: 'Promoted to F&B Director, Singapore',             initials: 'ST', color: '#1E4D8C' },
  { name: 'Marcus Wong',     role: 'Appointed Head of Guest Relations, Asia-Pacific',  initials: 'MW', color: '#2D6A2D' },
  { name: 'Priya Nair',      role: 'Named Employee of the Quarter, Q1 2026',           initials: 'PN', color: '#8C4A1A' },
  { name: 'James Lim',       role: 'Promoted to Executive Chef, Marina Bay',           initials: 'JL', color: '#5A2D8C' },
  { name: 'Chloe Hartmann',  role: 'Appointed Director of HR, Singapore',              initials: 'CH', color: '#1A6B5A' },
  { name: 'David Ng',        role: 'Promoted to Senior Sales Manager, APAC',           initials: 'DN', color: '#8C2D2D' },
  { name: 'Aisha Rahman',    role: 'Recognised for Excellence in Guest Services',      initials: 'AR', color: '#B8975A' },
  { name: 'Kevin Ong',       role: 'Appointed Head of Digital Transformation',         initials: 'KO', color: '#1B2A4A' },
]

const JOB_LISTINGS = [
  { title: 'Guest Relations Officer',    dept: 'Front Office', location: 'Singapore',  posted: '2 days ago'  },
  { title: 'Junior Sous Chef',           dept: 'Kitchen',      location: 'Singapore',  posted: '5 days ago'  },
  { title: 'Sales Executive',            dept: 'Sales',        location: 'Singapore',  posted: '1 week ago'  },
  { title: 'Housekeeping Supervisor',    dept: 'Housekeeping', location: 'Singapore',  posted: '1 week ago'  },
  { title: 'HR Executive',            dept: 'HR',      location: 'Singapore',  posted: '2 weeks ago' },
]

const HR_TIPS = [
  'Use the Facilities Booking module to reserve meeting rooms up to 2 weeks in advance.',
  'Your payslip is available by the 25th of each month under Employee Self-Service.',
  'Submit leave applications at least 3 working days in advance for non-urgent requests.',
]

// ── Sub-components ─────────────────────────────────────────────────────────────

function SectionHeader({ title, cta = 'View All' }: { title: string; cta?: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <h2 className="font-serif text-xl font-semibold text-[#1B2A4A]">{title}</h2>
        <div className="w-8 h-px bg-[#B8975A]" />
      </div>
      <button className="flex items-center gap-1 font-sans text-xs text-[#B8975A] hover:underline font-medium">
        {cta} <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  )
}

function Tag({ label, color = '#1B2A4A' }: { label: string; color?: string }) {
  return (
    <span
      className="inline-block font-sans text-xs font-semibold px-2 py-0.5 uppercase tracking-wider"
      style={{ backgroundColor: color + '18', color }}
    >
      {label}
    </span>
  )
}

// Coloured placeholder block for images (since /news/*.jpg won't exist)
function ImgPlaceholder({ color, className = '' }: { color: string; className?: string }) {
  return (
    <div
      className={`w-full h-full ${className}`}
      style={{
        background: `linear-gradient(135deg, ${color}cc 0%, ${color}66 100%)`,
      }}
    />
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function NewsRoom() {
  const [tipIndex, setTipIndex] = useState(0)

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F4F0]">
      <TopNavbar />

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-10 space-y-10">

        {/* ── Top News ── */}
        <section>
          <SectionHeader title="Top News" />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">

            {/* Hero article */}
            <div className="relative overflow-hidden group cursor-pointer" style={{ minHeight: 340 }}>
              <ImgPlaceholder color={TOP_NEWS_HERO.imageFallbackColor} className="absolute inset-0" />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Tag label={TOP_NEWS_HERO.tag} color="#B8975A" />
                  <span className="font-sans text-xs text-white/60 flex items-center gap-1">
                    <Clock className="w-3 h-3" />{TOP_NEWS_HERO.date}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-white leading-snug mb-2">
                  {TOP_NEWS_HERO.title}
                </h3>
                <p className="font-sans text-xs text-white/70 leading-relaxed line-clamp-2">
                  {TOP_NEWS_HERO.excerpt}
                </p>
              </div>
            </div>

            {/* Side articles */}
            <div className="flex flex-col gap-4">
              {TOP_NEWS_SIDE.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 bg-white border border-[#E5E5E5] p-3 cursor-pointer hover:border-[#B8975A] transition-colors group"
                >
                  <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                    <ImgPlaceholder color={item.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Tag label={item.tag} color={item.color} />
                      <span className="font-sans text-xs text-[#999] flex items-center gap-1">
                        <Clock className="w-3 h-3" />{item.date}
                      </span>
                    </div>
                    <h4 className="font-serif text-sm font-semibold text-[#1B2A4A] leading-snug group-hover:text-[#B8975A] transition-colors">
                      {item.title}
                    </h4>
                    <p className="font-sans text-xs text-[#666] mt-1 line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                </div>
              ))}

              {/* View all */}
              <button className="mt-auto self-end flex items-center gap-1 font-sans text-xs text-[#B8975A] font-medium hover:underline">
                View All News <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </section>

        {/* ── Campaign Banner ── */}
        <section
          className="relative overflow-hidden flex items-center justify-center py-12 px-6 cursor-pointer"
          style={{ minHeight: 140, backgroundColor: ANNOUNCEMENT_BANNER.color }}
        >
          {/* Decorative background texture */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 1px, transparent 1px, transparent 12px)',
            }}
          />
          <div className="relative text-center">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-white/80 mb-2">
              {ANNOUNCEMENT_BANNER.label}
            </p>
            <h3 className="font-serif text-2xl font-semibold text-white mb-4">
              {ANNOUNCEMENT_BANNER.title}
            </h3>
            <button className="font-sans text-sm font-semibold tracking-widest text-white border border-white px-8 py-2.5 hover:bg-white hover:text-[#B8975A] transition-colors uppercase">
              {ANNOUNCEMENT_BANNER.cta}
            </button>
          </div>
        </section>

        {/* ── Latest News Cards ── */}
        <section>
          <SectionHeader title="Latest HR Updates" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {LATEST_NEWS_CARDS.map((item, i) => (
              <div key={i} className="bg-white border border-[#E5E5E5] overflow-hidden cursor-pointer hover:border-[#B8975A] hover:shadow-md transition-all group">
                <div className="h-32 overflow-hidden">
                  <ImgPlaceholder color={item.color} />
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Tag label={item.tag} color={item.color} />
                    <span className="font-sans text-xs text-[#999]">{item.date}</span>
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-[#1B2A4A] leading-snug group-hover:text-[#B8975A] transition-colors line-clamp-3">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 font-sans text-xs text-[#B8975A] font-medium hover:underline flex items-center gap-1">
            Learn more about personalising your news <ChevronRight className="w-3 h-3" />
          </button>
        </section>

        {/* ── Three-column section ── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* HR Tips */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-serif text-xl font-semibold text-[#1B2A4A]">HR Tips</h2>
              <div className="w-8 h-px bg-[#B8975A]" />
            </div>
            <div
              className="relative overflow-hidden p-5 cursor-pointer"
              style={{ backgroundColor: '#1B2A4A', minHeight: 160 }}
            >
              {/* Decorative texture */}
              <div className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'repeating-linear-gradient(-45deg, #fff 0px, #fff 1px, transparent 1px, transparent 10px)',
                }}
              />
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#B8975A] mb-2 relative">
                Tip {tipIndex + 1} of {HR_TIPS.length}
              </p>
              <p className="font-serif text-base font-semibold text-white leading-snug mb-4 relative">
                {HR_TIPS[tipIndex]}
              </p>
              {/* Dot navigation */}
              <div className="flex gap-1.5 relative">
                {HR_TIPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTipIndex(i)}
                    className="w-2 h-2 rounded-full transition-colors"
                    style={{ backgroundColor: i === tipIndex ? '#B8975A' : 'rgba(255,255,255,0.25)' }}
                  />
                ))}
              </div>
            </div>

            {/* Job listings below tips */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif text-base font-semibold text-[#1B2A4A]">Open Positions</h3>
                <Link href="/hr-processes/internal-job-postings" className="font-sans text-xs text-[#B8975A] hover:underline flex items-center gap-0.5">
                  View All <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-2">
                {JOB_LISTINGS.map((job, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between gap-2 py-2.5 border-b border-[#E5E5E5] last:border-0 cursor-pointer group"
                  >
                    <div>
                      <p className="font-sans text-xs font-semibold text-[#1B2A4A] group-hover:text-[#B8975A] transition-colors">{job.title}</p>
                      <p className="font-sans text-xs text-[#888] mt-0.5">{job.dept} · {job.location}</p>
                    </div>
                    <span className="font-sans text-xs text-[#AAA] flex-shrink-0 mt-0.5">{job.posted}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trending Topics */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-serif text-xl font-semibold text-[#1B2A4A]">Trending Topics</h2>
              <div className="w-8 h-px bg-[#B8975A]" />
            </div>
            <div className="bg-white border border-[#E5E5E5] p-5">
              <div className="flex flex-wrap gap-2 mb-6">
                {TRENDING_TOPICS.map((topic, i) => (
                  <button
                    key={i}
                    className="font-sans text-xs px-3 py-1.5 border transition-all hover:border-[#B8975A] hover:text-[#B8975A]"
                    style={{ borderColor: '#DDD', color: '#555' }}
                  >
                    {topic}
                  </button>
                ))}
              </div>

              {/* Quick stats */}
              <div className="border-t border-[#E5E5E5] pt-4">
                <p className="font-sans text-xs uppercase tracking-widest text-[#999] mb-3 flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3" /> This week at a glance
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Leave Applications',  value: '24' },
                    { label: 'Claims Submitted',     value: '17' },
                    { label: 'Training Completions', value: '38' },
                    { label: 'Open Job Postings',    value: '5'  },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-[#F5F4F0] p-3">
                      <p className="font-sans text-xs text-[#888] leading-tight">{label}</p>
                      <p className="font-serif text-2xl font-semibold text-[#1B2A4A] mt-1">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Staff Spotlights */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="font-serif text-xl font-semibold text-[#1B2A4A]">Staff Spotlights</h2>
                <div className="w-8 h-px bg-[#B8975A]" />
              </div>
              <button className="font-sans text-xs text-[#B8975A] hover:underline flex items-center gap-0.5">
                View All <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="bg-white border border-[#E5E5E5]">
              {STAFF_SPOTLIGHTS.map((person, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 px-4 py-3 border-b border-[#F0EFEC] last:border-0 cursor-pointer hover:bg-[#FAFAF8] group transition-colors"
                >
                  {/* Avatar */}
                  <div
                    className="w-9 h-9 flex items-center justify-center font-sans text-xs font-semibold text-white flex-shrink-0"
                    style={{ backgroundColor: person.color }}
                  >
                    {person.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-xs font-semibold text-[#1B2A4A] group-hover:text-[#B8975A] transition-colors">{person.name}</p>
                    <p className="font-sans text-xs text-[#888] mt-0.5 leading-snug">{person.role}</p>
                  </div>
                  <Bookmark className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#CCC] group-hover:text-[#B8975A] transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}