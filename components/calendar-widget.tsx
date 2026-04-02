'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
    <div className="bg-white border border-[#E5E5E5]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#E5E5E5]">
        <button onClick={prev} className="p-1 hover:bg-[#F5F4F0] transition-colors">
          <ChevronLeft className="w-4 h-4 text-[#1B2A4A]" />
        </button>
        <span className="font-serif text-sm font-semibold text-[#1B2A4A]">
          {MONTH_NAMES[month]} {year}
        </span>
        <button onClick={next} className="p-1 hover:bg-[#F5F4F0] transition-colors">
          <ChevronRight className="w-4 h-4 text-[#1B2A4A]" />
        </button>
      </div>

      {/* Days header */}
      <div className="grid grid-cols-7 border-b border-[#E5E5E5]">
        {DAYS.map((d, i) => (
          <div key={i} className="text-center text-[10px] font-sans font-semibold py-2 text-[#888]">{d}</div>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7 p-2 gap-1">
        {cells.map((day, i) => (
          <div key={i} className="aspect-square flex items-center justify-center">
            {day !== null && (
              <button
                onClick={() => setSelected(day)}
                className={`
                  w-8 h-8 text-xs font-sans transition-all flex items-center justify-center relative
                  ${selected === day 
                    ? 'bg-[#1B2A4A] text-white font-semibold' 
                    : isToday(day) 
                      ? 'text-[#1B2A4A] font-semibold' 
                      : 'text-[#444] hover:bg-[#F5F4F0]'
                  }
                `}
              >
                {day}
                {isToday(day) && selected !== day && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#B8975A]" />
                )}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
