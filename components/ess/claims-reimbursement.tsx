'use client'

import { useState } from 'react'

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

  const inputClass = "w-full px-3 py-2.5 text-sm font-sans text-[#1A1A1A] bg-white border border-[#CCC] outline-none focus:border-[#B8975A] focus:ring-1 focus:ring-[#B8975A]/20 transition-colors"
  const readOnlyClass = `${inputClass} bg-[#F5F4F0] cursor-default`
  const labelClass = "text-xs font-sans font-medium text-[#666] uppercase tracking-wider block mb-2"

  return (
    <div className="bg-white border border-[#E5E5E5] p-8">
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-8 py-3 bg-[#1B2A4A] text-white text-sm font-sans font-medium tracking-wide hover:bg-[#2a3d5c] transition-colors"
          >
            {submitted ? 'Claim Submitted!' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}
