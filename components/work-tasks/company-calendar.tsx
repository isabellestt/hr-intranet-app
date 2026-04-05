'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Clock, CalendarDays } from 'lucide-react'
import { calendarEvents, type CalendarEvent, type EventCategory } from '@/lib/mock-data'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const CATEGORY_STYLES: Record<EventCategory, { bg: string; text: string; dot: string; label: string }> = {
  Holiday:  { bg: '#FEF3C7', text: '#92400E', dot: '#F59E0B', label: 'Public Holiday' },
  Company:  { bg: '#EFF6FF', text: '#1E40AF', dot: '#3B82F6', label: 'Company'        },
  Training: { bg: '#F0FDF4', text: '#166534', dot: '#22C55E', label: 'Training'       },
  Social:   { bg: '#FDF4FF', text: '#6B21A8', dot: '#A855F7', label: 'Social'         },
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDay(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}
function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

// Group events by date key for O(1) lookup
function groupByDate(events: CalendarEvent[]): Record<string, CalendarEvent[]> {
  return events.reduce<Record<string, CalendarEvent[]>>((acc, e) => {
    acc[e.date] = acc[e.date] ? [...acc[e.date], e] : [e]
    return acc
  }, {})
}

function EventBadge({ event }: { event: CalendarEvent }) {
  const s = CATEGORY_STYLES[event.category]
  return (
    <span
      className="inline-block font-sans text-xs font-semibold px-2 py-0.5 rounded-sm"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      {event.category}
    </span>
  )
}

export default function CompanyCalendar() {
  const today = new Date()
  const [view,     setView]     = useState({ year: today.getFullYear(), month: today.getMonth() })
  const [selected, setSelected] = useState<string | null>(toDateKey(today.getFullYear(), today.getMonth(), today.getDate()))
  const [filters,  setFilters]  = useState<Set<EventCategory>>(new Set())

  const { year, month } = view
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay    = getFirstDay(year, month)
  const eventMap    = useMemo(() => groupByDate(calendarEvents), [])

  const prev = () => setView(v => v.month === 0 ? { year: v.year - 1, month: 11 } : { year: v.year, month: v.month - 1 })
  const next = () => setView(v => v.month === 11 ? { year: v.year + 1, month: 0 } : { year: v.year, month: v.month + 1 })

  const toggleFilter = (cat: EventCategory) => {
    setFilters(prev => {
      const next = new Set(prev)
      next.has(cat) ? next.delete(cat) : next.add(cat)
      return next
    })
  }

  // Events for the selected day
  const selectedEvents = useMemo(() => {
    if (!selected) return []
    const evts = eventMap[selected] ?? []
    return filters.size === 0 ? evts : evts.filter(e => filters.has(e.category))
  }, [selected, eventMap, filters])

  // Upcoming events this month (sorted) for the sidebar list
  const upcomingThisMonth = useMemo(() => {
    const all: CalendarEvent[] = []
    for (let d = 1; d <= daysInMonth; d++) {
      const key  = toDateKey(year, month, d)
      const evts = eventMap[key] ?? []
      all.push(...evts)
    }
    return filters.size === 0 ? all : all.filter(e => filters.has(e.category))
  }, [year, month, daysInMonth, eventMap, filters])

  // Build calendar cells
  const cells = useMemo(() => {
    const c: (number | null)[] = []
    for (let i = 0; i < firstDay; i++) c.push(null)
    for (let d = 1; d <= daysInMonth; d++) c.push(d)
    return c
  }, [firstDay, daysInMonth])

  return (
    <div className="p-6 min-h-full bg-[#F5F4F0]">

      {/* Page header */}
      <div className="flex items-end justify-between mb-6 pb-5 border-b border-[#E5E2DC]">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#1B2A4A]">Company Calendar</h2>
          <p className="font-sans text-xs text-[#999] mt-1">Singapore · {year}</p>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2">
          {(Object.keys(CATEGORY_STYLES) as EventCategory[]).map(cat => {
            const s      = CATEGORY_STYLES[cat]
            const active = filters.has(cat)
            return (
              <button
                key={cat}
                onClick={() => toggleFilter(cat)}
                className="flex items-center gap-1.5 px-3 py-1.5 font-sans text-xs font-medium transition-all border"
                style={{
                  backgroundColor: active ? s.bg           : '#fff',
                  color:           active ? s.text         : '#888',
                  borderColor:     active ? s.dot          : '#E5E2DC',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: active ? s.dot : '#ccc' }}
                />
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

        {/* ── Calendar ── */}
        <div className="bg-white border border-[#E5E2DC] p-6">

          {/* Month navigation */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={prev} className="p-2 hover:bg-[#F5F4F0] transition-colors border border-transparent hover:border-[#E5E2DC]">
              <ChevronLeft className="w-5 h-5 text-[#1B2A4A]" />
            </button>
            <h3 className="font-serif text-xl font-semibold text-[#1B2A4A]">
              {MONTH_NAMES[month]} {year}
            </h3>
            <button onClick={next} className="p-2 hover:bg-[#F5F4F0] transition-colors border border-transparent hover:border-[#E5E2DC]">
              <ChevronRight className="w-5 h-5 text-[#1B2A4A]" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2 pb-2 border-b border-[#E5E2DC]">
            {DAY_LABELS.map(d => (
              <div key={d} className="text-center text-xs font-sans font-semibold text-[#AAA] uppercase tracking-wider">{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-0.5">
            {cells.map((day, i) => {
              if (day === null) return <div key={`e-${i}`} />

              const key      = toDateKey(year, month, day)
              const evts     = eventMap[key] ?? []
              const filtered = filters.size === 0 ? evts : evts.filter(e => filters.has(e.category))
              const isSelected = selected === key
              const isToday    = key === toDateKey(today.getFullYear(), today.getMonth(), today.getDate())
              const dayCategory = evts[0]?.category as EventCategory | undefined
              const dayStyle = dayCategory ? CATEGORY_STYLES[dayCategory] : null

              // Up to 3 dot indicators
              const dots = filtered.slice(0, 3)

              return (
                <button
                  key={day}
                  onClick={() => setSelected(key)}
                  className={`
                    min-h-[56px] flex flex-col items-center pt-2 px-1 pb-1 text-sm font-sans transition-all relative border
                    ${isSelected
                      ? 'bg-[#1B2A4A] text-white border-[#1B2A4A]'
                      : isToday
                        ? 'border-[#B8975A] text-[#1B2A4A] font-semibold'
                        : 'border-transparent text-[#444] hover:bg-[#F5F4F0]'
                    }
                  `}
                  style={
                    !isSelected && !isToday && dayStyle
                      ? {
                          backgroundColor: dayStyle.bg,
                          color: dayStyle.text,
                        }
                      : undefined
                  }
                >
                  <span className="font-semibold leading-none mb-1.5">{day}</span>
                  {/* Dot indicators */}
                  {dots.length > 0 && (
                    <div className="flex gap-0.5 flex-wrap justify-center">
                      {dots.map(e => (
                        <span
                          key={e.id}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: isSelected ? 'rgba(255,255,255,0.7)' : CATEGORY_STYLES[e.category].dot }}
                        />
                      ))}
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-5 pt-4 border-t border-[#E5E2DC]">
            {(Object.entries(CATEGORY_STYLES) as [EventCategory, typeof CATEGORY_STYLES[EventCategory]][]).map(([cat, s]) => (
              <div key={cat} className="flex items-center gap-1.5 text-xs font-sans text-[#777]">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.dot }} />
                {s.label}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="flex flex-col gap-5">

          {/* Selected day events */}
          <div className="bg-white border border-[#E5E2DC] p-5">
            <h4 className="font-serif text-base font-semibold text-[#1B2A4A] mb-4">
              {selected
                ? (() => {
                    const [y, m, d] = selected.split('-').map(Number)
                    return `${MONTH_NAMES[m - 1]} ${d}, ${y}`
                  })()
                : 'Select a date'}
            </h4>

            {selectedEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedEvents.map(event => {
                  const s = CATEGORY_STYLES[event.category]
                  return (
                    <div
                      key={event.id}
                      className="p-3 border-l-2"
                      style={{ borderLeftColor: s.dot, backgroundColor: s.bg + '55' }}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-sans text-sm font-semibold text-[#1B2A4A] leading-snug">{event.title}</p>
                        <EventBadge event={event} />
                      </div>
                      {event.time && (
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <Clock className="w-3 h-3 text-[#999]" />
                          <span className="font-sans text-xs text-[#666]">{event.time}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-1.5 mt-1">
                          <MapPin className="w-3 h-3 text-[#999]" />
                          <span className="font-sans text-xs text-[#666]">{event.location}</span>
                        </div>
                      )}
                      {event.description && (
                        <p className="font-sans text-xs text-[#888] mt-2 leading-relaxed">{event.description}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center py-6 gap-2">
                <CalendarDays className="w-8 h-8 text-[#DDD]" />
                <p className="font-sans text-sm text-[#AAA]">
                  {selected ? 'No events on this date' : 'Click a date to view events'}
                </p>
              </div>
            )}
          </div>

          {/* Upcoming this month */}
          <div className="bg-white border border-[#E5E2DC] p-5 flex-1">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-serif text-base font-semibold text-[#1B2A4A]">
                This Month
              </h4>
              <span className="font-sans text-xs text-[#999]">
                {upcomingThisMonth.length} event{upcomingThisMonth.length !== 1 ? 's' : ''}
              </span>
            </div>

            {upcomingThisMonth.length > 0 ? (
              <div className="space-y-2">
                {upcomingThisMonth.map(event => {
                  const s   = CATEGORY_STYLES[event.category]
                  const day = parseInt(event.date.split('-')[2])
                  return (
                    <button
                      key={event.id}
                      onClick={() => setSelected(event.date)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-[#F5F4F0] transition-colors border border-transparent hover:border-[#E5E2DC]"
                    >
                      {/* Day number */}
                      <div
                        className="flex-shrink-0 w-9 h-9 flex items-center justify-center font-serif text-sm font-semibold"
                        style={{ backgroundColor: s.bg, color: s.text }}
                      >
                        {day}
                      </div>
                      {/* Event info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-xs font-semibold text-[#1B2A4A] truncate">{event.title}</p>
                        {event.time && (
                          <p className="font-sans text-xs text-[#AAA] mt-0.5">{event.time}</p>
                        )}
                      </div>
                      {/* Category dot */}
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.dot }} />
                    </button>
                  )
                })}
              </div>
            ) : (
              <p className="font-sans text-sm text-[#AAA] py-4 text-center">No events this month</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}