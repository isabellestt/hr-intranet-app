'use client'

import { Heart, Smile, Shield } from 'lucide-react'

const benefits = [
  {
    category: 'Medical',
    icon: Heart,
    items: [
      { name: 'Comprehensive Health Insurance', details: 'Full inpatient and outpatient coverage for employee and up to 3 dependents.' },
      { name: 'Dental Coverage', details: 'Annual dental benefit of AED 2,000 per employee for routine and corrective procedures.' },
      { name: 'Optical Coverage', details: 'Annual optical benefit of AED 800 for glasses, contact lenses, and eye exams.' },
    ],
  },
  {
    category: 'Financial',
    icon: Shield,
    items: [
      { name: 'Life Insurance', details: 'Coverage equivalent to 24 months\' basic salary in the event of death or permanent disability.' },
      { name: 'Service Charge Distribution', details: 'Monthly distribution of hotel service charges shared among all Ladies and Gentlemen.' },
      { name: 'Air Ticket Allowance', details: 'Annual round-trip economy class air ticket to home country for employee and immediate family.' },
    ],
  },
  {
    category: 'Lifestyle',
    icon: Smile,
    items: [
      { name: 'Hotel Discounts', details: 'Up to 30% discount on accommodation at Marriott International properties worldwide.' },
      { name: 'F&B Discounts', details: '20% discount on food and beverage at all Ritz-Carlton outlets (not during peak periods).' },
      { name: 'Employee Meals', details: 'Complimentary meals provided during shift hours at the Ladies & Gentlemen restaurant.' },
    ],
  },
]

export default function BenefitsPolicies() {
  return (
    <div className="p-6 min-h-full" style={{ backgroundColor: '#1A2E55' }}>
      <h2 className="font-serif text-xl font-bold text-white mb-6">Benefits Policies</h2>
      <div className="space-y-8 max-w-3xl">
        {benefits.map(({ category, icon: Icon, items }) => (
          <div key={category}>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#B8D4E8' }}
              >
                <Icon className="w-4 h-4" style={{ color: '#1A2E55' }} />
              </div>
              <h3 className="font-serif text-base font-bold text-white">{category} Benefits</h3>
            </div>
            <div className="space-y-3">
              {items.map(({ name, details }) => (
                <div key={name} className="rounded-lg p-4" style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}>
                  <div className="font-sans font-semibold text-white text-sm">{name}</div>
                  <div className="font-sans text-white/70 text-xs mt-1 leading-relaxed">{details}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
