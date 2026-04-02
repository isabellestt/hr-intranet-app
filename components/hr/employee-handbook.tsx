'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

const tabs = [
  'Our Company',
  'Employment',
  'Remuneration',
  'Benefits',
  'Leave',
  'Training & Development',
  'Employee Communication',
  'Rules & Regulations',
]

const tabContent: Record<string, React.ReactNode> = {
  'Our Company': (
    <div className="space-y-6">
      <section>
        <h3 className="font-serif text-lg font-bold text-white mb-2">Introduction</h3>
        <p className="text-white/80 text-sm font-sans leading-relaxed">
          Welcome to The Ritz-Carlton. This Employee Handbook has been prepared to acquaint you with the policies, procedures, and benefits that are an integral part of your employment. We hope this handbook will answer many of the questions that may arise during your career with us.
        </p>
        <p className="text-white/80 text-sm font-sans leading-relaxed mt-3">
          The Ritz-Carlton is committed to the principles of the Credo and the Gold Standards, which have guided our Ladies and Gentlemen since our founding. These values are at the heart of everything we do and represent the highest level of service excellence in the hospitality industry.
        </p>
      </section>
      <section>
        <h3 className="font-serif text-lg font-bold text-white mb-2">Company Profile</h3>
        <p className="text-white/80 text-sm font-sans leading-relaxed">
          The Ritz-Carlton Hotel Company, L.L.C. is the premier luxury hotel and resort company globally, with more than 100 properties on five continents. The company is owned by Marriott International and based in Chevy Chase, Maryland, USA.
        </p>
        <p className="text-white/80 text-sm font-sans leading-relaxed mt-3">
          Our mission is "We are Ladies and Gentlemen serving Ladies and Gentlemen." This motto exemplifies the anticipatory service provided by all staff members. The Ritz-Carlton Mystique is the ability to anticipate unstated needs of guests and fulfil them in a seamless manner.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[
            { label: 'Founded', value: '1983' },
            { label: 'Properties', value: '100+' },
            { label: 'Countries', value: '30+' },
            { label: 'Ladies & Gentlemen', value: '40,000+' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/10 rounded-lg p-3">
              <div className="text-white/60 text-xs font-sans">{label}</div>
              <div className="text-white font-serif font-bold text-lg">{value}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
  'Employment': (
    <div className="space-y-4">
      <h3 className="font-serif text-lg font-bold text-white">Employment Terms & Conditions</h3>
      <p className="text-white/80 text-sm font-sans leading-relaxed">All employees are engaged under a formal employment contract which details their position, compensation, working hours, and other conditions of service. Employment contracts are governed by applicable UAE Labour Law.</p>
      <h4 className="font-serif text-base font-semibold text-white mt-4">Probation Period</h4>
      <p className="text-white/80 text-sm font-sans leading-relaxed">New employees are subject to a probationary period of three (3) months. During this time, performance will be closely monitored and either party may terminate the contract with appropriate notice.</p>
      <h4 className="font-serif text-base font-semibold text-white mt-4">Working Hours</h4>
      <p className="text-white/80 text-sm font-sans leading-relaxed">Standard working hours are eight (8) hours per day and forty-eight (48) hours per week. Due to the nature of the hospitality industry, shift work and weekend duties may be required. Overtime is compensated in accordance with UAE Labour Law.</p>
    </div>
  ),
  'Remuneration': (
    <div className="space-y-4">
      <h3 className="font-serif text-lg font-bold text-white">Remuneration & Compensation</h3>
      <p className="text-white/80 text-sm font-sans leading-relaxed">The Ritz-Carlton offers a competitive compensation package benchmarked against the luxury hospitality sector. Salaries are reviewed annually as part of the Performance Review process.</p>
      <h4 className="font-serif text-base font-semibold text-white mt-4">Salary Components</h4>
      <ul className="list-disc list-inside text-white/80 text-sm font-sans space-y-1">
        <li>Basic Salary</li>
        <li>Housing Allowance</li>
        <li>Transportation Allowance</li>
        <li>Service Charge Distribution</li>
      </ul>
    </div>
  ),
  'Benefits': (
    <div className="space-y-4">
      <h3 className="font-serif text-lg font-bold text-white">Employee Benefits</h3>
      <p className="text-white/80 text-sm font-sans leading-relaxed">We offer a comprehensive benefits package designed to support your health, wellbeing, and financial security.</p>
      <ul className="list-disc list-inside text-white/80 text-sm font-sans space-y-2">
        <li>Comprehensive medical insurance (employee and dependents)</li>
        <li>Dental and optical coverage</li>
        <li>Life insurance</li>
        <li>Annual air ticket allowance</li>
        <li>Discounts at Marriott International properties worldwide</li>
        <li>Employee meals during shifts</li>
        <li>Transportation or transport allowance</li>
      </ul>
    </div>
  ),
  'Leave': (
    <div className="space-y-4">
      <h3 className="font-serif text-lg font-bold text-white">Leave Entitlements</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-sans">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-white/60 text-left py-2 pr-4 font-semibold">Leave Type</th>
              <th className="text-white/60 text-left py-2 pr-4 font-semibold">Days Per Year</th>
              <th className="text-white/60 text-left py-2 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {[
              ['Annual Leave', '21 days', 'Accrued monthly'],
              ['Medical / Sick Leave', '15 days', 'Medical certificate required'],
              ['Urgent / Emergency', '3 days', 'Subject to manager approval'],
              ['Maternity Leave', '45 days', 'As per UAE Labour Law'],
              ['Paternity Leave', '5 days', 'Within 3 months of birth'],
              ['Unpaid Leave', 'As approved', 'Management discretion'],
            ].map(([type, days, notes]) => (
              <tr key={type}>
                <td className="text-white py-2 pr-4">{type}</td>
                <td className="text-white/80 py-2 pr-4">{days}</td>
                <td className="text-white/60 py-2 text-xs">{notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
  'Training & Development': (
    <div className="space-y-4">
      <h3 className="font-serif text-lg font-bold text-white">Training & Development</h3>
      <p className="text-white/80 text-sm font-sans leading-relaxed">The Ritz-Carlton University provides world-class training programmes to all Ladies and Gentlemen. We invest in your continuous growth through structured learning paths.</p>
      <h4 className="font-serif text-base font-semibold text-white mt-4">Core Programmes</h4>
      <ul className="list-disc list-inside text-white/80 text-sm font-sans space-y-1">
        <li>Gold Standards Orientation (all new hires)</li>
        <li>Departmental Technical Training</li>
        <li>Leadership at Every Level</li>
        <li>Service Excellence Certification</li>
        <li>E-Learning via Marriott Digital Learning Hub</li>
      </ul>
    </div>
  ),
  'Employee Communication': (
    <div className="space-y-4">
      <h3 className="font-serif text-lg font-bold text-white">Employee Communication</h3>
      <p className="text-white/80 text-sm font-sans leading-relaxed">Open, transparent communication is integral to our culture. We encourage dialogue at all levels of the organisation.</p>
      <h4 className="font-serif text-base font-semibold text-white mt-4">Communication Channels</h4>
      <ul className="list-disc list-inside text-white/80 text-sm font-sans space-y-1">
        <li>Daily Line-Up meetings at department level</li>
        <li>Monthly Town Hall with General Manager</li>
        <li>HR Intranet portal (this system)</li>
        <li>Internal email and digital notice boards</li>
        <li>Speak Up programme (anonymous grievance reporting)</li>
      </ul>
    </div>
  ),
  'Rules & Regulations': (
    <div className="space-y-4">
      <h3 className="font-serif text-lg font-bold text-white">Rules & Regulations</h3>
      <p className="text-white/80 text-sm font-sans leading-relaxed">All employees are expected to uphold the highest standards of conduct at all times, both on and off property.</p>
      <h4 className="font-serif text-base font-semibold text-white mt-4">Key Policies</h4>
      <ul className="list-disc list-inside text-white/80 text-sm font-sans space-y-1">
        <li>Zero tolerance for harassment, discrimination, or bullying</li>
        <li>Strict confidentiality of guest information</li>
        <li>No use of mobile phones in guest-facing areas</li>
        <li>Adherence to The Ritz-Carlton grooming standards</li>
        <li>Compliance with all local laws and regulations</li>
        <li>Social media policy: no posting of proprietary or guest content</li>
      </ul>
    </div>
  ),
}

export default function EmployeeHandbook() {
  const [activeTab, setActiveTab] = useState(tabs[0])

  const activeIdx = tabs.indexOf(activeTab)
  const nextTab = tabs[activeIdx + 1]

  return (
    <div className="p-6 min-h-full flex flex-col" style={{ backgroundColor: '#1A2E55' }}>
      <h2 className="font-serif text-xl font-bold text-white mb-5">Employee Handbook</h2>

      {/* Tab Bar */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold font-sans transition-all border ${
              activeTab === tab
                ? 'text-white border-transparent'
                : 'border-white/30 text-white/70 hover:border-white/60 hover:text-white'
            }`}
            style={activeTab === tab ? { backgroundColor: '#B8D4E8', color: '#1A2E55' } : {}}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1">
        {tabContent[activeTab]}
      </div>

      {/* Next Button */}
      {nextTab && (
        <div className="flex justify-end mt-8">
          <button
            onClick={() => setActiveTab(nextTab)}
            className="flex items-center gap-2 px-5 py-2 rounded-md text-sm font-semibold font-sans transition-all hover:opacity-90 active:scale-95 text-[#1A2E55]"
            style={{ backgroundColor: '#B8D4E8' }}
          >
            Next: {nextTab}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
