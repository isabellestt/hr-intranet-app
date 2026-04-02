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
    <div className="p-6 min-h-full" style={{ backgroundColor: '#1A2E55' }}>
      <h2 className="font-serif text-xl font-bold text-white mb-6">HR Policy Library</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl">
        {policies.map(({ label, icon: Icon, desc }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-3 p-5 rounded-xl text-center transition-all hover:-translate-y-0.5 hover:shadow-lg group"
            style={{ backgroundColor: '#B8D4E8' }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
              style={{ backgroundColor: '#1A2E55' }}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-serif text-sm font-bold text-[#1A2E55] text-balance leading-tight">{label}</div>
              <div className="text-[11px] text-[#1A2E55]/70 font-sans mt-1">{desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
