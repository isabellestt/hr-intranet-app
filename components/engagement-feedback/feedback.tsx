'use client'

import { useState } from 'react'
import { CheckCircle2, ChevronDown, ChevronUp, Send, Eye, EyeOff, Clock, CircleCheck } from 'lucide-react'
import { myFeedbackHistory, type FeedbackCategory, type FeedbackItem } from '@/lib/mock-data'

// ── Config ────────────────────────────────────────────────────────────────────

const CATEGORIES: { value: FeedbackCategory; label: string; description: string; color: string }[] = [
  { value: 'Suggestion', label: 'Suggestion',  description: 'Propose an improvement or new idea',          color: '#B8975A'  },
  { value: 'Compliment', label: 'Compliment',  description: 'Recognise a colleague or team',               color: '#4CAF50'  },
  { value: 'Concern',    label: 'Concern',     description: 'Raise a workplace issue or concern',           color: '#E07070'  },
  { value: 'Other',      label: 'Other',       description: 'Anything else on your mind',                  color: '#B8D4E8'  },
]

const STATUS_CONFIG: Record<FeedbackItem['status'], { color: string; bg: string; icon: React.ElementType }> = {
  'Received':     { color: '#B8D4E8',  bg: 'rgba(184,212,232,0.12)', icon: Clock        },
  'Under Review': { color: '#B8975A',  bg: 'rgba(184,151,90,0.12)',  icon: Clock        },
  'Resolved':     { color: '#4CAF50',  bg: 'rgba(76,175,80,0.12)',   icon: CircleCheck  },
}

const CHARACTER_LIMIT = 500

// ── History Item ──────────────────────────────────────────────────────────────

