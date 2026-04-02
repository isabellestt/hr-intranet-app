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
  LEAVE: '#f59e0b',
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
    <div className="flex flex-col md:flex-row min-h-full">
      {/* Calendar */}
      <div className="flex-1 p-6 bg-white">
        <div className="flex items-center justify-between mb-5">
          <button onClick={prev} className="p-1 hover:bg-gray-100 rounded transition-colors">
            <ChevronLeft className="w-5 h-5 text-[#1A2E55]" />
          </button>
          <h2 className="font-serif text-lg font-bold text-[#1A2E55]">
            {MONTH_NAMES[month]} {year}
          </h2>
          <button onClick={next} className="p-1 hover:bg-gray-100 rounded transition-colors">
            <ChevronRight className="w-5 h-5 text-[#1A2E55]" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAY_LABELS.map(d => (
            <div key={d} className="text-center text-xs font-bold text-[#1A2E55] py-1">{d}</div>
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
                  aspect-square rounded flex flex-col items-center justify-center text-xs font-semibold transition-all relative
                  ${isSelected ? 'text-white' : 'text-[#1A2E55] hover:bg-[#B8D4E8]/40'}
                `}
                style={{
                  backgroundColor: isSelected ? '#1A2E55' : isToday ? '#B8D4E8' : '#EBF3FA',
                }}
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
        <div className="flex gap-4 mt-4">
          {Object.entries(statusColors).map(([status, color]) => (
            <div key={status} className="flex items-center gap-1.5 text-xs text-gray-500">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              {status}
            </div>
          ))}
        </div>
      </div>

      {/* Details Panel */}
      <div className="w-full md:w-64 p-6 flex flex-col gap-4" style={{ backgroundColor: '#1A2E55' }}>
        <h3 className="font-serif text-base font-bold text-white">
          {selected
            ? `${MONTH_NAMES[month]} ${selected}, ${year}`
            : 'Select a date'}
        </h3>

        {record ? (
          <>
            <DetailRow label="General Shift" value={`${record.shiftStart} – ${record.shiftEnd}`} />
            <DetailRow label="Clock In" value={record.clockIn} />
            <DetailRow label="Clock Out" value={record.clockOut} />
            <DetailRow label="Total Shift Hours" value={record.totalHours} />
            <div>
              <div className="text-white/60 text-xs font-sans mb-1">Attendance Status</div>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-bold font-sans"
                style={{ backgroundColor: statusColors[record.status], color: 'white' }}
              >
                {record.status}
              </span>
            </div>
          </>
        ) : selected ? (
          <div className="text-white/50 text-sm font-sans">No attendance record for this date.</div>
        ) : (
          <div className="text-white/50 text-sm font-sans">Click a date to view attendance details.</div>
        )}
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-white/60 text-xs font-sans mb-0.5">{label}</div>
      <div className="text-white text-sm font-semibold font-sans">{value}</div>
    </div>
  )
}
