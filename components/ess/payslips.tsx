'use client'

import { payslipData } from '@/lib/mock-data'
import { useState } from 'react'
import { X } from 'lucide-react'

export default function Payslips() {
  const [modal, setModal] = useState<{ year: number; month: string } | null>(null)

  return (
    <div>
      {Object.entries(payslipData)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([year, months]) => (
          <div key={year} className="mb-10">
            <div className="flex items-center gap-4 mb-5">
              <span className="font-serif text-lg font-semibold text-[#1B2A4A]">{year}</span>
              <div className="flex-1 h-px bg-[#B8975A]" />
            </div>
            <div className="space-y-2">
              {months.map(month => (
                <div
                  key={month}
                  className="flex items-center justify-between py-3 px-4 bg-white border border-[#E5E5E5] hover:border-[#B8975A] transition-colors"
                >
                  <span className="font-sans text-sm text-[#1A1A1A]">{month}</span>
                  <button
                    onClick={() => setModal({ year: Number(year), month })}
                    className="px-4 py-1.5 border border-[#1B2A4A] text-[#1B2A4A] text-xs font-sans font-medium hover:bg-[#1B2A4A] hover:text-white transition-colors"
                  >
                    Download PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setModal(null)}>
          <div
            className="bg-white shadow-xl p-8 max-w-sm w-full mx-4 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setModal(null)}
              className="absolute top-4 right-4 text-[#888] hover:text-[#1A1A1A]"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-[#E5E5E5]">
                <svg className="w-8 h-8 text-[#1B2A4A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#1B2A4A] mb-1">
                {modal.month} {modal.year}
              </h3>
              <p className="text-xs text-[#888] font-sans mb-6">Payslip &mdash; The Ritz-Carlton</p>
              <div className="bg-[#F5F4F0] p-4 text-left mb-6 space-y-3 text-sm font-sans">
                <div className="flex justify-between">
                  <span className="text-[#666]">Employee</span>
                  <span className="font-medium text-[#1A1A1A]">Karim S. Nasser</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Employee ID</span>
                  <span className="font-mono text-[#1A1A1A]">01432846</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Basic Salary</span>
                  <span className="font-medium text-[#1A1A1A]">AED 12,500.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Housing Allowance</span>
                  <span className="font-medium text-[#1A1A1A]">AED 3,000.00</span>
                </div>
                <div className="flex justify-between border-t border-[#E5E5E5] pt-3 mt-3">
                  <span className="font-semibold text-[#1A1A1A]">Net Pay</span>
                  <span className="font-semibold text-[#1B2A4A]">AED 15,500.00</span>
                </div>
              </div>
              <button
                onClick={() => setModal(null)}
                className="w-full py-3 bg-[#1B2A4A] text-white text-sm font-sans font-medium hover:bg-[#2a3d5c] transition-colors"
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