function HistoryItem({ item }: { item: FeedbackItem }) {
  const [expanded, setExpanded] = useState(false)
  const sc  = STATUS_CONFIG[item.status]
  const cat = CATEGORIES.find((c) => c.value === item.category)
  const StatusIcon = sc.icon

  return (
    <div
      style={{
        backgroundColor: 'rgba(255,255,255,0.04)',
        border:          '1px solid rgba(255,255,255,0.08)',
        borderLeft:      `3px solid ${cat?.color ?? '#B8975A'}`,
      }}
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-4 px-5 py-3.5 text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="font-sans text-xs uppercase tracking-wider px-2 py-0.5"
              style={{ backgroundColor: sc.bg, color: sc.color }}
            >
              {item.status}
            </span>
            <span
              className="font-sans text-xs px-2 py-0.5"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}
            >
              {item.category}
            </span>
          </div>
          <p className="font-sans text-sm text-white mt-1.5 truncate pr-4">{item.message}</p>
          <p className="font-sans text-xs mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Submitted {item.submittedOn} · {item.anonymous ? 'Anonymous' : 'Named submission'}
          </p>
        </div>
        {expanded
          ? <ChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }} />
          : <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }} />
        }
      </button>

      {expanded && (
        <div className="px-5 pb-4">
          <div className="h-px mb-3" style={{ backgroundColor: 'rgba(255,255,255,0.07)' }} />
          <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {item.message}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <StatusIcon className="w-3.5 h-3.5" style={{ color: sc.color }} />
            <span className="font-sans text-xs" style={{ color: sc.color }}>{item.status}</span>
            {item.status === 'Under Review' && (
              <span className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                — HR will follow up if needed
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Feedback() {
  const [activeTab,  setActiveTab]  = useState<'submit' | 'history'>('submit')
  const [category,   setCategory]   = useState<FeedbackCategory | null>(null)
  const [message,    setMessage]    = useState('')
  const [anonymous,  setAnonymous]  = useState(false)
  const [errors,     setErrors]     = useState<{ category?: boolean; message?: boolean }>({})
  const [submitted,  setSubmitted]  = useState(false)
  const [history,    setHistory]    = useState<FeedbackItem[]>(myFeedbackHistory)

  const charsLeft = CHARACTER_LIMIT - message.length

  const validate = () => {
    const e: { category?: boolean; message?: boolean } = {}
    if (!category)        e.category = true
    if (!message.trim())  e.message  = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return

    const newItem: FeedbackItem = {
      id:          Date.now(),
      category:    category!,
      message:     message.trim(),
      anonymous,
      submittedOn: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      status:      'Received',
    }
    setHistory((prev) => [newItem, ...prev])
    setSubmitted(true)
    setCategory(null)
    setMessage('')
    setAnonymous(false)
    setErrors({})
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="p-6 min-h-full" style={{ backgroundColor: '#1A2E55' }}>

      {/* Header */}
      <div className="flex items-end justify-between mb-6 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div>
          <h2 className="font-serif text-xl font-bold text-white">Feedback & Suggestions</h2>
          <p className="font-sans text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Your voice matters — share anonymously or with your name
          </p>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex mb-6 max-w-xs" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
        {(['submit', 'history'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className="flex-1 py-2.5 font-sans text-xs font-semibold uppercase tracking-widest transition-all"
            style={{
              backgroundColor: activeTab === t ? 'rgba(255,255,255,0.1)' : 'transparent',
              color:           activeTab === t ? '#fff'                   : 'rgba(255,255,255,0.4)',
              borderBottom:    activeTab === t ? '2px solid #B8975A'      : '2px solid transparent',
            }}
          >
            {t === 'submit' ? 'Submit' : `My Submissions${history.length > 0 ? ` (${history.length})` : ''}`}
          </button>
        ))}
      </div>

      {/* ── Submit tab ── */}
      {activeTab === 'submit' && (
        <div className="max-w-xl space-y-6">

          {/* Success banner */}
          {submitted && (
            <div
              className="flex items-center gap-3 px-5 py-3"
              style={{ backgroundColor: 'rgba(76,175,80,0.1)', border: '1px solid rgba(76,175,80,0.3)', borderLeft: '3px solid #4CAF50' }}
            >
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#4CAF50' }} />
              <p className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Thank you — your feedback has been received by HR.
              </p>
            </div>
          )}

          {/* Step 1: Category */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: errors.category ? '#E07070' : 'rgba(255,255,255,0.4)' }}>
              Select a category
              {errors.category && <span className="ml-2 normal-case tracking-normal">Required</span>}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map(({ value, label, description, color }) => {
                const active = category === value
                return (
                  <button
                    key={value}
                    onClick={() => {
                      setCategory(value)
                      setErrors((e) => ({ ...e, category: false }))
                    }}
                    className="text-left px-4 py-3.5 transition-all"
                    style={{
                      backgroundColor: active ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
                      border:          active ? `1px solid ${color}` : `1px solid rgba(255,255,255,0.08)`,
                      borderLeft:      active ? `3px solid ${color}` : '3px solid transparent',
                    }}
                  >
                    <p className="font-sans text-sm font-semibold" style={{ color: active ? color : 'rgba(255,255,255,0.7)' }}>
                      {label}
                    </p>
                    <p className="font-sans text-xs mt-0.5 leading-snug" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {description}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 2: Message */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p
                className="font-sans text-xs uppercase tracking-widest"
                style={{ color: errors.message ? '#E07070' : 'rgba(255,255,255,0.4)' }}
              >
                Your feedback
                {errors.message && <span className="ml-2 normal-case tracking-normal">Required</span>}
              </p>
              <span
                className="font-sans text-xs"
                style={{ color: charsLeft < 50 ? '#E07070' : 'rgba(255,255,255,0.3)' }}
              >
                {charsLeft} left
              </span>
            </div>
            <textarea
              value={message}
              onChange={(e) => {
                if (e.target.value.length <= CHARACTER_LIMIT) {
                  setMessage(e.target.value)
                  if (errors.message) setErrors((err) => ({ ...err, message: false }))
                }
              }}
              placeholder="Please type your feedback here…"
              rows={5}
              className="w-full px-4 py-3 font-sans text-sm text-white placeholder-white/20 outline-none resize-none focus:ring-1 focus:ring-[#B8975A]"
              style={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                border:          errors.message ? '1px solid rgba(224,112,112,0.7)' : '1px solid rgba(255,255,255,0.12)',
              }}
            />
          </div>

          {/* Step 3: Anonymous toggle */}
          <div
            className="flex items-center justify-between px-4 py-3.5"
            style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center gap-3">
              {anonymous
                ? <EyeOff className="w-4 h-4 flex-shrink-0" style={{ color: '#B8975A' }} />
                : <Eye    className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />
              }
              <div>
                <p className="font-sans text-sm font-semibold" style={{ color: anonymous ? '#B8975A' : 'rgba(255,255,255,0.7)' }}>
                  {anonymous ? 'Submitting anonymously' : 'Submit with your name'}
                </p>
                <p className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {anonymous
                    ? 'HR will not know who submitted this'
                    : 'HR may follow up with you directly'}
                </p>
              </div>
            </div>
            {/* Toggle switch */}
            <button
              onClick={() => setAnonymous((v) => !v)}
              className="relative w-10 h-5 flex-shrink-0 transition-colors"
              style={{ backgroundColor: anonymous ? '#B8975A' : 'rgba(255,255,255,0.15)', borderRadius: 9999 }}
            >
              <span
                className="absolute top-0.5 w-4 h-4 transition-transform"
                style={{
                  backgroundColor: '#fff',
                  borderRadius:    9999,
                  transform:       anonymous ? 'translateX(22px)' : 'translateX(2px)',
                }}
              />
            </button>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => { setCategory(null); setMessage(''); setErrors({}); setAnonymous(false) }}
              className="font-sans text-xs transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Clear
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2.5 font-sans text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#B8975A', color: '#fff' }}
            >
              <Send className="w-3.5 h-3.5" /> Submit Feedback
            </button>
          </div>
        </div>
      )}

      {/* ── History tab ── */}
      {activeTab === 'history' && (
        <div className="max-w-xl space-y-2">
          {history.length === 0 ? (
            <p className="font-sans text-sm py-8 text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>
              No submissions yet
            </p>
          ) : (
            <>
              <p className="font-sans text-xs mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Showing {history.length} submission{history.length !== 1 ? 's' : ''} · Click to expand
              </p>
              {history.map((item) => <HistoryItem key={item.id} item={item} />)}
            </>
          )}
        </div>
      )}
    </div>
  )
}