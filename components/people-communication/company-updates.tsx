'use client'

import { useState } from 'react'
import { SlidersHorizontal, X, Plus } from 'lucide-react'
import { companyUpdatesData, type CompanyUpdate } from '@/lib/mock-data'

const CATEGORY_STYLES: Record<CompanyUpdate['category'], { bg: string; text: string }> = {
  Operations:  { bg: 'rgba(184,151,90,0.15)',  text: '#B8975A' },
  Celebration: { bg: 'rgba(184,212,232,0.15)', text: '#B8D4E8' },
  General:     { bg: 'rgba(255,255,255,0.1)',  text: 'rgba(255,255,255,0.6)' },
}

const ALL_CATEGORIES: CompanyUpdate['category'][] = ['Operations', 'Celebration', 'General']

export default function CompanyUpdates() {
  const [updates,        setUpdates]        = useState<CompanyUpdate[]>(companyUpdatesData)
  const [filterOpen,     setFilterOpen]     = useState(false)
  const [activeFilters,  setActiveFilters]  = useState<CompanyUpdate['category'][]>([])
  const [showAddForm,    setShowAddForm]    = useState(false)
  const [newDate,        setNewDate]        = useState('')
  const [newTitle,       setNewTitle]       = useState('')
  const [newCategory,    setNewCategory]    = useState<CompanyUpdate['category']>('General')

  const toggleFilter = (cat: CompanyUpdate['category']) => {
    setActiveFilters((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const filtered = activeFilters.length === 0
    ? updates
    : updates.filter((u) => activeFilters.includes(u.category))

  const handleAdd = () => {
    if (!newTitle.trim() || !newDate.trim()) return
    setUpdates((prev) => [
      { id: Date.now(), date: newDate.trim(), title: newTitle.trim(), category: newCategory },
      ...prev,
    ])
    setNewDate('')
    setNewTitle('')
    setNewCategory('General')
    setShowAddForm(false)
  }

  return (
    <div className="p-6 min-h-full" style={{ backgroundColor: '#1A2E55' }}>

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-serif text-xl font-bold text-white">Company Updates</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddForm((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 font-sans text-xs font-semibold transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#B8975A', color: '#fff' }}
          >
            <Plus className="w-3.5 h-3.5" />
            Add Update
          </button>
          <button
            onClick={() => setFilterOpen((v) => !v)}
            className="p-2 transition-colors"
            style={{
              color:           filterOpen ? '#B8975A' : 'rgba(255,255,255,0.5)',
              backgroundColor: filterOpen ? 'rgba(184,151,90,0.1)' : 'transparent',
              border:          '1px solid rgba(255,255,255,0.1)',
            }}
            title="Filter"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter chips */}
      {filterOpen && (
        <div
          className="flex flex-wrap gap-2 mb-5 p-3"
          style={{
            backgroundColor: 'rgba(255,255,255,0.04)',
            border:           '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <span className="font-sans text-xs self-center mr-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Filter by:
          </span>
          {ALL_CATEGORIES.map((cat) => {
            const active = activeFilters.includes(cat)
            return (
              <button
                key={cat}
                onClick={() => toggleFilter(cat)}
                className="px-3 py-1 font-sans text-xs uppercase tracking-wider transition-all"
                style={{
                  backgroundColor: active ? CATEGORY_STYLES[cat].bg : 'transparent',
                  color:           active ? CATEGORY_STYLES[cat].text : 'rgba(255,255,255,0.4)',
                  border:          `1px solid ${active ? CATEGORY_STYLES[cat].text : 'rgba(255,255,255,0.15)'}`,
                }}
              >
                {cat}
              </button>
            )
          })}
          {activeFilters.length > 0 && (
            <button
              onClick={() => setActiveFilters([])}
              className="px-2 py-1 font-sans text-xs flex items-center gap-1 transition-opacity hover:opacity-70"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>
      )}

      {/* Add form */}
      {showAddForm && (
        <div
          className="mb-5 p-4 space-y-3"
          style={{
            backgroundColor: 'rgba(255,255,255,0.04)',
            border:           '1px solid rgba(184,151,90,0.3)',
            borderLeft:       '3px solid #B8975A',
          }}
        >
          <p className="font-sans text-xs uppercase tracking-widest" style={{ color: '#B8975A' }}>
            New Update
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-sans text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Date
              </label>
              <input
                type="text"
                placeholder="e.g. 1 April"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-3 py-2 font-sans text-sm text-white placeholder-white/25 outline-none"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border:           '1px solid rgba(255,255,255,0.12)',
                }}
              />
            </div>
            <div>
              <label className="block font-sans text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as CompanyUpdate['category'])}
                className="w-full px-3 py-2 font-sans text-sm text-white outline-none"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border:           '1px solid rgba(255,255,255,0.12)',
                }}
              >
                {ALL_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block font-sans text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Title
            </label>
            <input
              type="text"
              placeholder="Update headline"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 font-sans text-sm text-white placeholder-white/25 outline-none"
              style={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                border:           '1px solid rgba(255,255,255,0.12)',
              }}
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-1.5 font-sans text-xs text-white/50 hover:text-white/80 transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.12)' }}
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="px-4 py-1.5 font-sans text-xs font-semibold transition-opacity hover:opacity-80"
              style={{ backgroundColor: '#B8975A', color: '#fff' }}
            >
              Post
            </button>
          </div>
        </div>
      )}

      {/* Updates list */}
      <div className="space-y-2 max-w-3xl">
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <p className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
              No updates match the selected filters
            </p>
          </div>
        ) : (
          filtered.map((update) => {
            const cs = CATEGORY_STYLES[update.category]
            return (
              <div
                key={update.id}
                className="flex items-center gap-5 px-5 py-4 transition-all duration-150 hover:brightness-110"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  border:           '1px solid rgba(255,255,255,0.08)',
                  borderLeft:       '3px solid rgba(255,255,255,0.15)',
                }}
              >
                {/* Date */}
                <div className="flex-shrink-0 w-28 text-right">
                  <span className="font-serif text-base font-semibold text-white">
                    {update.date}
                  </span>
                </div>

                {/* Divider */}
                <div className="w-px h-8 flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />

                {/* Title */}
                <p className="flex-1 font-sans text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  {update.title}
                </p>

                {/* Category badge */}
                <span
                  className="flex-shrink-0 font-sans text-xs uppercase tracking-wider px-2.5 py-0.5"
                  style={{ backgroundColor: cs.bg, color: cs.text }}
                >
                  {update.category}
                </span>
              </div>
            )
          })
        )}
      </div>

      {/* Footer count */}
      {filtered.length > 0 && (
        <p className="font-sans text-xs mt-4" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Showing {filtered.length} of {updates.length} update{updates.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  )
}