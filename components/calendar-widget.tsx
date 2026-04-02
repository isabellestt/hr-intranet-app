'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { staffDirectory } from '@/lib/mock-data'

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export default function CalendarWidget() {
  const today = new Date()
  const [viewDate, setViewDate] = useState({ year: today.getFullYear(), month: today.getMonth() })
  const [selected, setSelected] = useState(today.getDate())

  const { year, month } = viewDate
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const prev = () => {
    setViewDate(d => {
      if (d.month === 0) return { year: d.year - 1, month: 11 }
      return { year: d.year, month: d.month - 1 }
    })
    setSelected(0)
  }
  const next = () => {
    setViewDate(d => {
      if (d.month === 11) return { year: d.year + 1, month: 0 }
      return { year: d.year, month: d.month + 1 }
    })
    setSelected(0)
  }

  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear()

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className="rounded-lg overflow-hidden border border-[#B8D4E8]/60">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: '#1A2E55' }}>
        <button onClick={prev} className="text-white/70 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-white font-serif text-sm font-semibold">
          {MONTH_NAMES[month]} {year}
        </span>
        <button onClick={next} className="text-white/70 hover:text-white transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Days header */}
      <div className="grid grid-cols-7 bg-[#B8D4E8]/30">
        {DAYS.map((d, i) => (
          <div key={i} className="text-center text-[10px] font-bold py-1.5 text-[#1A2E55]">{d}</div>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7 p-2 gap-0.5 bg-white">
        {cells.map((day, i) => (
          <div key={i} className="aspect-square flex items-center justify-center">
            {day !== null && (
              <button
                onClick={() => setSelected(day)}
                className={`
                  w-full h-full text-xs font-sans rounded transition-all flex items-center justify-center
                  ${selected === day ? 'text-white font-bold' : isToday(day) ? 'font-bold text-[#1A2E55]' : 'text-[#333] hover:bg-[#B8D4E8]/40'}
                `}
                style={selected === day ? { backgroundColor: '#1A2E55' } : isToday(day) ? { backgroundColor: '#B8D4E8' } : {}}
              >
                {day}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function StaffDirectoryWidget() {
  const [query, setQuery] = useState('')
  const filtered = staffDirectory.filter(
    s =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.department.toLowerCase().includes(query.toLowerCase()) ||
      s.role.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <h2 className="font-serif text-xl font-bold mb-3" style={{ color: '#1A2E55' }}>
        Staff Directory
      </h2>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, role or department..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1A2E55] text-gray-700"
        />
      </div>
      <div className="divide-y divide-gray-100">
        {filtered.map(staff => (
          <div key={staff.id} className="flex items-center gap-3 py-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold font-serif"
              style={{ backgroundColor: '#1A2E55' }}
            >
              {staff.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-800 truncate">{staff.name}</div>
              <div className="text-xs text-gray-500 truncate">{staff.role} · {staff.department}</div>
            </div>
            <div className="text-xs text-gray-400 flex-shrink-0 font-mono">{staff.id}</div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-6 text-center text-sm text-gray-400">No results found</div>
        )}
      </div>
    </div>
  )
}
