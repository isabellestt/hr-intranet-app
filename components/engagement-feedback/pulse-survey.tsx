'use client'

import { useState } from 'react'
import { Clock, CheckCircle2, ChevronRight, X, Star } from 'lucide-react'
import { pulseSurveys, type PulseSurvey, type PulseSurveyQuestion } from '@/lib/mock-data'

// ── Question Renderers ────────────────────────────────────────────────────────

function ScaleQuestion({
  question,
  value,
  onChange,
}: {
  question: PulseSurveyQuestion
  value: number | null
  onChange: (v: number) => void
}) {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-white mb-4 leading-relaxed">{question.question}</p>
      <div className="flex gap-1.5 flex-wrap">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className="w-9 h-9 font-sans text-sm font-semibold transition-all"
            style={{
              backgroundColor: value === n ? '#B8975A' : 'rgba(255,255,255,0.07)',
              color:           value === n ? '#fff'    : 'rgba(255,255,255,0.5)',
              border:          value === n ? '1px solid #B8975A' : '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-2">
        <span className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Not at all</span>
        <span className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Extremely</span>
      </div>
    </div>
  )
}

function RatingQuestion({
  question,
  value,
  onChange,
}: {
  question: PulseSurveyQuestion
  value: number | null
  onChange: (v: number) => void
}) {
  const [hovered, setHovered] = useState<number | null>(null)
  const display = hovered ?? value ?? 0

  const LABELS = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent']

  return (
    <div>
      <p className="font-sans text-sm font-medium text-white mb-4 leading-relaxed">{question.question}</p>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onChange(n)}
          >
            <Star
              className="w-8 h-8 transition-all"
              style={{
                color:  n <= display ? '#B8975A' : 'rgba(255,255,255,0.15)',
                fill:   n <= display ? '#B8975A' : 'transparent',
              }}
            />
          </button>
        ))}
        {display > 0 && (
          <span className="font-sans text-sm ml-2" style={{ color: '#B8975A' }}>
            {LABELS[display]}
          </span>
        )}
      </div>
    </div>
  )
}

