'use client'

import { currentUser } from '@/lib/mock-data'
import { useState } from 'react'

function FormInput({ value, onChange, readOnly, multiline }: {
  value: string
  onChange?: (v: string) => void
  readOnly?: boolean
  multiline?: boolean
}) {
  const base = "w-full px-3 py-2.5 text-sm font-sans text-[#1A1A1A] bg-white border border-[#CCC] outline-none focus:border-[#B8975A] focus:ring-1 focus:ring-[#B8975A]/20 transition-colors"
  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={e => onChange?.(e.target.value)}
        readOnly={readOnly}
        rows={3}
        className={`${base} resize-none ${readOnly ? 'bg-[#F5F4F0] cursor-default' : ''}`}
      />
    )
  }
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange?.(e.target.value)}
      readOnly={readOnly}
      className={`${base} ${readOnly ? 'bg-[#F5F4F0] cursor-default' : ''}`}
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
    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
      <label className="text-xs font-sans font-medium text-[#666] uppercase tracking-wider sm:w-48 flex-shrink-0 sm:pt-3">
        {label}
      </label>
      <div className="flex-1">
        <FormInput value={value} onChange={onChange} readOnly={readOnly} multiline={multiline} />
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
    <div className="bg-white border border-[#E5E5E5] p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 max-w-4xl">
        <FormRow label="First Name" value={form.firstName} onChange={update('firstName')} />
        <FormRow label="Last Name" value={form.lastName} onChange={update('lastName')} />
        <FormRow label="Employee ID" value={form.employeeId} readOnly />
        <FormRow label="Date of Birth" value={form.dateOfBirth} onChange={update('dateOfBirth')} />
        <FormRow label="Gender" value={form.gender} onChange={update('gender')} />
        <FormRow label="Nationality" value={form.nationality} onChange={update('nationality')} />
        <FormRow label="Mobile Number" value={form.mobileNumber} onChange={update('mobileNumber')} />
        <FormRow label="Personal Email" value={form.personalEmail} onChange={update('personalEmail')} />
        <div className="md:col-span-2">
          <FormRow label="Residential Address" value={form.residentialAddress} onChange={update('residentialAddress')} multiline />
        </div>
        <FormRow label="Bank Name" value={form.bankName} onChange={update('bankName')} />
        <FormRow label="Account Holder Name" value={form.accountHolderName} onChange={update('accountHolderName')} />
        <FormRow label="Bank Account Number" value={form.bankAccountNumber} onChange={update('bankAccountNumber')} />
        <FormRow label="Bank Branch" value={form.bankBranch} onChange={update('bankBranch')} />
      </div>
      <div className="mt-10 flex justify-end">
        <button
          onClick={handleUpdate}
          className="px-8 py-3 bg-[#1B2A4A] text-white text-sm font-sans font-medium tracking-wide hover:bg-[#2a3d5c] transition-colors"
        >
          {saved ? 'Saved!' : 'Update'}
        </button>
      </div>
    </div>
  )
}
