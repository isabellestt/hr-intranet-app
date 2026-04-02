'use client'

import { FileText, Clock, DollarSign, Shield, Heart, TrendingUp } from 'lucide-react'

const policies = [
  { label: 'Employment Policies', icon: FileText, desc: 'Hiring, contracts & workplace standards' },
  { label: 'Leave & Time-Off Policies', icon: Clock, desc: 'Annual, medical, and special leave' },
  { label: 'Compensation & Benefits', icon: DollarSign, desc: 'Salary structure & allowances' },
  { label: 'Code of Conduct', icon: Shield, desc: 'Standards of behaviour & ethics' },
  { label: 'Health, Safety & Wellbeing', icon: Heart, desc: 'Workplace safety guidelines' },
  { label: 'Performance & Career', icon: TrendingUp, desc: 'Reviews, growth & development' },
]

export default function HRPolicyLibrary() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <h2 className="font-serif text-xl font-semibold text-[#1B2A4A]">Policy Library</h2>
        <div className="flex-1 h-px bg-[#B8975A] max-w-[60px]" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {policies.map(({ label, icon: Icon, desc }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-4 p-8 bg-white border border-[#E5E5E5] hover:border-[#B8975A] hover:shadow-md transition-all text-center group"
          >
            <Icon className="w-7 h-7 text-[#1B2A4A] group-hover:text-[#B8975A] transition-colors" />
            <div>
              <div className="font-serif text-base font-semibold text-[#1B2A4A] mb-1">{label}</div>
              <div className="text-xs text-[#666] font-sans">{desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
