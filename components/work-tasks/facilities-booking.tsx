'use client'

import { useState, useMemo } from 'react'
import {
  ChevronLeft, ChevronRight, X, Check,
  Users, MapPin, Monitor, ChevronDown,
} from 'lucide-react'
import { facilityRooms, facilityBookings, type FacilityRoom, type BookedSlot, type SlotStatus } from '@/lib/mock-data'

// ── Constants ─────────────────────────────────────────────────────────────────

const HOURS       = Array.from({ length: 16 }, (_, i) => i + 7)   // 07:00 – 22:00
const SLOT_W      = 44   // px per hour cell
const LABEL_W     = 140  // px for room label column

const STATUS_STYLE: Record<SlotStatus, { bg: string; border: string; text: string; label: string }> = {
  available:  { bg: 'rgba(255,255,255,0.0)',  border: 'transparent',           text: 'transparent',         label: 'Available'  },
  confirmed:  { bg: 'rgba(76,175,80,0.25)',   border: 'rgba(76,175,80,0.6)',   text: '#4CAF50',             label: 'Confirmed'  },
  pending:    { bg: 'rgba(184,151,90,0.25)',  border: 'rgba(184,151,90,0.6)',  text: '#B8975A',             label: 'Pending'    },
  cancelled:  { bg: 'rgba(224,112,112,0.15)', border: 'rgba(224,112,112,0.4)', text: 'rgba(224,112,112,0.6)', label: 'Cancelled' },
}

const HOUR_LABEL = (h: number) => `${String(h).padStart(2, '0')}:00`


