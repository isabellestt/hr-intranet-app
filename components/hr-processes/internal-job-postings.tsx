'use client'

import { useState, useMemo } from 'react'
import { MapPin, Clock, Briefcase, ChevronRight, X, Search, Filter, Send, CheckCircle2 } from 'lucide-react'
import { jobPostings, type JobPosting, type JobStatus, type JobDepartment } from '@/lib/mock-data'

// ── Config ────────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<JobStatus, { bg: string; text: string }> = {
  'Open':          { bg: 'rgba(76,175,80,0.15)',  text: '#4CAF50' },
  'Closing Soon':  { bg: 'rgba(184,151,90,0.15)', text: '#B8975A' },
  'Closed':        { bg: 'rgba(255,255,255,0.08)', text: 'rgba(255,255,255,0.3)' },
}

const ALL_DEPARTMENTS: JobDepartment[] = [
  'Food & Beverage', 'Front Office', 'Housekeeping', 'HR', 'Finance', 'Sales', 'Kitchen',
]

// ── Application Modal ─────────────────────────────────────────────────────────

function ApplyModal({ job, onClose }: { job: JobPosting; onClose: () => void }) {
  const [step,       setStep]       = useState<1 | 2>(1)
  const [name,       setName]       = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [dept,       setDept]       = useState('')
  const [yearsExp,   setYearsExp]   = useState('')
  const [motivation, setMotivation] = useState('')
  const [submitted,  setSubmitted]  = useState(false)
  const [errors,     setErrors]     = useState<Record<string, boolean>>({})

  const validateStep1 = () => {
    const e: Record<string, boolean> = {}
    if (!name.trim())       e.name       = true
    if (!employeeId.trim()) e.employeeId = true
    if (!dept.trim())       e.dept       = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateStep2 = () => {
    const e: Record<string, boolean> = {}
    if (!yearsExp.trim())   e.yearsExp   = true
    if (!motivation.trim()) e.motivation = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => { if (validateStep1()) setStep(2) }
  const handleSubmit = () => { if (validateStep2()) setSubmitted(true) }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="w-full max-w-lg" style={{ backgroundColor: '#0F1D38', borderTop: '3px solid #B8975A' }}>

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div>
            <p className="font-sans text-xs uppercase tracking-widest mb-1" style={{ color: '#B8975A' }}>Internal Application</p>
            <h3 className="font-serif text-lg font-semibold text-white">{job.title}</h3>
            <p className="font-sans text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{job.department}</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors mt-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center py-12 px-6 text-center">
            <CheckCircle2 className="w-12 h-12 mb-4" style={{ color: '#4CAF50' }} />
            <h4 className="font-serif text-lg font-semibold text-white mb-2">Application Submitted</h4>
            <p className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Your application for <strong className="text-white">{job.title}</strong> has been received.
              HR will review and contact you within 5 working days.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-5 py-2 font-sans text-xs font-semibold"
              style={{ backgroundColor: '#B8975A', color: '#fff' }}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Step indicator */}
            <div className="flex px-6 pt-5 gap-3 mb-5">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div
                    className="w-5 h-5 flex items-center justify-center font-sans text-xs font-semibold flex-shrink-0"
                    style={{
                      backgroundColor: step >= s ? '#B8975A' : 'rgba(255,255,255,0.08)',
                      color:           step >= s ? '#fff'    : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {s}
                  </div>
                  <span className="font-sans text-xs" style={{ color: step >= s ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)' }}>
                    {s === 1 ? 'Your Details' : 'Your Application'}
                  </span>
                </div>
              ))}
            </div>

            <div className="px-6 pb-6 space-y-4">
              {step === 1 ? (
                <>
                  {[
                    { label: 'Full Name',       key: 'name',       value: name,       setter: setName,       placeholder: 'Your full name'     },
                    { label: 'Employee ID',     key: 'employeeId', value: employeeId, setter: setEmployeeId, placeholder: 'e.g. 01432846'      },
                    { label: 'Current Department', key: 'dept',    value: dept,       setter: setDept,       placeholder: 'e.g. Front Office'  },
                  ].map(({ label, key, value, setter, placeholder }) => (
                    <div key={key}>
                      <label className="block font-sans text-xs uppercase tracking-widest mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {label}
                        {errors[key] && <span className="ml-2 normal-case tracking-normal" style={{ color: '#E07070' }}>Required</span>}
                      </label>
                      <input
                        type="text"
                        value={value}
                        placeholder={placeholder}
                        onChange={(e) => setter(e.target.value)}
                        className="w-full px-3 py-2 font-sans text-sm text-white placeholder-white/20 outline-none"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.06)',
                          border: errors[key] ? '1px solid rgba(224,112,112,0.7)' : '1px solid rgba(255,255,255,0.12)',
                        }}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Years of Relevant Experience
                      {errors.yearsExp && <span className="ml-2 normal-case tracking-normal" style={{ color: '#E07070' }}>Required</span>}
                    </label>
                    <input
                      type="text"
                      value={yearsExp}
                      placeholder="e.g. 3 years"
                      onChange={(e) => setYearsExp(e.target.value)}
                      className="w-full px-3 py-2 font-sans text-sm text-white placeholder-white/20 outline-none"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        border: errors.yearsExp ? '1px solid rgba(224,112,112,0.7)' : '1px solid rgba(255,255,255,0.12)',
                      }}
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Why are you applying for this role?
                      {errors.motivation && <span className="ml-2 normal-case tracking-normal" style={{ color: '#E07070' }}>Required</span>}
                    </label>
                    <textarea
                      value={motivation}
                      placeholder="Describe your motivation and relevant experience…"
                      rows={4}
                      onChange={(e) => setMotivation(e.target.value)}
                      className="w-full px-3 py-2 font-sans text-sm text-white placeholder-white/20 outline-none resize-none"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        border: errors.motivation ? '1px solid rgba(224,112,112,0.7)' : '1px solid rgba(255,255,255,0.12)',
                      }}
                    />
                  </div>
                </>
              )}

              <div className="flex justify-between pt-2">
                {step === 2 ? (
                  <button
                    onClick={() => setStep(1)}
                    className="font-sans text-xs transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                  >
                    ← Back
                  </button>
                ) : <div />}
                <button
                  onClick={step === 1 ? handleNext : handleSubmit}
                  className="flex items-center gap-2 px-5 py-2 font-sans text-xs font-semibold transition-opacity hover:opacity-80"
                  style={{ backgroundColor: '#B8975A', color: '#fff' }}
                >
                  {step === 1 ? <>Next <ChevronRight className="w-3 h-3" /></> : <><Send className="w-3 h-3" /> Submit</>}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ── Job Detail Panel ──────────────────────────────────────────────────────────

