'use client'

import { useState } from 'react'
import { currentUser } from '@/lib/mock-data'

const expenseTypes = ['Meals & Entertainment', 'Travel', 'Accommodation', 'Office Supplies', 'Training', 'Medical', 'Other']

export default function ClaimsReimbursement() {
  const [form, setForm] = useState({
    description: '',
    expenseType: 'Meals & Entertainment',
    amount: '',
    expenseDate: '',
    comments: '',
    submittedDate: new Date().toISOString().split('T')[0],
    approvedDate: '',
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
  const readOnlyClass = `${inputClass} bg-white/60 cursor-default`
  const labelClass = "font-serif text-sm text-white/90 block mb-1"

  return (
    <div className="p-6 min-h-full" style={{ backgroundColor: '#1A2E55' }}>
      <h2 className="font-serif text-xl font-bold text-white mb-6">Claims & Reimbursement</h2>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        <div>
          <label className={labelClass}>Description</label>
          <textarea
            value={form.description}
            onChange={update('description')}
            rows={2}
            placeholder="Brief description of the expense..."
            className={`${inputClass} resize-none`}
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Type of Expense</label>
            <select value={form.expenseType} onChange={update('expenseType')} className={inputClass}>
              {expenseTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Amount (AED)</label>
            <input
              type="number"
              value={form.amount}
              onChange={update('amount')}
              placeholder="0.00"
              step="0.01"
              min="0"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Expense Date</label>
            <input
              type="date"
              value={form.expenseDate}
              onChange={update('expenseDate')}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Submitted Date</label>
            <input type="text" value={form.submittedDate} readOnly className={readOnlyClass} />
          </div>
          <div>
            <label className={labelClass}>Approved Date</label>
            <input type="text" value="Pending Approval" readOnly className={readOnlyClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Comments</label>
          <textarea
            value={form.comments}
            onChange={update('comments')}
            rows={3}
            placeholder="Any additional comments..."
            className={`${inputClass} resize-none`}
          />
        </div>
        <button
          type="submit"
          className="px-8 py-2.5 rounded-md text-sm font-semibold font-sans transition-all hover:opacity-90 active:scale-95 text-[#1A2E55]"
          style={{ backgroundColor: '#B8D4E8' }}
        >
          {submitted ? 'Claim Submitted!' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