function MultiChoiceQuestion({
  question,
  value,
  onChange,
}: {
  question: PulseSurveyQuestion
  value: string | null
  onChange: (v: string) => void
}) {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-white mb-4 leading-relaxed">{question.question}</p>
      <div className="flex flex-wrap gap-2">
        {question.options?.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className="px-4 py-2 font-sans text-sm transition-all"
            style={{
              backgroundColor: value === opt ? '#B8975A'                  : 'rgba(255,255,255,0.06)',
              color:           value === opt ? '#fff'                     : 'rgba(255,255,255,0.6)',
              border:          value === opt ? '1px solid #B8975A'        : '1px solid rgba(255,255,255,0.12)',
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

function TextQuestion({
  question,
  value,
  onChange,
}: {
  question: PulseSurveyQuestion
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-white mb-4 leading-relaxed">{question.question}</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your response here… (optional)"
        rows={3}
        className="w-full px-4 py-3 font-sans text-sm text-white placeholder-white/20 outline-none resize-none"
        style={{
          backgroundColor: 'rgba(255,255,255,0.06)',
          border:          '1px solid rgba(255,255,255,0.12)',
        }}
      />
    </div>
  )
}

// ── Survey Modal ──────────────────────────────────────────────────────────────

function SurveyModal({
  survey,
  onClose,
  onSubmit,
}: {
  survey: PulseSurvey
  onClose: () => void
  onSubmit: (id: number) => void
}) {
  const [step,    setStep]    = useState(0)   // 0 = intro, 1..n = question index, n+1 = done
  const [answers, setAnswers] = useState<Record<number, number | string | null>>(
    Object.fromEntries(survey.questions.map((q) => [q.id, q.type === 'text' ? '' : null]))
  )

  const questions  = survey.questions
  const totalSteps = questions.length
  const isIntro    = step === 0
  const isDone     = step > totalSteps
  const currentQ   = questions[step - 1]
  const progress   = totalSteps > 0 ? Math.round(((step - 1) / totalSteps) * 100) : 0

  const canAdvance = () => {
    if (isIntro) return true
    if (!currentQ) return true
    if (currentQ.type === 'text') return true   // text is optional
    return answers[currentQ.id] !== null
  }

  const handleNext = () => {
    if (step <= totalSteps) setStep((s) => s + 1)
    if (step === totalSteps) {
      // last question — trigger submit on the next render
      setTimeout(() => onSubmit(survey.id), 300)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="w-full max-w-lg" style={{ backgroundColor: '#0F1D38', borderTop: '3px solid #B8975A' }}>

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div>
            <p className="font-sans text-xs uppercase tracking-widest mb-1" style={{ color: '#B8975A' }}>
              {survey.displayDate} · ~{survey.estimatedMins} min
            </p>
            <h3 className="font-serif text-lg font-semibold text-white">{survey.title}</h3>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors mt-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar (shows during questions) */}
        {!isIntro && !isDone && totalSteps > 0 && (
          <div className="px-6 pt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Question {step} of {totalSteps}
              </span>
              <span className="font-sans text-xs" style={{ color: '#B8975A' }}>{progress}%</span>
            </div>
            <div className="w-full h-1 overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <div
                className="h-full transition-all duration-400"
                style={{ width: `${progress}%`, backgroundColor: '#B8975A' }}
              />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-6 min-h-[200px]">
          {isIntro && (
            <div className="space-y-4">
              <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {survey.description}
              </p>
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{ backgroundColor: 'rgba(184,151,90,0.08)', border: '1px solid rgba(184,151,90,0.2)' }}
              >
                <Clock className="w-4 h-4 flex-shrink-0" style={{ color: '#B8975A' }} />
                <p className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  This survey has {totalSteps} question{totalSteps !== 1 ? 's' : ''} and takes about {survey.estimatedMins} minutes.
                  Your responses are confidential.
                </p>
              </div>
            </div>
          )}

          {!isIntro && !isDone && currentQ && (
            <>
              {currentQ.type === 'scale' && (
                <ScaleQuestion
                  question={currentQ}
                  value={answers[currentQ.id] as number | null}
                  onChange={(v) => setAnswers((a) => ({ ...a, [currentQ.id]: v }))}
                />
              )}
              {currentQ.type === 'rating' && (
                <RatingQuestion
                  question={currentQ}
                  value={answers[currentQ.id] as number | null}
                  onChange={(v) => setAnswers((a) => ({ ...a, [currentQ.id]: v }))}
                />
              )}
              {currentQ.type === 'multiChoice' && (
                <MultiChoiceQuestion
                  question={currentQ}
                  value={answers[currentQ.id] as string | null}
                  onChange={(v) => setAnswers((a) => ({ ...a, [currentQ.id]: v }))}
                />
              )}
              {currentQ.type === 'text' && (
                <TextQuestion
                  question={currentQ}
                  value={(answers[currentQ.id] as string) ?? ''}
                  onChange={(v) => setAnswers((a) => ({ ...a, [currentQ.id]: v }))}
                />
              )}
            </>
          )}

          {isDone && (
            <div className="flex flex-col items-center py-6 text-center gap-3">
              <CheckCircle2 className="w-12 h-12" style={{ color: '#4CAF50' }} />
              <h4 className="font-serif text-lg font-semibold text-white">Thank You!</h4>
              <p className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Your responses have been recorded. We appreciate you taking the time to share your feedback.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <button
            onClick={onClose}
            className="font-sans text-xs transition-colors hover:text-white"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            {isDone ? 'Close' : 'Cancel'}
          </button>
          {!isDone && (
            <button
              onClick={handleNext}
              disabled={!canAdvance()}
              className="flex items-center gap-2 px-5 py-2 font-sans text-xs font-semibold transition-opacity"
              style={{
                backgroundColor: '#B8975A',
                color:   '#fff',
                opacity: canAdvance() ? 1 : 0.35,
                cursor:  canAdvance() ? 'pointer' : 'not-allowed',
              }}
            >
              {isIntro ? 'Begin Survey' : step === totalSteps ? 'Submit' : 'Next'}
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Survey Row ────────────────────────────────────────────────────────────────

function SurveyRow({ survey, onTake }: { survey: PulseSurvey; onTake: () => void }) {
  return (
    <div
      className="flex items-center gap-4 px-5 py-4 transition-all"
      style={{
        backgroundColor: 'rgba(255,255,255,0.06)',
        border:          '1px solid rgba(255,255,255,0.08)',
        borderLeft:      '3px solid #B8975A',
      }}
    >
      {/* Date */}
      <div className="flex-shrink-0 w-16 text-center">
        <p className="font-serif text-xl font-semibold text-white leading-tight">
          {survey.displayDate.split(' ')[0]}
        </p>
        <p className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {survey.displayDate.split(' ')[1]}
        </p>
      </div>

      <div className="w-px h-8 flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />

      <div className="flex-1 min-w-0">
        <p className="font-sans text-sm font-semibold text-white">{survey.title}</p>
        <p className="font-sans text-xs mt-0.5 flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
          <Clock className="w-3 h-3" />~{survey.estimatedMins} min · {survey.questions.length} question{survey.questions.length !== 1 ? 's' : ''}
        </p>
      </div>

      <button
        onClick={onTake}
        className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 font-sans text-xs font-semibold transition-opacity hover:opacity-80"
        style={{ backgroundColor: '#1B2A4A', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
      >
        Take survey <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  )
}

// ── Completed Row ─────────────────────────────────────────────────────────────

function CompletedRow({ survey }: { survey: PulseSurvey }) {
  return (
    <div
      className="flex items-center gap-4 px-5 py-4"
      style={{
        backgroundColor: 'rgba(255,255,255,0.03)',
        border:          '1px solid rgba(255,255,255,0.06)',
        borderLeft:      '3px solid #4CAF50',
      }}
    >
      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#4CAF50' }} />
      <div className="flex-1 min-w-0">
        <p className="font-sans text-sm font-semibold text-white">{survey.title}</p>
        <p className="font-sans text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Completed on {survey.completedOn}
        </p>
      </div>
      <span
        className="flex-shrink-0 font-sans text-xs uppercase tracking-wider px-2.5 py-0.5"
        style={{ backgroundColor: 'rgba(76,175,80,0.12)', color: '#4CAF50' }}
      >
        Done
      </span>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function PulseSurvey() {
  const [tab,           setTab]           = useState<'surveys' | 'completed'>('surveys')
  const [surveys,       setSurveys]       = useState(pulseSurveys)
  const [activeSurvey,  setActiveSurvey]  = useState<PulseSurvey | null>(null)

  const handleComplete = (id: number) => {
    setSurveys((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: 'completed' as const, completedOn: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) }
          : s
      )
    )
  }

  const upcoming   = surveys.filter((s) => s.status === 'upcoming')
  const completed  = surveys.filter((s) => s.status === 'completed')

  return (
    <div className="p-6 min-h-full" style={{ backgroundColor: '#1A2E55' }}>

      {/* Header */}
      <div className="flex items-end justify-between mb-6 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div>
          <h2 className="font-serif text-xl font-bold text-white">Pulse Survey</h2>
          <p className="font-sans text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Anonymous · Your responses help shape a better workplace
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-sans flex-shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }}>
          <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#4CAF50' }} />
          {completed.length} completed · {upcoming.length} remaining
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex mb-6 max-w-xs" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
        {(['surveys', 'completed'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-2.5 font-sans text-xs font-semibold uppercase tracking-widest transition-all"
            style={{
              backgroundColor: tab === t ? 'rgba(255,255,255,0.1)' : 'transparent',
              color:           tab === t ? '#fff'                   : 'rgba(255,255,255,0.4)',
              borderBottom:    tab === t ? '2px solid #B8975A'      : '2px solid transparent',
            }}
          >
            {t === 'surveys' ? 'Surveys' : 'Completed'}
          </button>
        ))}
      </div>

      {/* ── Upcoming tab ── */}
      {tab === 'surveys' && (
        <div className="max-w-2xl space-y-6">
          {upcoming.length === 0 ? (
            <div className="flex flex-col items-center py-16 gap-3">
              <CheckCircle2 className="w-10 h-10" style={{ color: '#4CAF50' }} />
              <p className="font-serif text-base font-semibold text-white">All caught up!</p>
              <p className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                You have completed all available surveys.
              </p>
            </div>
          ) : (
            <>
              <div>
                <p className="font-serif text-base font-semibold text-white mb-3">Upcoming</p>
                <div className="space-y-2">
                  {upcoming.map((s) => (
                    <SurveyRow key={s.id} survey={s} onTake={() => setActiveSurvey(s)} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Completed tab ── */}
      {tab === 'completed' && (
        <div className="max-w-2xl space-y-2">
          {completed.length === 0 ? (
            <p className="font-sans text-sm py-8 text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>
              No completed surveys yet
            </p>
          ) : (
            completed.map((s) => <CompletedRow key={s.id} survey={s} />)
          )}
        </div>
      )}

      {activeSurvey && (
        <SurveyModal
          survey={activeSurvey}
          onClose={() => setActiveSurvey(null)}
          onSubmit={(id) => {
            handleComplete(id)
            setTimeout(() => setActiveSurvey(null), 2000)
          }}
        />
      )}
    </div>
  )
}