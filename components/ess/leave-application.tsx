'use client'

import { useState } from 'react'
import { currentUser } from '@/lib/mock-data'

const leaveTypes = ['Annual', 'Medical', 'Urgent', 'Unpaid']

interface LeaveForm {
  fullName: string,
  employeeId: string,
  days: string,
  startDate: string,
  endDate: string,
  leaveType: string,
  reason: string,
  signature: string,
}

const INITIAL_FORM: LeaveForm = {
    fullName: currentUser.fullName,
    employeeId: currentUser.employeeId,
    days: '',
    startDate: '',
    endDate: '',
    leaveType: 'Annual',
    reason: '',
    signature: '',
  }

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
    setForm(INITIAL_FORM)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const inputClass = "w-full px-3 py-2.5 text-sm font-sans text-[#1A1A1A] bg-white border border-[#CCC] outline-none focus:border-[#B8975A] focus:ring-1 focus:ring-[#B8975A]/20 transition-colors"
  const readOnlyClass = `${inputClass} bg-[#F5F4F0] cursor-default`
  const labelClass = "text-xs font-sans font-medium text-[#666] uppercase tracking-wider block mb-2"

  return (
    <div className="bg-white border border-[#E5E5E5] p-8">
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Full Name</label>
            <input value={form.fullName} readOnly className={readOnlyClass} />
          </div>
          <div>
            <label className={labelClass}>Employee ID</label>
            <input value={form.employeeId} readOnly className={readOnlyClass} />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Approver Email</label>
              <select name="" id="" className={inputClass}>
                <option value="">Select Approver</option>
                <option value="alan@ritzcarlton.com">alan@ritzcarlton.com</option>
                <option value="sarah@ritzcarlton.com">sarah@ritzcarlton.com</option>
                <option value="josh@ritzcarlton.com">josh@ritzcarlton.com</option>
              </select>
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
            rows={3}
            placeholder="Type your full name as signature..."
            className={`${inputClass} resize-none`}
            required
          />
        </div>
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-8 py-3 bg-[#1B2A4A] text-white text-sm font-sans font-medium tracking-wide hover:bg-[#2a3d5c] transition-colors"
          >
            {submitted ? 'Application Submitted!' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}
