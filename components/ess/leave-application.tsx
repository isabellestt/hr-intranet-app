'use client'

import { useState } from 'react'
import { currentUser } from '@/lib/mock-data'

const leaveTypes = ['Annual', 'Medical', 'Urgent', 'Unpaid']

export default function LeaveApplication() {
  const [form, setForm] = useState({
    fullName: currentUser.fullName,
    employeeId: currentUser.employeeId,
    days: '',
    startDate: '',
    endDate: '',
    leaveType: 'Annual',
    reason: '',
    signature: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const update = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const inputClass = "w-full px-3 py-2 rounded text-sm text-[#1A2E55] bg-white border-0 outline-none focus:ring-1 focus:ring-[#B8D4E8]"
  const labelClass = "font-serif text-sm text-white/90 block mb-1"

  return (
    <div className="p-6 min-h-full" style={{ backgroundColor: '#1A2E55' }}>
      <h2 className="font-serif text-xl font-bold text-white mb-6">Leave Application</h2>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Full Name</label>
            <input value={form.fullName} readOnly className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Employee ID</label>
            <input value={form.employeeId} readOnly className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Number of Days</label>
            <input
              type="number"
              value={form.days}
              onChange={update('days')}
              placeholder="0"
              min="1"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Leave Type</label>
            <select value={form.leaveType} onChange={update('leaveType')} className={inputClass}>
              {leaveTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Start Date</label>
            <input
              type="date"
              value={form.startDate}
              onChange={update('startDate')}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>End Date</label>
            <input
              type="date"
              value={form.endDate}
              onChange={update('endDate')}
              className={inputClass}
              required
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Reason for Leave</label>
          <textarea
            value={form.reason}
            onChange={update('reason')}
            rows={3}
            placeholder="Please describe your reason..."
            className={`${inputClass} resize-none`}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Applicant Signature</label>
          <textarea
            value={form.signature}
            onChange={update('signature')}
            rows={4}
            placeholder="Type your full name as signature..."
            className={`${inputClass} resize-none`}
            required
          />
        </div>
        <button
          type="submit"
          className="px-8 py-2.5 rounded-md text-sm font-semibold font-sans transition-all hover:opacity-90 active:scale-95 text-[#1A2E55]"
          style={{ backgroundColor: '#B8D4E8' }}
        >
          {submitted ? 'Application Submitted!' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