function JobDetail({ job, onApply, onClose }: { job: JobPosting; onApply: () => void; onClose: () => void }) {
  const sc = STATUS_CONFIG[job.status]

  return (
    <div className="flex-1 min-w-0" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>

      {/* Detail header */}
      <div className="flex items-start justify-between p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className="font-sans text-xs uppercase tracking-wider px-2 py-0.5"
              style={{ backgroundColor: sc.bg, color: sc.text }}
            >
              {job.status}
            </span>
            <span className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Closes {job.closingDate}
            </span>
          </div>
          <h3 className="font-serif text-xl font-semibold text-white mb-1">{job.title}</h3>
          <div className="flex items-center flex-wrap gap-3 font-sans text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.department}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.type}</span>
          </div>
        </div>
        <button onClick={onClose} className="flex-shrink-0 text-white/30 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Detail body */}
      <div className="p-5 space-y-5 overflow-y-auto" style={{ maxHeight: 420 }}>
        <div>
          <p className="font-sans text-xs uppercase tracking-widest mb-2" style={{ color: '#B8975A' }}>About the Role</p>
          <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {job.description}
          </p>
        </div>
        <div>
          <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: '#B8975A' }}>Requirements</p>
          <ul className="space-y-2">
            {job.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-3 font-sans text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                <span className="flex-shrink-0 mt-1 w-1 h-1 rounded-full" style={{ backgroundColor: '#B8975A' }} />
                {req}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Detail footer */}
      {job.status !== 'Closed' && (
        <div className="p-5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={onApply}
            className="w-full flex items-center justify-center gap-2 py-3 font-sans text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#B8975A', color: '#fff' }}
          >
            <Send className="w-4 h-4" /> Apply for this Role
          </button>
          <p className="font-sans text-xs text-center mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Your application will be reviewed by HR
          </p>
        </div>
      )}
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function InternalJobPostings() {
  const [selectedJob,      setSelectedJob]      = useState<JobPosting | null>(jobPostings[0])
  const [applyingTo,       setApplyingTo]       = useState<JobPosting | null>(null)
  const [search,           setSearch]           = useState('')
  const [selectedDept,     setSelectedDept]     = useState<JobDepartment | 'All'>('All')
  const [selectedStatus,   setSelectedStatus]   = useState<JobStatus | 'All'>('All')
  const [showFilters,      setShowFilters]      = useState(false)

  const filtered = useMemo(() =>
    jobPostings.filter((j) => {
      const matchSearch = search === '' || j.title.toLowerCase().includes(search.toLowerCase()) || j.department.toLowerCase().includes(search.toLowerCase())
      const matchDept   = selectedDept === 'All'   || j.department === selectedDept
      const matchStatus = selectedStatus === 'All' || j.status === selectedStatus
      return matchSearch && matchDept && matchStatus
    }),
    [search, selectedDept, selectedStatus]
  )

  return (
    <div className="p-6 min-h-full" style={{ backgroundColor: '#1A2E55' }}>

      {/* Header */}
      <div className="flex items-end justify-between mb-6 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div>
          <h2 className="font-serif text-xl font-bold text-white">Internal Job Postings</h2>
          <p className="font-sans text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {jobPostings.filter((j) => j.status !== 'Closed').length} open positions · Internal applicants only
          </p>
        </div>
      </div>

      {/* Search & filters */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 flex items-center gap-2 px-3 py-2" style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <Search className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }} />
          <input
            type="text"
            placeholder="Search roles or departments…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent font-sans text-sm text-white placeholder-white/25 outline-none"
          />
        </div>
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="flex items-center gap-2 px-3 py-2 font-sans text-xs transition-all"
          style={{
            backgroundColor: showFilters ? 'rgba(184,151,90,0.12)' : 'rgba(255,255,255,0.06)',
            border:           showFilters ? '1px solid rgba(184,151,90,0.4)' : '1px solid rgba(255,255,255,0.12)',
            color:            showFilters ? '#B8975A' : 'rgba(255,255,255,0.5)',
          }}
        >
          <Filter className="w-3.5 h-3.5" /> Filters
        </button>
      </div>

      {/* Filter dropdowns */}
      {showFilters && (
        <div className="flex gap-3 mb-4 flex-wrap">
          <div>
            <label className="block font-sans text-xs uppercase tracking-widest mb-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Department</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value as JobDepartment | 'All')}
              className="px-3 py-2 font-sans text-xs text-white outline-none"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <option value="All">All Departments</option>
              {ALL_DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-sans text-xs uppercase tracking-widest mb-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as JobStatus | 'All')}
              className="px-3 py-2 font-sans text-xs text-white outline-none"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <option value="All">All Statuses</option>
              {(['Open', 'Closing Soon', 'Closed'] as JobStatus[]).map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* Two-column layout */}
      <div className="flex gap-4 items-start">

        {/* Job list */}
        <div className="w-72 flex-shrink-0 space-y-2">
          {filtered.length === 0 ? (
            <p className="font-sans text-sm py-8 text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>
              No roles match your search
            </p>
          ) : (
            filtered.map((job) => {
              const sc     = STATUS_CONFIG[job.status]
              const active = selectedJob?.id === job.id

              return (
                <button
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="w-full text-left px-4 py-3.5 transition-all"
                  style={{
                    backgroundColor: active ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
                    border:          active ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.07)',
                    borderLeft:      active ? '3px solid #B8975A' : '3px solid transparent',
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <p className="font-sans text-sm font-semibold text-white leading-snug">{job.title}</p>
                    <span
                      className="flex-shrink-0 font-sans text-xs px-2 py-0.5 uppercase tracking-wider"
                      style={{ backgroundColor: sc.bg, color: sc.text }}
                    >
                      {job.status}
                    </span>
                  </div>
                  <p className="font-sans text-xs flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    <Briefcase className="w-3 h-3" />{job.department}
                  </p>
                  <p className="font-sans text-xs mt-1 flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    <Clock className="w-3 h-3" />Closes {job.closingDate}
                  </p>
                </button>
              )
            })
          )}
        </div>

        {/* Detail panel */}
        {selectedJob ? (
          <JobDetail
            job={selectedJob}
            onApply={() => setApplyingTo(selectedJob)}
            onClose={() => setSelectedJob(null)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center py-20" style={{ border: '1px dashed rgba(255,255,255,0.1)' }}>
            <p className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Select a role to view details
            </p>
          </div>
        )}
      </div>

      {/* Application modal */}
      {applyingTo && (
        <ApplyModal
          job={applyingTo}
          onClose={() => setApplyingTo(null)}
        />
      )}
    </div>
  )
}