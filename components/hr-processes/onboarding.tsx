'use client'

import { useState } from 'react'
import {
  Clock, CheckCircle2, AlertCircle, ChevronRight,
  Hotel, BookOpen, CalendarDays, FileText, Wallet, GraduationCap, X,
} from 'lucide-react'
import { onboardingSurveys, onboardingDeckSlides, type OnboardingSurvey, type SurveyStatus } from '@/lib/mock-data'

// ── Icon map for deck slides ──────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  Hotel, BookOpen, CalendarDays, FileText, Wallet, GraduationCap,
}

// ── Status config ─────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<SurveyStatus, { label: string; color: string; icon: React.ElementType }> = {
  pending:   { label: 'Pending',   color: '#B8975A',        icon: Clock          },
  completed: { label: 'Completed', color: '#4CAF50',        icon: CheckCircle2   },
  overdue:   { label: 'Overdue',   color: '#E07070',        icon: AlertCircle    },
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function groupSurveysByTimeline(surveys: OnboardingSurvey[]) {
  const today     = new Date()
  const nextWeek  = new Date(today); nextWeek.setDate(today.getDate() + 14)

  const groups: Record<'Next Two Weeks' | 'Upcoming' | 'Completed', OnboardingSurvey[]> = {
    'Next Two Weeks': [],
    'Upcoming':       [],
    'Completed':      [],
  }

  surveys.forEach((s) => {
    if (s.status === 'completed') {
      groups['Completed'].push(s)
    } else {
      const d = new Date(s.date)
      if (d <= nextWeek) groups['Next Two Weeks'].push(s)
      else               groups['Upcoming'].push(s)
    }
  })

  return groups
}

// ── Survey Modal ──────────────────────────────────────────────────────────────

