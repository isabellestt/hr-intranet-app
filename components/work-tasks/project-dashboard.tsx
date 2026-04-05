'use client'

import { useState } from 'react'
import { Plus, Clock, X, ChevronRight } from 'lucide-react'

interface Project {
  id: number
  name: string
  deadline: string
  progress: number
  status: 'On Track' | 'In Progress' | 'At Risk'
}

const projectsData: Project[] = [
  { id: 1, name: 'Project ABC', deadline: '30 April 2026',  progress: 94, status: 'On Track'   },
  { id: 2, name: 'Project ABB', deadline: '10 May 2026',    progress: 88, status: 'On Track'   },
  { id: 3, name: 'Project CDB', deadline: '22 May 2026',    progress: 75, status: 'In Progress' },
]

const STATUS_STYLES: Record<Project['status'], { bar: string; badge: string; text: string }> = {
  'On Track':    { bar: '#B8975A', badge: 'rgba(184,151,90,0.15)',  text: '#B8975A' },
  'In Progress': { bar: '#B8D4E8', badge: 'rgba(184,212,232,0.15)', text: '#B8D4E8' },
  'At Risk':     { bar: '#E07070', badge: 'rgba(224,112,112,0.15)', text: '#E07070' },
}

function ProgressBar({ value, active }: { value: number; active: boolean }) {
  return (
    <div className="w-full h-1 rounded-none overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
      <div
        className="h-full transition-all duration-500"
        style={{
          width: `${value}%`,
          backgroundColor: active ? 'rgba(255,255,255,0.9)' : '#B8975A',
        }}
      />
    </div>
  )
}

function AddProjectModal({
  onClose,
  onAdd,
}: {
  onClose: () => void
  onAdd: (p: Project) => void
}) {
  const [name, setName]         = useState('')
  const [deadline, setDeadline] = useState('')
  const [progress, setProgress] = useState(0)

  const handleAdd = () => {
    if (!name.trim() || !deadline) return
    onAdd({
      id:       Date.now(),
      name:     name.trim(),
      deadline: deadline || 'TBD',
      progress: Math.min(100, Math.max(0, progress)),
      status:   'In Progress',
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="w-full max-w-md" style={{ backgroundColor: '#0F1D38', borderTop: '3px solid #B8975A' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <h3 className="font-serif text-white text-lg font-semibold">New Project</h3>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {[
            { label: 'Project Name', value: name,                 setter: setName,     type: 'text',   placeholder: 'e.g. Project XYZ' },
            { label: 'Deadline',     value: deadline,             setter: setDeadline, type: 'text',   placeholder: 'e.g. 30 June 2026' },
          ].map(({ label, value, setter, type, placeholder }) => (
            <div key={label}>
              <label className="block font-sans text-xs uppercase tracking-widest mb-2" style={{ color: '#B8975A' }}>
                {label}
              </label>
              <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="w-full px-4 py-2.5 font-sans text-sm text-white placeholder-white/30 outline-none focus:ring-1"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border:          '1px solid rgba(255,255,255,0.12)',
                  borderRadius:    0,
                }}
              />
            </div>
          ))}
          <div>
            <label className="block font-sans text-xs uppercase tracking-widest mb-2" style={{ color: '#B8975A' }}>
              % Complete
            </label>
            <input
              type="number"
              min={0}
              max={100}
              placeholder="0 – 100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full px-4 py-2.5 font-sans text-sm text-white placeholder-white/30 outline-none"
              style={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                border:          '1px solid rgba(255,255,255,0.12)',
                borderRadius:    0,
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex justify-end gap-3 px-6 py-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <button
            onClick={onClose}
            className="px-5 py-2 font-sans text-sm text-white/70 hover:text-white transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-5 py-2 font-sans text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#B8975A', color: '#fff' }}
          >
            Add Project
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ProjectDashboard() {
  const [projects,  setProjects]  = useState<Project[]>(projectsData)
  const [selected,  setSelected]  = useState<Project>(projectsData[0])
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="p-6 min-h-full" style={{ backgroundColor: '#1A2E55' }}>

      {/* Header */}
      <div className="flex items-end justify-between mb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.25rem' }}>
        <div>
          <h2 className="font-serif text-xl font-bold text-white">Projects</h2>
          <p className="font-sans text-xs mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {projects.length} active project{projects.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 font-sans text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#B8975A', color: '#fff' }}
        >
          <Plus className="w-3.5 h-3.5" />
          New Project
        </button>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-5 items-start">

        {/* Project list */}
        <div className="flex-1 space-y-3">
          {projects.map((p) => {
            const sc     = STATUS_STYLES[p.status]
            const active = selected?.id === p.id

            return (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className="w-full text-left px-5 py-4 transition-all duration-200"
                style={{
                  backgroundColor: active ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)',
                  border:          active ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(255,255,255,0.08)',
                  borderLeft:      active ? '3px solid #B8975A' : '3px solid transparent',
                }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-serif font-semibold text-white text-sm">{p.name}</p>
                    <p className="font-sans text-xs flex items-center gap-1 mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      <Clock className="w-3 h-3" />
                      {p.deadline}
                    </p>
                  </div>
                  <span
                    className="font-serif text-2xl leading-none"
                    style={{ color: active ? '#fff' : '#B8975A' }}
                  >
                    {p.progress}%
                  </span>
                </div>

                <ProgressBar value={p.progress} active={active} />

                {/* Status badge */}
                <span
                  className="inline-block mt-2.5 font-sans text-xs uppercase tracking-widest px-2.5 py-0.5"
                  style={{ backgroundColor: sc.badge, color: sc.text }}
                >
                  {p.status}
                </span>
              </button>
            )
          })}

          {projects.length === 0 && (
            <div className="flex flex-col items-center py-16 gap-2">
              <p className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
                No projects available
              </p>
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div
            className="w-64 flex-shrink-0 p-5"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <p className="font-sans text-xs uppercase tracking-widest mb-2" style={{ color: '#B8975A' }}>
              Selected
            </p>
            <h3 className="font-serif text-white text-lg font-semibold mb-3 leading-snug">
              {selected.name}
            </h3>
            <div className="w-8 h-px mb-4" style={{ backgroundColor: '#B8975A' }} />

            <div className="grid grid-cols-2 gap-4 mb-5">
              {[
                { label: 'Deadline',   value: selected.deadline },
                { label: 'Status',     value: selected.status   },
                { label: 'Complete',   value: `${selected.progress}%` },
                { label: 'Remaining',  value: `${100 - selected.progress}%` },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-sans text-xs uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {label}
                  </p>
                  <p className="font-serif text-white text-sm font-semibold">{value}</p>
                </div>
              ))}
            </div>

            <p className="font-sans text-xs uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Progress
            </p>
            <div className="w-full h-1.5 overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <div
                className="h-full transition-all duration-500"
                style={{ width: `${selected.progress}%`, backgroundColor: '#B8975A' }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>0%</span>
              <span className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>100%</span>
            </div>

            <button
              className="w-full mt-5 flex items-center justify-center gap-2 py-2.5 font-sans text-xs uppercase tracking-widest transition-opacity hover:opacity-80"
              style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)' }}
            >
              View Details
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <AddProjectModal
          onClose={() => setShowModal(false)}
          onAdd={(p) => setProjects((prev) => [...prev, p])}
        />
      )}
    </div>
  )
}