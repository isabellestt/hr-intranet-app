'use client'

import { payslipData } from '@/lib/mock-data'
import { useState } from 'react'
import { X } from 'lucide-react'

export default function Payslips() {
  const [modal, setModal] = useState<{ year: number; month: string } | null>(null)

  return (
    <div className="p-6 min-h-full" style={{ backgroundColor: '#1A2E55' }}>
      <h2 className="font-serif text-xl font-bold text-white mb-6">Payslips</h2>

      {Object.entries(payslipData)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([year, months]) => (
          <div key={year} className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-1 bg-white/20" />
              <span className="font-serif text-white font-bold text-base">{year}</span>
              <div className="h-px flex-1 bg-white/20" />
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {months.map(month => (
                <button
                  key={month}
                  onClick={() => setModal({ year: Number(year), month })}
                  className="px-3 py-2 rounded-full text-sm font-semibold font-sans transition-all hover:opacity-90 hover:-translate-y-0.5 active:scale-95 text-[#1A2E55]"
                  style={{ backgroundColor: '#B8D4E8' }}
                >
                  {month.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
        ))}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setModal(null)}>
          <div
            className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full mx-4 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: '#1A2E55' }}
              >
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1A2E55] mb-1">
                {modal.month} {modal.year}
              </h3>
              <p className="text-sm text-gray-500 mb-6">Payslip — The Ritz-Carlton</p>
              <div className="bg-gray-50 rounded-lg p-4 text-left mb-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Employee</span>
                  <span className="font-semibold text-gray-800">Karim S. Nasser</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Employee ID</span>
                  <span className="font-mono text-gray-800">01432846</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Basic Salary</span>
                  <span className="font-semibold text-gray-800">AED 12,500.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Housing Allowance</span>
                  <span className="font-semibold text-gray-800">AED 3,000.00</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="font-bold text-gray-800">Net Pay</span>
                  <span className="font-bold text-[#1A2E55]">AED 15,500.00</span>
                </div>
              </div>
              <button
                onClick={() => setModal(null)}
                className="w-full py-2 rounded-md text-sm font-semibold text-[#1A2E55] transition-all hover:opacity-90"
                style={{ backgroundColor: '#B8D4E8' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