function dateKey(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}` // local date key, no UTC shift
}

function formatDate(d: Date) {
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

function addDays(d: Date, n: number) {
  const next = new Date(d); next.setDate(d.getDate() + n); return next
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface Selection { roomId: string; startHour: number; endHour: number }

interface BookingForm {
  name:      string
  employeeId: string
  purpose:   string
  attendees: string
  notes:     string
}

const EMPTY_FORM: BookingForm = { name: '', employeeId: '', purpose: '', attendees: '', notes: '' }

// ── Sub-components ────────────────────────────────────────────────────────────

function StepBar({ step }: { step: 1 | 2 | 3 }) {
  const steps = ['Availability', 'Booking Details', 'Confirmation']
  return (
    <div className="flex items-center gap-0 mb-5">
      {steps.map((label, i) => {
        const n       = i + 1
        const active  = step === n
        const done    = step > n
        return (
          <div key={n} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 flex items-center justify-center font-sans text-xs font-semibold flex-shrink-0 transition-all"
                style={{
                  backgroundColor: done ? '#4CAF50' : active ? '#B8975A' : 'rgba(255,255,255,0.08)',
                  color:           done || active   ? '#fff'             : 'rgba(255,255,255,0.3)',
                  borderRadius:    '50%',
                }}
              >
                {done ? <Check className="w-3 h-3" /> : n}
              </div>
              <span
                className="font-sans text-xs font-medium hidden sm:block"
                style={{ color: active ? '#fff' : done ? '#4CAF50' : 'rgba(255,255,255,0.35)' }}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-8 h-px mx-2 sm:mx-3 flex-shrink-0" style={{ backgroundColor: done ? '#4CAF50' : 'rgba(255,255,255,0.12)' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function FormField({
  label, value, onChange, placeholder, required, error, type = 'text',
}: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; required?: boolean; error?: boolean; type?: string
}) {
  return (
    <div>
      <label className="block font-sans text-xs uppercase tracking-widest mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
        {label}
        {required && <span className="ml-1" style={{ color: '#B8975A' }}>*</span>}
        {error   && <span className="ml-2 normal-case tracking-normal" style={{ color: '#E07070' }}>Required</span>}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 font-sans text-sm text-white placeholder-white/20 outline-none focus:ring-1 focus:ring-[#B8975A]"
        style={{
          backgroundColor: 'rgba(255,255,255,0.06)',
          border: error ? '1px solid rgba(224,112,112,0.7)' : '1px solid rgba(255,255,255,0.12)',
        }}
      />
    </div>
  )
}

// ── Timeline Grid ─────────────────────────────────────────────────────────────

function TimelineGrid({
  date,
  rooms,
  bookings,
  selection,
  onSelect,
}: {
  date: Date
  rooms: FacilityRoom[]
  bookings: BookedSlot[]
  selection: Selection | null
  onSelect: (sel: Selection | null) => void
}) {
  const [dragStart, setDragStart] = useState<{ roomId: string; hour: number } | null>(null)
  const [hoverCell, setHoverCell] = useState<{ roomId: string; hour: number } | null>(null)

  const bookingMap = useMemo(() => {
    const m: Record<string, BookedSlot[]> = {}
    rooms.forEach((r) => { m[r.id] = bookings.filter((b) => b.roomId === r.id) })
    return m
  }, [rooms, bookings])

  const isBooked = (roomId: string, hour: number) =>
    bookingMap[roomId]?.some((b) => hour >= b.startHour && hour < b.endHour) ?? false

  const getBooking = (roomId: string, hour: number) =>
    bookingMap[roomId]?.find((b) => hour >= b.startHour && hour < b.endHour)

  const isStartOfBooking = (roomId: string, hour: number) =>
    bookingMap[roomId]?.some((b) => b.startHour === hour)

  const isInSelection = (roomId: string, hour: number) => {
    if (!selection || selection.roomId !== roomId) return false
    return hour >= selection.startHour && hour < selection.endHour
  }

  const handleMouseDown = (roomId: string, hour: number) => {
    if (isBooked(roomId, hour)) return
    setDragStart({ roomId, hour })
    onSelect({ roomId, startHour: hour, endHour: hour + 1 })
  }

  const handleMouseEnter = (roomId: string, hour: number) => {
    setHoverCell({ roomId, hour })
    if (dragStart && dragStart.roomId === roomId && !isBooked(roomId, hour)) {
      const start = Math.min(dragStart.hour, hour)
      const end   = Math.max(dragStart.hour, hour) + 1
      onSelect({ roomId, startHour: start, endHour: end })
    }
  }

  const handleMouseUp = () => setDragStart(null)

  return (
    <div
      className="overflow-x-auto select-none"
      style={{ cursor: dragStart ? 'col-resize' : 'default' }}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => { setDragStart(null); setHoverCell(null) }}
    >
      <div style={{ minWidth: LABEL_W + HOURS.length * SLOT_W }}>

        {/* Hour headers */}
        <div className="flex" style={{ marginLeft: LABEL_W }}>
          {HOURS.map((h) => (
            <div
              key={h}
              className="flex-shrink-0 font-sans text-xs text-center py-1.5"
              style={{
                width:       SLOT_W,
                color:       'rgba(255,255,255,0.3)',
                borderLeft:  '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {HOUR_LABEL(h)}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />

        {/* Room rows */}
        {rooms.map((room, ri) => (
          <div
            key={room.id}
            className="flex"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            {/* Room label */}
            <div
              className="flex-shrink-0 flex items-center px-3"
              style={{ width: LABEL_W, borderRight: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div>
                <p className="font-sans text-xs font-semibold text-white truncate" style={{ maxWidth: LABEL_W - 24 }}>
                  {room.name}
                </p>
                <p className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10 }}>
                  Cap. {room.capacity}
                </p>
              </div>
            </div>

            {/* Hour cells */}
            {HOURS.map((h) => {
              const booked   = isBooked(room.id, h)
              const booking  = getBooking(room.id, h)
              const isStart  = isStartOfBooking(room.id, h)
              const inSel    = isInSelection(room.id, h)
              const isHover  = hoverCell?.roomId === room.id && hoverCell.hour === h && !booked

              return (
                <div
                  key={h}
                  className="relative flex-shrink-0 transition-colors"
                  style={{
                    width:           SLOT_W,
                    height:          40,
                    borderLeft:      '1px solid rgba(255,255,255,0.05)',
                    backgroundColor: inSel
                      ? 'rgba(184,151,90,0.3)'
                      : booked && booking
                        ? STATUS_STYLE[booking.status].bg
                        : isHover
                          ? 'rgba(255,255,255,0.05)'
                          : 'transparent',
                    cursor:          booked ? 'not-allowed' : 'pointer',
                    borderTop:       inSel ? '1px solid rgba(184,151,90,0.6)' : 'none',
                    borderBottom:    inSel ? '1px solid rgba(184,151,90,0.6)' : 'none',
                  }}
                  onMouseDown={() => handleMouseDown(room.id, h)}
                  onMouseEnter={() => handleMouseEnter(room.id, h)}
                >
                  {/* Booking label — only render at start */}
                  {booked && booking && isStart && (
                    <div
                      className="absolute top-0 left-0 h-full flex items-center px-1.5 overflow-hidden z-10"
                      style={{
                        width:        (booking.endHour - booking.startHour) * SLOT_W - 2,
                        border:       `1px solid ${STATUS_STYLE[booking.status].border}`,
                        backgroundColor: STATUS_STYLE[booking.status].bg,
                        pointerEvents: 'none',
                      }}
                    >
                      <span
                        className="font-sans font-semibold truncate"
                        style={{ fontSize: 10, color: STATUS_STYLE[booking.status].text }}
                      >
                        {booking.label}
                      </span>
                    </div>
                  )}
                  {/* Selection label */}
                  {inSel && selection?.startHour === h && selection.roomId === room.id && (
                    <div
                      className="absolute top-0 left-0 h-full flex items-center px-2 z-20 pointer-events-none"
                      style={{ width: (selection.endHour - selection.startHour) * SLOT_W - 2 }}
                    >
                      <span className="font-sans text-xs font-semibold text-white truncate">
                        {HOUR_LABEL(selection.startHour)} – {HOUR_LABEL(selection.endHour)}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function FacilitiesBooking() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [date,      setDate]      = useState(today)
  const [step,      setStep]      = useState<1 | 2 | 3>(1)
  const [selection, setSelection] = useState<Selection | null>(null)
  const [form,      setForm]      = useState<BookingForm>(EMPTY_FORM)
  const [errors,    setErrors]    = useState<Partial<Record<keyof BookingForm, boolean>>>({})
  const [bookings,  setBookings]  = useState(facilityBookings)
  const [filterType, setFilterType] = useState<string>('All')
  const [expandedRoom, setExpandedRoom] = useState<string | null>(null)

  const key      = dateKey(date)
  const daySlots = bookings[key] ?? []

  const filteredRooms = useMemo(() =>
    filterType === 'All' ? facilityRooms : facilityRooms.filter((r) => r.type === filterType),
    [filterType]
  )

  const selectedRoom  = selection ? facilityRooms.find((r) => r.id === selection.roomId) : null
  const duration      = selection ? selection.endHour - selection.startHour : 0

  const validateForm = () => {
    const e: Partial<Record<keyof BookingForm, boolean>> = {}
    if (!form.name.trim())       e.name       = true
    if (!form.employeeId.trim()) e.employeeId = true
    if (!form.purpose.trim())    e.purpose    = true
    if (!form.attendees.trim())  e.attendees  = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleBook = () => {
    if (!validateForm()) return
    setStep(3)
  }

  const handleConfirm = () => {
    if (!selection) return
    const newSlot: BookedSlot = {
      roomId:    selection.roomId,
      startHour: selection.startHour,
      endHour:   selection.endHour,
      status:    'pending',
      label:     form.purpose,
    }
    setBookings((prev) => ({
      ...prev,
      [key]: [...(prev[key] ?? []), newSlot],
    }))
    setSelection(null)
    setForm(EMPTY_FORM)
    setErrors({})
    setStep(1)
  }

  const handleClearSelection = () => {
    setSelection(null)
    setStep(1)
  }

  const ROOM_TYPES = ['All', ...Array.from(new Set(facilityRooms.map((r) => r.type)))]

  return (
    <div className="p-6 min-h-full" style={{ backgroundColor: '#1A2E55' }}>

      {/* Header */}
      <div className="flex items-end justify-between mb-6 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div>
          <h2 className="font-serif text-xl font-bold text-white">Facilities Booking</h2>
          <p className="font-sans text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Click and drag on the timeline to select a time slot
          </p>
        </div>
        {selection && step === 1 && (
          <button
            onClick={() => setStep(2)}
            className="flex items-center gap-2 px-4 py-2 font-sans text-xs font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#B8975A', color: '#fff' }}
          >
            Book Selection <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Step bar */}
      <StepBar step={step} />

      {/* ── Step 1: Availability ── */}
      {step === 1 && (
        <>
          {/* Controls row */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">

            {/* Date navigation */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setDate((d) => addDays(d, -1))}
                className="p-2 transition-colors hover:bg-white/5"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <div
                className="px-4 py-2 font-sans text-sm text-white"
                style={{ border: '1px solid rgba(255,255,255,0.1)', minWidth: 200, textAlign: 'center' }}
              >
                {formatDate(date)}
              </div>
              <button
                onClick={() => setDate((d) => addDays(d, 1))}
                className="p-2 transition-colors hover:bg-white/5"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Room type filter + clear */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 font-sans text-xs text-white outline-none"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  {ROOM_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-2.5 w-3 h-3 pointer-events-none" style={{ color: 'rgba(255,255,255,0.4)' }} />
              </div>
              {selection && (
                <button
                  onClick={handleClearSelection}
                  className="flex items-center gap-1.5 px-3 py-2 font-sans text-xs transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div
            className="mb-4"
            style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <TimelineGrid
              date={date}
              rooms={filteredRooms}
              bookings={daySlots}
              selection={selection}
              onSelect={setSelection}
            />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-5">
            {(Object.entries(STATUS_STYLE) as [SlotStatus, typeof STATUS_STYLE[SlotStatus]][]).map(([status, s]) => (
              <div key={status} className="flex items-center gap-2">
                <div
                  className="w-4 h-3"
                  style={{ backgroundColor: s.bg, border: `1px solid ${s.border === 'transparent' ? 'rgba(255,255,255,0.15)' : s.border}` }}
                />
                <span className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {s.label}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <div className="w-4 h-3" style={{ backgroundColor: 'rgba(184,151,90,0.3)', border: '1px solid rgba(184,151,90,0.6)' }} />
              <span className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Your Selection</span>
            </div>
          </div>

          {/* Selection summary + room info */}
          {selection && selectedRoom && (
            <div
              className="p-4"
              style={{ backgroundColor: 'rgba(184,151,90,0.08)', border: '1px solid rgba(184,151,90,0.25)', borderLeft: '3px solid #B8975A' }}
            >
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest mb-2" style={{ color: '#B8975A' }}>
                    Selected Slot
                  </p>
                  <p className="font-serif text-base font-semibold text-white">{selectedRoom.name}</p>
                  <p className="font-sans text-sm mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {formatDate(date)} · {HOUR_LABEL(selection.startHour)} – {HOUR_LABEL(selection.endHour)} ({duration}h)
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2 font-sans text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> Cap. {selectedRoom.capacity}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {selectedRoom.floor}</span>
                    <span className="flex items-center gap-1"><Monitor className="w-3 h-3" /> {selectedRoom.amenities.slice(0, 2).join(', ')}{selectedRoom.amenities.length > 2 ? '…' : ''}</span>
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-5 py-2.5 font-sans text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#B8975A', color: '#fff' }}
                >
                  Make Booking <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Room details accordion */}
          <div className="mt-5">
            <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Facility Details
            </p>
            <div className="space-y-1">
              {filteredRooms.map((room) => (
                <div key={room.id} style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                  <button
                    onClick={() => setExpandedRoom(expandedRoom === room.id ? null : room.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="flex-1 flex items-center gap-4 flex-wrap">
                      <span className="font-sans text-sm font-semibold text-white">{room.name}</span>
                      <span className="font-sans text-xs px-2 py-0.5" style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}>
                        {room.type}
                      </span>
                      <span className="font-sans text-xs flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        <Users className="w-3 h-3" /> {room.capacity}
                      </span>
                      <span className="font-sans text-xs flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        <MapPin className="w-3 h-3" /> {room.floor}
                      </span>
                    </div>
                    <ChevronDown
                      className="w-4 h-4 flex-shrink-0 transition-transform"
                      style={{
                        color:     'rgba(255,255,255,0.3)',
                        transform: expandedRoom === room.id ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>
                  {expandedRoom === room.id && (
                    <div className="px-4 pb-3">
                      <div className="h-px mb-3" style={{ backgroundColor: 'rgba(255,255,255,0.07)' }} />
                      <p className="font-sans text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        Amenities
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {room.amenities.map((a) => (
                          <span
                            key={a}
                            className="font-sans text-xs px-2.5 py-1"
                            style={{ backgroundColor: 'rgba(184,151,90,0.1)', color: '#B8975A', border: '1px solid rgba(184,151,90,0.2)' }}
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── Step 2: Booking Details ── */}
      {step === 2 && selection && selectedRoom && (
        <div className="max-w-lg space-y-5">

          {/* Slot recap */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ backgroundColor: 'rgba(184,151,90,0.08)', border: '1px solid rgba(184,151,90,0.2)', borderLeft: '3px solid #B8975A' }}
          >
            <div>
              <p className="font-sans text-xs font-semibold text-white">{selectedRoom.name}</p>
              <p className="font-sans text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {formatDate(date)} · {HOUR_LABEL(selection.startHour)} – {HOUR_LABEL(selection.endHour)}
              </p>
            </div>
            <button onClick={() => setStep(1)} className="font-sans text-xs transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Change
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Full Name"    value={form.name}        onChange={(v) => setForm((f) => ({ ...f, name: v }))}        placeholder="Your full name"    required error={errors.name}       />
            <FormField label="Employee ID"  value={form.employeeId}  onChange={(v) => setForm((f) => ({ ...f, employeeId: v }))}  placeholder="e.g. 01432846"     required error={errors.employeeId} />
          </div>
          <FormField label="Purpose of Booking" value={form.purpose}   onChange={(v) => setForm((f) => ({ ...f, purpose: v }))}   placeholder="e.g. Team Meeting"  required error={errors.purpose}   />
          <FormField label="No. of Attendees"   value={form.attendees} onChange={(v) => setForm((f) => ({ ...f, attendees: v }))} placeholder={`Max ${selectedRoom.capacity}`} required error={errors.attendees} type="number" />

          <div>
            <label className="block font-sans text-xs uppercase tracking-widest mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Additional Notes
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              placeholder="Any special requirements (AV setup, catering, etc.)…"
              rows={3}
              className="w-full px-3 py-2 font-sans text-sm text-white placeholder-white/20 outline-none resize-none"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <button onClick={() => setStep(1)} className="font-sans text-xs transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.35)' }}>
              ← Back
            </button>
            <button
              onClick={handleBook}
              className="flex items-center gap-2 px-6 py-2.5 font-sans text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#B8975A', color: '#fff' }}
            >
              Review Booking <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Confirmation ── */}
      {step === 3 && selection && selectedRoom && (
        <div className="max-w-lg">
          <div
            className="p-5 mb-5"
            style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <p className="font-sans text-xs uppercase tracking-widest mb-4" style={{ color: '#B8975A' }}>
              Booking Summary
            </p>

            {[
              { label: 'Room',       value: selectedRoom.name                                                          },
              { label: 'Date',       value: formatDate(date)                                                           },
              { label: 'Time',       value: `${HOUR_LABEL(selection.startHour)} – ${HOUR_LABEL(selection.endHour)} (${duration}h)` },
              { label: 'Name',       value: form.name                                                                  },
              { label: 'Employee ID',value: form.employeeId                                                            },
              { label: 'Purpose',    value: form.purpose                                                               },
              { label: 'Attendees',  value: form.attendees                                                             },
              ...(form.notes ? [{ label: 'Notes', value: form.notes }] : []),
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-4 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="font-sans text-xs uppercase tracking-wider w-28 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {label}
                </span>
                <span className="font-sans text-sm text-white">{value}</span>
              </div>
            ))}
          </div>

          <div
            className="flex items-center gap-3 px-4 py-3 mb-5"
            style={{ backgroundColor: 'rgba(184,151,90,0.08)', border: '1px solid rgba(184,151,90,0.2)' }}
          >
            <p className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
              This booking will be submitted as <strong className="text-white">Pending</strong> and requires approval from your department head before it is confirmed.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <button onClick={() => setStep(2)} className="font-sans text-xs transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.35)' }}>
              ← Edit Details
            </button>
            <button
              onClick={handleConfirm}
              className="flex items-center gap-2 px-6 py-2.5 font-sans text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#B8975A', color: '#fff' }}
            >
              <Check className="w-4 h-4" /> Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  )
}