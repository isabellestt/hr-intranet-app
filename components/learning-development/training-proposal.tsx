'use client'

import { useState } from 'react'
import { Download, Plus, Trash2, User, BookOpen } from 'lucide-react'

// ── Types ────────────────────────────────────────────────────────────────────

interface Nominee {
  id: number
  proposedNo: string
  name: string
  designation: string
  trainingLevel: string
}

interface TrainingProposalForm {
  submitterName: string
  submitterDesignation: string
  department: string
  unit: string
  subject: string
  dayTime: string
  venue: string
  trainingFee: string
  details: string
  nominees: Nominee[]
}

// ── Initial state ─────────────────────────────────────────────────────────────

const EMPTY_NOMINEE: Omit<Nominee, 'id'> = {
  proposedNo:    '',
  name:          '',
  designation:   '',
  trainingLevel: '',
}

const INITIAL_FORM: TrainingProposalForm = {
  submitterName:        '',
  submitterDesignation: '',
  department:           '',
  unit:                 '',
  subject:              '',
  dayTime:              '',
  venue:                '',
  trainingFee:          '',
  details:              '',
  nominees: [{ id: 1, ...EMPTY_NOMINEE }],
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionTitle({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon className="w-4 h-4 flex-shrink-0" style={{ color: '#B8975A' }} />
      <h3 className="font-serif text-sm font-semibold uppercase tracking-widest text-white">{title}</h3>
      <div className="flex-1 h-px ml-2" style={{ backgroundColor: 'rgba(184,151,90,0.3)' }} />
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  half = false,
  hasError = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  half?: boolean
  hasError?: boolean
}) {
  return (
    <div className={half ? 'flex-1 min-w-0' : 'w-full'}>
      <label className="block font-sans text-xs uppercase tracking-widest mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
        {label}
        {hasError && <span className="ml-1.5 normal-case tracking-normal" style={{ color: '#E07070' }}>Required</span>}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 font-sans text-sm text-white placeholder-white/20 outline-none focus:ring-1 focus:ring-[#B8975A]"
        style={{
          backgroundColor: 'rgba(255,255,255,0.06)',
          border: hasError ? '1px solid rgba(224,112,112,0.7)' : '1px solid rgba(255,255,255,0.12)',
        }}
      />
    </div>
  )
}

function TextArea({
  label,
  value,
  onChange,
  placeholder = '',
  rows = 3,
  hasError = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
  hasError?: boolean
}) {
  return (
    <div className="w-full">
      <label className="block font-sans text-xs uppercase tracking-widest mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
        {label}
        {hasError && <span className="ml-1.5 normal-case tracking-normal" style={{ color: '#E07070' }}>Required</span>}
      </label>
      <textarea
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 font-sans text-sm text-white placeholder-white/20 outline-none focus:ring-1 focus:ring-[#B8975A] resize-none"
        style={{
          backgroundColor: 'rgba(255,255,255,0.06)',
          border: hasError ? '1px solid rgba(224,112,112,0.7)' : '1px solid rgba(255,255,255,0.12)',
        }}
      />
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

// ── Validation ────────────────────────────────────────────────────────────────

type TopLevelField = keyof Omit<TrainingProposalForm, 'nominees'>
type NomineeField  = keyof Omit<Nominee, 'id'>

const TOP_LEVEL_FIELDS: { key: TopLevelField; label: string }[] = [
  { key: 'submitterName',        label: 'Name'                  },
  { key: 'submitterDesignation', label: 'Designation'           },
  { key: 'department',           label: 'Department'            },
  { key: 'unit',                 label: 'Unit'                  },
  { key: 'subject',              label: 'Subject / Course Title' },
  { key: 'dayTime',              label: 'Day & Time'            },
  { key: 'venue',                label: 'Venue'                 },
  { key: 'trainingFee',          label: 'Training Fee'          },
  { key: 'details',              label: 'Course Details'        },
]

const NOMINEE_FIELDS: { key: NomineeField; label: string }[] = [
  { key: 'proposedNo',    label: 'Ref No.'        },
  { key: 'name',          label: 'Name'           },
  { key: 'designation',   label: 'Designation'    },
  { key: 'trainingLevel', label: 'Training Level' },
]

interface ValidationErrors {
  fields: Set<TopLevelField>
  nominees: Record<number, Set<NomineeField>>   // keyed by nominee id
}

function validate(form: TrainingProposalForm): ValidationErrors {
  const fields = new Set<TopLevelField>()
  TOP_LEVEL_FIELDS.forEach(({ key }) => {
    if (!form[key].trim()) fields.add(key)
  })

  const nominees: Record<number, Set<NomineeField>> = {}
  form.nominees.forEach((n) => {
    const missing = new Set<NomineeField>()
    NOMINEE_FIELDS.forEach(({ key }) => {
      if (!n[key].trim()) missing.add(key)
    })
    if (missing.size > 0) nominees[n.id] = missing
  })

  return { fields, nominees }
}

function hasErrors(errors: ValidationErrors) {
  return errors.fields.size > 0 || Object.keys(errors.nominees).length > 0
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function TrainingProposal() {
  const [form,      setForm]      = useState<TrainingProposalForm>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [errors,    setErrors]    = useState<ValidationErrors>({ fields: new Set(), nominees: {} })
  const [touched,   setTouched]   = useState(false)

  // Generic top-level field updater — re-validates if user has already tried submitting
  const setField = <K extends keyof TrainingProposalForm>(key: K, value: TrainingProposalForm[K]) =>
    setForm((f) => {
      const updated = { ...f, [key]: value }
      if (touched) setErrors(validate(updated))
      return updated
    })

  // Nominee helpers
  const updateNominee = (id: number, field: keyof Omit<Nominee, 'id'>, value: string) =>
    setForm((f) => {
      const updated = { ...f, nominees: f.nominees.map((n) => (n.id === id ? { ...n, [field]: value } : n)) }
      if (touched) setErrors(validate(updated))
      return updated
    })

  const addNominee = () =>
    setForm((f) => {
      const updated = { ...f, nominees: [...f.nominees, { id: Date.now(), ...EMPTY_NOMINEE }] }
      if (touched) setErrors(validate(updated))
      return updated
    })

  const removeNominee = (id: number) =>
    setForm((f) => {
      const updated = { ...f, nominees: f.nominees.filter((n) => n.id !== id) }
      if (touched) setErrors(validate(updated))
      return updated
    })

  const handleSubmit = () => {
    setTouched(true)
    const errs = validate(form)
    if (hasErrors(errs)) {
      setErrors(errs)
      return
    }
    // In a real app, POST to your API here
    setForm(INITIAL_FORM)
    setErrors({ fields: new Set(), nominees: {} })
    setTouched(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="p-6 min-h-full" style={{ backgroundColor: '#1A2E55' }}>

      {/* ── Page header ── */}
      <div
        className="flex items-start justify-between mb-6 pb-5"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
      >
        <div>
          <h2 className="font-serif text-xl font-bold text-white">Non-Technical Training Proposal</h2>
          <p className="font-sans text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Complete all fields and submit for manager approval
          </p>
        </div>

        {/* Download button */}
        <a
          href="/documents/Nontechnical_Training_Proposal.doc"
          download="Nontechnical_Training_Proposal.doc"
          className="flex items-center gap-2 px-4 py-2 font-sans text-xs font-semibold transition-opacity hover:opacity-80 flex-shrink-0"
          style={{ border: '1px solid rgba(184,151,90,0.5)', color: '#B8975A' }}
        >
          <Download className="w-3.5 h-3.5" />
          Download Form
        </a>
      </div>

      <div className="max-w-3xl space-y-6">

        {/* ── Section 1: Submitter Info ── */}
        <div
          className="p-5"
          style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <SectionTitle icon={User} title="Submitter Information" />
          <div className="space-y-4">
            <div className="flex gap-4">
              <Field
                label="Name"
                value={form.submitterName}
                onChange={(v) => setField('submitterName', v)}
                placeholder="Your full name"
                half
                hasError={errors.fields.has('submitterName')}
              />
              <Field
                label="Designation"
                value={form.submitterDesignation}
                onChange={(v) => setField('submitterDesignation', v)}
                placeholder="Your job title"
                half
                hasError={errors.fields.has('submitterDesignation')}
              />
            </div>
            <div className="flex gap-4">
              <Field
                label="Department"
                value={form.department}
                onChange={(v) => setField('department', v)}
                placeholder="e.g. Food & Beverage"
                half
                hasError={errors.fields.has('department')}
              />
              <Field
                label="Unit"
                value={form.unit}
                onChange={(v) => setField('unit', v)}
                placeholder="e.g. Kitchen"
                half
                hasError={errors.fields.has('unit')}
              />
            </div>
          </div>
        </div>

        {/* ── Section 2: Nominees ── */}
        <div
          className="p-5"
          style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <SectionTitle icon={User} title="Proposed Nominees" />

          {/* Table header */}
          <div
            className="hidden md:grid grid-cols-[40px_80px_1fr_1fr_1fr] gap-3 px-3 py-2 mb-2 font-sans text-xs uppercase tracking-widest"
            style={{ color: 'rgba(255,255,255,0.35)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span>#</span>
            <span>Ref No.</span>
            <span>Full Name</span>
            <span>Designation</span>
            <span>Training Level</span>
          </div>

          {/* Nominee rows */}
          <div className="space-y-2">
            {form.nominees.map((nominee, idx) => {
              const nomineeErrors = errors.nominees[nominee.id] ?? new Set<NomineeField>()
              return (
                <div
                  key={nominee.id}
                  className="grid grid-cols-[40px_80px_1fr_1fr_1fr_32px] gap-3 items-center px-3 py-2"
                  style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <span className="font-sans text-xs text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {idx + 1}
                  </span>
                  {(
                    [
                      { field: 'proposedNo'    as NomineeField, placeholder: 'Ref'            },
                      { field: 'name'          as NomineeField, placeholder: 'Employee name'  },
                      { field: 'designation'   as NomineeField, placeholder: 'Job title'      },
                      { field: 'trainingLevel' as NomineeField, placeholder: 'e.g. Beginner'  },
                    ] as const
                  ).map(({ field, placeholder }) => (
                    <input
                      key={field}
                      value={nominee[field]}
                      onChange={(e) => updateNominee(nominee.id, field, e.target.value)}
                      placeholder={placeholder}
                      className="w-full px-2 py-1.5 font-sans text-xs text-white placeholder-white/20 outline-none"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        border: nomineeErrors.has(field)
                          ? '1px solid rgba(224,112,112,0.7)'
                          : '1px solid rgba(255,255,255,0.1)',
                      }}
                    />
                  ))}
                  <button
                    onClick={() => form.nominees.length > 1 && removeNominee(nominee.id)}
                    disabled={form.nominees.length === 1}
                    className="flex items-center justify-center w-7 h-7 transition-opacity"
                    style={{ color: form.nominees.length === 1 ? 'rgba(255,255,255,0.1)' : 'rgba(224,112,112,0.7)' }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )
            })}
          </div>

          <button
            onClick={addNominee}
            className="flex items-center gap-2 mt-3 px-3 py-1.5 font-sans text-xs transition-opacity hover:opacity-80"
            style={{ color: '#B8975A', border: '1px dashed rgba(184,151,90,0.4)' }}
          >
            <Plus className="w-3 h-3" />
            Add Nominee
          </button>
        </div>

        {/* ── Section 3: Course Details ── */}
        <div
          className="p-5"
          style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <SectionTitle icon={BookOpen} title="Seminar / Course Details" />
          <div className="space-y-4">
            <Field
              label="Subject / Course Title"
              value={form.subject}
              onChange={(v) => setField('subject', v)}
              placeholder="e.g. Customer Service Excellence"
              hasError={errors.fields.has('subject')}
            />
            <div className="flex gap-4">
              <Field
                label="Day & Time"
                value={form.dayTime}
                onChange={(v) => setField('dayTime', v)}
                placeholder="e.g. Monday, 9:00 AM – 5:00 PM"
                half
                hasError={errors.fields.has('dayTime')}
              />
              <Field
                label="Venue"
                value={form.venue}
                onChange={(v) => setField('venue', v)}
                placeholder="e.g. Training Room A"
                half
                hasError={errors.fields.has('venue')}
              />
            </div>
            <Field
              label="Training Fee / Cost (SGD)"
              value={form.trainingFee}
              onChange={(v) => setField('trainingFee', v)}
              placeholder="e.g. 500.00"
              hasError={errors.fields.has('trainingFee')}
            />
            <TextArea
              label="Details of Seminar / Course"
              value={form.details}
              onChange={(v) => setField('details', v)}
              placeholder="Describe the course content, objectives, and expected outcomes…"
              rows={4}
              hasError={errors.fields.has('details')}
            />
          </div>
        </div>

        {/* ── Approval note ── */}
        <div
          className="px-5 py-3 font-sans text-xs"
          style={{
            backgroundColor: 'rgba(184,151,90,0.08)',
            border:           '1px solid rgba(184,151,90,0.25)',
            borderLeft:       '3px solid #B8975A',
            color:            'rgba(255,255,255,0.55)',
          }}
        >
          After submission, this proposal will be routed to your Department Head for approval,
          followed by the Manager / Works Director, and receipted by Human Resources.
        </div>

        {/* ── Error summary ── */}
        {touched && hasErrors(errors) && (
          <div
            className="px-5 py-3 font-sans text-xs"
            style={{
              backgroundColor: 'rgba(224,112,112,0.08)',
              border:           '1px solid rgba(224,112,112,0.3)',
              borderLeft:       '3px solid #E07070',
              color:            'rgba(255,255,255,0.7)',
            }}
          >
            Please fill in all required fields highlighted above before submitting.
          </div>
        )}

        {/* ── Actions ── */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => {
              setForm(INITIAL_FORM)
              setErrors({ fields: new Set(), nominees: {} })
              setTouched(false)
            }}
            className="font-sans text-xs transition-colors hover:text-white"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            Clear form
          </button>
          <div className="flex items-center gap-3">
            {submitted && (
              <span className="font-sans text-xs" style={{ color: '#B8975A' }}>
                ✓ Proposal submitted successfully
              </span>
            )}
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 font-sans text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#B8975A', color: '#fff' }}
            >
              Submit Proposal
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}