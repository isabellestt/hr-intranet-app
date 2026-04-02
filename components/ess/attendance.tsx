'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { attendanceData, type AttendanceRecord } from '@/lib/mock-data'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDay(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}
function dateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

const statusColors: Record<AttendanceRecord['status'], string> = {
  PRESENT: '#22c55e',
  ABSENT: '#ef4444',
  LEAVE: '#B8975A',
}

export default function Attendance() {
  const today = new Date()
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() })
  const [selected, setSelected] = useState<number | null>(today.getDate())

  const { year, month } = view
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDay(year, month)

  const prev = () =>
    setView(v => v.month === 0 ? { year: v.year - 1, month: 11 } : { year: v.year, month: v.month - 1 })
  const next = () =>
    setView(v => v.month === 11 ? { year: v.year + 1, month: 0 } : { year: v.year, month: v.month + 1 })

  const selectedKey = selected ? dateKey(year, month, selected) : null
  const record = selectedKey ? attendanceData[selectedKey] : null

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
      {/* Calendar */}
      <div className="bg-white border border-[#E5E5E5] p-6">
        <div className="flex items-center justify-between mb-6">
          <button onClick={prev} className="p-2 hover:bg-[#F5F4F0] transition-colors">
            <ChevronLeft className="w-5 h-5 text-[#1B2A4A]" />
          </button>
          <h2 className="font-serif text-xl font-semibold text-[#1B2A4A]">
            {MONTH_NAMES[month]} {year}
          </h2>
          <button onClick={next} className="p-2 hover:bg-[#F5F4F0] transition-colors">
            <ChevronRight className="w-5 h-5 text-[#1B2A4A]" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2 border-b border-[#E5E5E5] pb-2">
          {DAY_LABELS.map(d => (
            <div key={d} className="text-center text-xs font-sans font-semibold text-[#888]">{d}</div>
          ))}
        </div>

        {/* Cells */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (day === null) return <div key={`e-${i}`} />
            const key = dateKey(year, month, day)
            const rec = attendanceData[key]
            const isSelected = selected === day
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()

            return (
              <button
                key={day}
                onClick={() => setSelected(day)}
                className={`
                  aspect-square flex flex-col items-center justify-center text-sm font-sans transition-all relative border
                  ${isSelected 
                    ? 'bg-[#1B2A4A] text-white border-[#1B2A4A] font-semibold' 
                    : isToday 
                      ? 'border-[#B8975A] text-[#1B2A4A] font-semibold' 
                      : 'border-transparent text-[#444] hover:bg-[#F5F4F0]'
                  }
                `}
              >
                {day}
                {rec && !isSelected && (
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-0.5"
                    style={{ backgroundColor: statusColors[rec.status] }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex gap-5 mt-6 pt-4 border-t border-[#E5E5E5]">
          {Object.entries(statusColors).map(([status, color]) => (
            <div key={status} className="flex items-center gap-2 text-xs font-sans text-[#666]">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              {status}
            </div>
          ))}
        </div>
      </div>

      {/* Details Panel */}
      <div className="bg-white border border-[#E5E5E5] p-6">
        <h3 className="font-serif text-lg font-semibold text-[#1B2A4A] mb-6">
          {selected
            ? `${MONTH_NAMES[month]} ${selected}, ${year}`
            : 'Select a date'}
        </h3>

        {record ? (
          <div className="space-y-4">
            <DetailRow label="General Shift" value={`${record.shiftStart} – ${record.shiftEnd}`} />
            <DetailRow label="Clock In" value={record.clockIn} />
            <DetailRow label="Clock Out" value={record.clockOut} />
            <DetailRow label="Total Shift Hours" value={record.totalHours} />
            <div>
              <div className="text-xs font-sans font-medium text-[#666] uppercase tracking-wider mb-2">Attendance Status</div>
              <span
                className="inline-block px-3 py-1 text-xs font-sans font-semibold text-white"
                style={{ backgroundColor: statusColors[record.status] }}
              >
                {record.status}
              </span>
            </div>
          </div>
        ) : selected ? (
          <div className="text-sm font-sans text-[#888]">No attendance record for this date.</div>
        ) : (
          <div className="text-sm font-sans text-[#888]">Click a date to view attendance details.</div>
        )}
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-sans font-medium text-[#666] uppercase tracking-wider mb-1">{label}</div>
      <div className="text-sm font-sans font-medium text-[#1A1A1A]">{value}</div>
    </div>
  )
}