function SurveyModal({
  survey,
  onClose,
  onSubmit,
}: {
  survey: OnboardingSurvey
  onClose: () => void
  onSubmit: (id: number) => void
}) {
  const [rating,   setRating]   = useState<number | null>(null)
  const [comments, setComments] = useState('')
  const [agreed,   setAgreed]   = useState(false)

  const isCompliance = survey.title.toLowerCase().includes('compliance')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="w-full max-w-lg" style={{ backgroundColor: '#0F1D38', borderTop: '3px solid #B8975A' }}>

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div>
            <p className="font-sans text-xs uppercase tracking-widest mb-1" style={{ color: '#B8975A' }}>{survey.displayDate}</p>
            <h3 className="font-serif text-lg font-semibold text-white">{survey.title}</h3>
            <p className="font-sans text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Estimated time: {survey.estimatedMins} min
            </p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors mt-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {isCompliance ? (
            <>
              <div className="space-y-3 font-sans text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <p>By completing this form, you confirm that you:</p>
                <ul className="space-y-2 pl-4">
                  {[
                    'Have read and understood the Employee Code of Conduct',
                    'Agree to comply with all hotel policies and procedures',
                    'Declare no conflicts of interest with your current role',
                    'Understand data privacy obligations under PDPA',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span style={{ color: '#B8975A' }}>—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[#B8975A]"
                />
                <span className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  I have read and agree to all of the above declarations.
                </span>
              </label>
            </>
          ) : (
            <>
              <div>
                <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  How would you rate your onboarding experience so far?
                </p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setRating(n)}
                      className="w-10 h-10 font-serif text-sm font-semibold transition-all"
                      style={{
                        backgroundColor: rating === n ? '#B8975A' : 'rgba(255,255,255,0.06)',
                        color:           rating === n ? '#fff'    : 'rgba(255,255,255,0.5)',
                        border:          rating === n ? '1px solid #B8975A' : '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Poor</span>
                  <span className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Excellent</span>
                </div>
              </div>
              <div>
                <label className="block font-sans text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Additional Comments
                </label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Share any feedback or suggestions…"
                  rows={3}
                  className="w-full px-3 py-2 font-sans text-sm text-white placeholder-white/20 outline-none resize-none"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={onClose}
            className="px-4 py-2 font-sans text-xs transition-colors hover:text-white"
            style={{ color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            Cancel
          </button>
          <button
            onClick={() => { onSubmit(survey.id); onClose() }}
            disabled={isCompliance ? !agreed : rating === null}
            className="px-5 py-2 font-sans text-xs font-semibold transition-opacity"
            style={{
              backgroundColor: '#B8975A',
              color:            '#fff',
              opacity:          (isCompliance ? !agreed : rating === null) ? 0.4 : 1,
              cursor:           (isCompliance ? !agreed : rating === null) ? 'not-allowed' : 'pointer',
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Survey Row ────────────────────────────────────────────────────────────────

function SurveyRow({ survey, onTake }: { survey: OnboardingSurvey; onTake: () => void }) {
  const sc = STATUS_CONFIG[survey.status]
  const StatusIcon = sc.icon

  return (
    <div
      className="flex items-center gap-4 px-5 py-4 transition-all"
      style={{
        backgroundColor: 'rgba(255,255,255,0.06)',
        border:          '1px solid rgba(255,255,255,0.08)',
        borderLeft:      `3px solid ${sc.color}`,
      }}
    >
      {/* Date */}
      <div className="flex-shrink-0 w-16 text-center">
        <p className="font-serif text-base font-semibold text-white leading-tight">
          {survey.displayDate.split(' ')[0]}
        </p>
        <p className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {survey.displayDate.split(' ')[1]}
        </p>
      </div>

      {/* Divider */}
      <div className="w-px h-8 flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />

      {/* Title & time */}
      <div className="flex-1 min-w-0">
        <p className="font-sans text-sm font-semibold text-white truncate">{survey.title}</p>
        <p className="font-sans text-xs mt-0.5 flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
          <Clock className="w-3 h-3" /> ~{survey.estimatedMins} min
        </p>
      </div>

      {/* Status badge */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <StatusIcon className="w-3.5 h-3.5" style={{ color: sc.color }} />
        <span className="font-sans text-xs uppercase tracking-wider" style={{ color: sc.color }}>{sc.label}</span>
      </div>

      {/* CTA */}
      {survey.status !== 'completed' && (
        <button
          onClick={onTake}
          className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 font-sans text-xs font-semibold transition-opacity hover:opacity-80"
          style={{ backgroundColor: '#1B2A4A', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          Take survey <ChevronRight className="w-3 h-3" />
        </button>
      )}
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Onboarding() {
  const [activeTab,   setActiveTab]   = useState<'surveys' | 'deck'>('surveys')
  const [surveys,     setSurveys]     = useState(onboardingSurveys)
  const [activeSurvey, setActiveSurvey] = useState<OnboardingSurvey | null>(null)
  const [activeDeck,  setActiveDeck]  = useState<number | null>(null)

  const handleComplete = (id: number) =>
    setSurveys((prev) => prev.map((s) => s.id === id ? { ...s, status: 'completed' as const } : s))

  const groups  = groupSurveysByTimeline(surveys)
  const GROUPS  = ['Next Two Weeks', 'Upcoming', 'Completed'] as const
  const totalCompleted = surveys.filter((s) => s.status === 'completed').length
  const progressPct    = Math.round((totalCompleted / surveys.length) * 100)

  return (
    <div className="p-6 min-h-full" style={{ backgroundColor: '#1A2E55' }}>

      {/* Header */}
      <div className="flex items-end justify-between mb-6 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div>
          <h2 className="font-serif text-xl font-bold text-white">Onboarding</h2>
          <p className="font-sans text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Welcome to The Ritz-Carlton · Complete your onboarding tasks below
          </p>
        </div>

        {/* Progress pill */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {totalCompleted}/{surveys.length} completed
          </span>
          <div className="w-24 h-1.5 overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <div className="h-full transition-all duration-500" style={{ width: `${progressPct}%`, backgroundColor: '#B8975A' }} />
          </div>
          <span className="font-sans text-xs font-semibold" style={{ color: '#B8975A' }}>{progressPct}%</span>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex mb-6" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
        {(['surveys', 'deck'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-2.5 font-sans text-xs font-semibold uppercase tracking-widest transition-all"
            style={{
              backgroundColor: activeTab === tab ? 'rgba(255,255,255,0.1)' : 'transparent',
              color:           activeTab === tab ? '#fff'                   : 'rgba(255,255,255,0.4)',
              borderBottom:    activeTab === tab ? '2px solid #B8975A'      : '2px solid transparent',
            }}
          >
            {tab === 'surveys' ? 'Surveys' : 'Onboarding Deck'}
          </button>
        ))}
      </div>

      {/* ── Surveys tab ── */}
      {activeTab === 'surveys' && (
        <div className="space-y-6 max-w-2xl">
          {GROUPS.map((group) => {
            const items = groups[group]
            if (items.length === 0) return null
            return (
              <div key={group}>
                <p className="font-serif text-base font-semibold text-white mb-3">{group}</p>
                <div className="space-y-2">
                  {items.map((s) => (
                    <SurveyRow
                      key={s.id}
                      survey={s}
                      onTake={() => setActiveSurvey(s)}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Deck tab ── */}
      {activeTab === 'deck' && (
        <div className="max-w-2xl">
          <p className="font-sans text-xs mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Work through each module to familiarise yourself with The Ritz-Carlton.
          </p>
          <div className="space-y-2">
            {onboardingDeckSlides.map((slide, idx) => {
              const Icon     = ICON_MAP[slide.icon] ?? BookOpen
              const isOpen   = activeDeck === slide.id

              return (
                <div
                  key={slide.id}
                  style={{
                    backgroundColor: isOpen ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                    border:          '1px solid rgba(255,255,255,0.08)',
                    borderLeft:      isOpen ? '3px solid #B8975A' : '3px solid transparent',
                  }}
                >
                  <button
                    onClick={() => setActiveDeck(isOpen ? null : slide.id)}
                    className="w-full flex items-center gap-4 px-5 py-4 text-left"
                  >
                    <span
                      className="flex-shrink-0 w-7 h-7 flex items-center justify-center font-serif text-xs font-semibold"
                      style={{ backgroundColor: isOpen ? '#B8975A' : 'rgba(255,255,255,0.08)', color: isOpen ? '#fff' : 'rgba(255,255,255,0.4)' }}
                    >
                      {idx + 1}
                    </span>
                    <Icon className="w-4 h-4 flex-shrink-0" style={{ color: isOpen ? '#B8975A' : 'rgba(255,255,255,0.4)' }} />
                    <span className="flex-1 font-sans text-sm font-semibold text-white">{slide.title}</span>
                    <ChevronRight
                      className="w-4 h-4 flex-shrink-0 transition-transform"
                      style={{ color: 'rgba(255,255,255,0.3)', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5">
                      <div className="h-px mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
                      <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        {slide.description}
                      </p>
                      <button
                        className="mt-4 flex items-center gap-2 font-sans text-xs font-semibold transition-opacity hover:opacity-80"
                        style={{ color: '#B8975A' }}
                      >
                        View full module <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Survey modal */}
      {activeSurvey && (
        <SurveyModal
          survey={activeSurvey}
          onClose={() => setActiveSurvey(null)}
          onSubmit={handleComplete}
        />
      )}
    </div>
  )
}