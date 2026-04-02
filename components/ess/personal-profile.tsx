'use client'

import { currentUser } from '@/lib/mock-data'
import { useState } from 'react'

function NavyInput({ value, onChange, readOnly, multiline }: {
  value: string
  onChange?: (v: string) => void
  readOnly?: boolean
  multiline?: boolean
}) {
  const base = "w-full px-3 py-2 rounded text-sm text-[#1A2E55] bg-white border-0 outline-none focus:ring-1 focus:ring-[#B8D4E8] resize-none"
  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={e => onChange?.(e.target.value)}
        readOnly={readOnly}
        rows={3}
        className={base}
      />
    )
  }
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange?.(e.target.value)}
      readOnly={readOnly}
      className={base}
    />
  )
}

function FormRow({ label, value, onChange, readOnly, multiline }: {
  label: string
  value: string
  onChange?: (v: string) => void
  readOnly?: boolean
  multiline?: boolean
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
      <label className="font-serif text-sm text-white/90 sm:w-48 flex-shrink-0 sm:pt-2">{label}</label>
      <div className="flex-1">
        <NavyInput value={value} onChange={onChange} readOnly={readOnly} multiline={multiline} />
      </div>
    </div>
  )
}

export default function PersonalProfile() {
  const [form, setForm] = useState({ ...currentUser })
  const [saved, setSaved] = useState(false)

  const update = (key: keyof typeof form) => (v: string) => {
    setForm(f => ({ ...f, [key]: v }))
    setSaved(false)
  }

  const handleUpdate = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="p-6 min-h-full" style={{ backgroundColor: '#1A2E55' }}>
      <h2 className="font-serif text-xl font-bold text-white mb-6">Personal Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl">
        <FormRow label="First Name" value={form.firstName} onChange={update('firstName')} />
        <FormRow label="Last Name" value={form.lastName} onChange={update('lastName')} />
        <FormRow label="Employee ID" value={form.employeeId} readOnly />
        <FormRow label="Date of Birth" value={form.dateOfBirth} onChange={update('dateOfBirth')} />
        <FormRow label="Gender" value={form.gender} onChange={update('gender')} />
        <FormRow label="Nationality" value={form.nationality} onChange={update('nationality')} />
        <FormRow label="Mobile Number" value={form.mobileNumber} onChange={update('mobileNumber')} />
        <FormRow label="Personal Email Address" value={form.personalEmail} onChange={update('personalEmail')} />
        <div className="md:col-span-2">
          <FormRow label="Residential Address" value={form.residentialAddress} onChange={update('residentialAddress')} multiline />
        </div>
        <FormRow label="Bank Name" value={form.bankName} onChange={update('bankName')} />
        <FormRow label="Account Holder Name" value={form.accountHolderName} onChange={update('accountHolderName')} />
        <FormRow label="Bank Account Number" value={form.bankAccountNumber} onChange={update('bankAccountNumber')} />
        <FormRow label="Bank Branch" value={form.bankBranch} onChange={update('bankBranch')} />
      </div>
      <div className="mt-8">
        <button
          onClick={handleUpdate}
          className="px-8 py-2.5 rounded-md text-sm font-semibold font-sans transition-all hover:opacity-90 active:scale-95 text-[#1A2E55]"
          style={{ backgroundColor: '#B8D4E8' }}
        >
          {saved ? 'Saved!' : 'Update'}
        </button>
      </div>
    </div>
  )
}
