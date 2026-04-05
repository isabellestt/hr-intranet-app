'use client'

import { useState, useEffect } from 'react'
import { FileText, Clock, DollarSign, Shield, Heart, TrendingUp, ChevronLeft, ChevronRight, Download } from 'lucide-react'
import { type PolicySection, type Policy } from '@/lib/mock-data'

const policies = [
  { label: 'Employment Policies', icon: FileText, desc: 'Hiring, contracts & workplace standards' },
  { label: 'Leave & Time-Off Policies', icon: Clock, desc: 'Annual, medical, and special leave' },
  { label: 'Compensation & Benefits', icon: DollarSign, desc: 'Salary structure & allowances' },
  { label: 'Code of Conduct', icon: Shield, desc: 'Standards of behaviour & ethics' },
  { label: 'Health, Safety & Wellbeing', icon: Heart, desc: 'Workplace safety guidelines' },
  { label: 'Performance & Career', icon: TrendingUp, desc: 'Reviews, growth & development' },
]

const POLICIES: Policy[] = [
  {
    id:    'employment',
    label: 'Employment Policies',
    icon:  FileText,
    desc:  'Hiring, contracts & workplace standards',
    intro: 'This policy outlines the basic aspects of employment at The Ritz-Carlton, including how we define full-time employment and how we hire. Use this document as a reference and adjust it to your needs. Keep in mind that this is not a legal document and may not take into account all relevant local or national laws. Please consult HR for finalised policy documents.',
    contents: [
      'Employment contract types',
      'Equal opportunity employment',
      'Recruitment and selection process',
      'Background checks',
      'Referrals',
      'Attendance',
    ],
    sections: [
      {
        heading: 'Employment Basics',
        body: (
          <div className="space-y-3 font-sans text-sm text-[#333] leading-relaxed">
            <p>The Ritz-Carlton is committed to attracting, hiring, and retaining the best talent in the luxury hospitality industry. All employment decisions are based on merit, qualifications, and business needs.</p>
            <p>Full-time employees work a minimum of 40 hours per week or 160 hours per month on average. Part-time employees work fewer than 30 hours per week. Both full-time and part-time employees may hold either temporary or indefinite duration contracts. Full-time employees under an indefinite duration contract are entitled to the company's full benefits package.</p>
          </div>
        ),
      },
      {
        heading: 'Equal Opportunity Employment',
        body: (
          <div className="font-sans text-sm text-[#333] leading-relaxed">
            <p>The Ritz-Carlton is an equal opportunity employer. We do not discriminate on the basis of race, colour, religion, gender, sexual orientation, national origin, age, disability, or any other characteristic protected by law. This applies to all aspects of employment including hiring, promotion, termination, compensation, and training.</p>
          </div>
        ),
      },
      {
        heading: 'Recruitment & Selection',
        body: (
          <div className="space-y-2 font-sans text-sm text-[#333] leading-relaxed">
            <p>All roles must be approved by the relevant department head and HR before posting. Positions are advertised internally first for a minimum of five working days before external recruitment begins.</p>
            <ul className="list-disc pl-5 space-y-1 text-[#444]">
              <li>Background checks are required for all new hires and must be completed before the start date.</li>
              <li>Employee referrals are encouraged and eligible for the referral bonus programme.</li>
              <li>All offers of employment must be made in writing by HR.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: 'Attendance',
        body: (
          <div className="font-sans text-sm text-[#333] leading-relaxed">
            <p>Employees are expected to report to work on time and maintain regular attendance. Absences must be reported to your direct supervisor or department head by 8:00 AM on the day of absence. Repeated unexplained absences may result in disciplinary action in accordance with the Code of Conduct.</p>
          </div>
        ),
      },
    ],
  },
  {
    id:    'leave',
    label: 'Leave & Time-Off Policies',
    icon:  Clock,
    desc:  'Annual, medical, and special leave',
    intro: 'This policy provides clear guidelines on employee leave entitlements and expected standards of conduct to promote fairness, compliance, and a positive working environment. This policy applies to all employees of the organisation, regardless of position or employment type.',
    contents: [
      'Annual Leave',
      'Sick / Medical Leave',
      'Compassionate Leave',
      'Leave Application Process',
      'Employee Conduct',
      'Disciplinary Action',
    ],
    sections: [
      {
        heading: '1. Purpose',
        body: <p className="font-sans text-sm text-[#333] leading-relaxed">The purpose of this policy is to provide clear guidelines on employee leave entitlements and expected standards of conduct to promote fairness, compliance, and a positive working environment.</p>,
      },
      {
        heading: '2. Scope',
        body: <p className="font-sans text-sm text-[#333] leading-relaxed">This policy applies to all employees of the organisation, regardless of position or employment type.</p>,
      },
      {
        heading: '3.1 Annual Leave',
        body: (
          <ul className="list-disc pl-5 font-sans text-sm text-[#444] space-y-1 leading-relaxed">
            <li>Employees are entitled to annual leave in accordance with company policy and applicable labour regulations — 21 days per year for full-time employees.</li>
            <li>Leave must be requested in advance and approved by management.</li>
            <li>Unused leave of up to 7 days may be carried forward to the following calendar year.</li>
          </ul>
        ),
      },
      {
        heading: '3.2 Sick Leave',
        body: (
          <ul className="list-disc pl-5 font-sans text-sm text-[#444] space-y-1 leading-relaxed">
            <li>Sick leave may be granted when an employee is unable to work due to illness — up to 15 days per year with a valid medical certificate.</li>
            <li>Medical documentation may be required for extended absences exceeding two consecutive days.</li>
          </ul>
        ),
      },
      {
        heading: '3.3 Compassionate Leave',
        body: (
          <ul className="list-disc pl-5 font-sans text-sm text-[#444] space-y-1 leading-relaxed">
            <li>Compassionate leave may be granted in cases of bereavement or family emergencies — up to 3 days per incident.</li>
            <li>Approval is subject to management discretion.</li>
          </ul>
        ),
      },
      {
        heading: '4. Leave Application Process',
        body: (
          <ul className="list-disc pl-5 font-sans text-sm text-[#444] space-y-1 leading-relaxed">
            <li>Employees must submit leave requests using the HR Intranet portal under Employee Self-Service &rsaquo; Leave Application.</li>
            <li>Managers are responsible for reviewing and approving leave requests within two working days.</li>
            <li>Approved leave should be properly recorded for HR records.</li>
          </ul>
        ),
      },
      {
        heading: '5. Employee Conduct',
        body: <p className="font-sans text-sm text-[#333] leading-relaxed">Employees are expected to conduct themselves in a professional, respectful, and ethical manner at all times, including respecting colleagues, clients, company property, and confidentiality.</p>,
      },
      {
        heading: '6. Disciplinary Action',
        body: <p className="font-sans text-sm text-[#333] leading-relaxed">Failure to comply with this policy may result in disciplinary action in line with company procedures.</p>,
      },
    ],
  },
  {
    id:    'compensation',
    label: 'Compensation & Benefits',
    icon:  DollarSign,
    desc:  'Salary structure & allowances',
    intro: 'Our employee compensation and development policies help explain how we reward employees and motivate them to achieve even better results. This document outlines our guidelines for compensating employees according to their employment status and our performance management and employee development policies.',
    contents: [
      'Compensation status',
      'Overtime',
      'Payroll',
      'Performance management',
      'How we expect managers to lead employees',
      'Employee training and development',
    ],
    sections: [
      {
        heading: 'Compensation Status',
        body: (
          <div className="space-y-2 font-sans text-sm text-[#333] leading-relaxed">
            <p>There are two types of employees under our classification guidelines:</p>
            <ul className="list-disc pl-5 space-y-1 text-[#444]">
              <li><strong>Non-exempt employees</strong>, who are covered by minimum wage and overtime provisions.</li>
              <li><strong>Exempt employees</strong>, who are paid on a salary basis and typically perform managerial, professional, or administrative duties. These employees must meet all three criteria to be classified as exempt.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: 'Overtime',
        body: (
          <div className="font-sans text-sm text-[#333] leading-relaxed">
            <p>Non-exempt employees are entitled to overtime pay at 1.5× the regular rate for hours worked beyond 44 hours per week. All overtime must be pre-approved by the department head. Exempt employees are not entitled to overtime pay but are eligible for time-off-in-lieu at the manager's discretion.</p>
          </div>
        ),
      },
      {
        heading: 'Payroll',
        body: (
          <div className="font-sans text-sm text-[#333] leading-relaxed">
            <p>Employees are paid on a monthly basis. Payslips are processed and made available via the HR Intranet by the 25th of each month. Salary is credited directly to the employee's registered bank account. Queries regarding payroll should be directed to HR within 5 working days of payslip issuance.</p>
          </div>
        ),
      },
      {
        heading: 'Benefits Overview',
        body: (
          <ul className="list-disc pl-5 font-sans text-sm text-[#444] space-y-1 leading-relaxed">
            <li>Medical insurance coverage for employee and immediate family (full-time employees).</li>
            <li>Annual staff room rate for personal travel at participating Marriott and Ritz-Carlton properties.</li>
            <li>Meal allowance during working shifts.</li>
            <li>Annual performance bonus subject to company and individual performance targets.</li>
            <li>Staff training and development sponsorship — up to SGD 2,000 per year.</li>
          </ul>
        ),
      },
    ],
  },
  {
    id:    'conduct',
    label: 'Code of Conduct',
    icon:  Shield,
    desc:  'Standards of behaviour & ethics',
    intro: 'The Employee Code of Conduct is one of the most important parts of your employment at The Ritz-Carlton. This document communicates our expectations to all employees in a clear and tactful manner. As an employee, you are responsible for behaving appropriately at work. We outline our expectations here. We cannot cover every single case of conduct, but we trust you to always use your best judgement. Reach out to HR if you face any issues or have any questions.',
    contents: [
      'Dress code',
      'Cyber security and digital devices',
      'Internet usage',
      'Cell phone',
      'Corporate email',
      'Social media',
      'Conflict of interest',
      'Employee relationships & fraternisation',
      'Workplace visitors',
      'Solicitation and distribution',
    ],
    sections: [
      {
        heading: 'Dress Code',
        body: (
          <div className="font-sans text-sm text-[#333] leading-relaxed">
            <p>All employees are expected to maintain a professional and well-groomed appearance at all times. Guest-facing employees must wear the designated Ritz-Carlton uniform as provided by HR. Non-uniformed employees in administrative or back-of-house roles must adhere to the business-casual dress standard. Visible tattoos and non-standard piercings are subject to departmental guidelines.</p>
          </div>
        ),
      },
      {
        heading: 'Cyber Security & Digital Devices',
        body: (
          <ul className="list-disc pl-5 font-sans text-sm text-[#444] space-y-1 leading-relaxed">
            <li><strong>Internet usage:</strong> Company devices and networks may only be used for work-related purposes. Excessive personal browsing during working hours is not permitted.</li>
            <li><strong>Cell phones:</strong> Personal phones must be kept on silent in guest-facing areas and may not be used during active service periods.</li>
            <li><strong>Corporate email:</strong> Email accounts are provided for business use only. Do not share confidential company information externally without authorisation.</li>
            <li><strong>Social media:</strong> Employees must not post content that disparages The Ritz-Carlton, its employees, or guests. The company's social media policy must be reviewed by all staff annually.</li>
          </ul>
        ),
      },
      {
        heading: 'Conflict of Interest',
        body: (
          <div className="font-sans text-sm text-[#333] leading-relaxed">
            <p>Employees must disclose any actual or potential conflicts of interest to HR in writing. This includes secondary employment, business ownership, or personal relationships with vendors or competitors. The company reserves the right to review and act on disclosed conflicts on a case-by-case basis.</p>
          </div>
        ),
      },
      {
        heading: 'Employee Relationships',
        body: (
          <div className="font-sans text-sm text-[#333] leading-relaxed">
            <p>Romantic relationships between direct supervisors and their reports are not permitted, as they create a conflict of interest. Employees must disclose any pre-existing relationships of this nature to HR. Employment of relatives in the same department or reporting line requires prior HR approval.</p>
          </div>
        ),
      },
      {
        heading: 'Solicitation & Distribution',
        body: (
          <div className="font-sans text-sm text-[#333] leading-relaxed">
            <p>Solicitation of employees for non-work-related purposes during working hours is prohibited. Distribution of non-company materials on company premises requires prior written approval from management.</p>
          </div>
        ),
      },
    ],
  },
  {
    id:    'health',
    label: 'Health, Safety & Wellbeing',
    icon:  Heart,
    desc:  'Workplace safety guidelines',
    intro: 'Every employee is entitled to a positive workplace environment that is free from discrimination, harassment, sexual harassment, and violence, and that treats employees with dignity and respect. The Ritz-Carlton is committed to ensuring that no employee is subject to discrimination, harassment, sexual harassment, or violence from management, co-workers, suppliers, or customers.',
    contents: [
      'Purpose',
      'Definitions — Discrimination & Harassment',
      'Reporting procedure',
      'Investigation process',
      'Consequences of violation',
      'Workplace safety obligations',
    ],
    sections: [
      {
        heading: 'Purpose',
        body: (
          <p className="font-sans text-sm text-[#333] leading-relaxed">
            The Ritz-Carlton is committed to fair treatment of its employees, upholding human rights, and paying fair wages. This policy is designed to prevent workplace discrimination and harassment and to provide a clear reporting and resolution process for all employees.
          </p>
        ),
      },
      {
        heading: 'Definitions',
        body: (
          <div className="space-y-3 font-sans text-sm text-[#333] leading-relaxed">
            <p><strong>Discrimination:</strong> Unfair or improper behaviour (whether intentional or not) that affects working conditions or employment decisions such as hiring, promotion, training, benefits, or termination of employment based on a protected characteristic.</p>
            <p><strong>Harassment:</strong> Improper behaviour directed toward one or more employees that is intimidating, offensive, embarrassing, or humiliating; or that interferes with work performance or creates a hostile or offensive working environment.</p>
            <p>Harassment typically involves a course of conduct or a pattern of behaviour. However, one single incident, if sufficiently serious, can constitute harassment.</p>
          </div>
        ),
      },
      {
        heading: 'Reporting Procedure',
        body: (
          <ul className="list-disc pl-5 font-sans text-sm text-[#444] space-y-1 leading-relaxed">
            <li>Employees who believe they have experienced or witnessed harassment or discrimination should report it to their HR Business Partner or Department Head immediately.</li>
            <li>Reports may be made verbally or in writing. All reports will be treated with the highest degree of confidentiality.</li>
            <li>Retaliation against an employee who reports in good faith is strictly prohibited and itself constitutes a serious violation of this policy.</li>
          </ul>
        ),
      },
      {
        heading: 'Workplace Safety',
        body: (
          <div className="font-sans text-sm text-[#333] leading-relaxed">
            <p>All employees are responsible for maintaining a safe working environment. This includes following all fire safety, emergency evacuation, and equipment handling procedures. Any unsafe conditions must be reported to the Facilities team or HR immediately. Mandatory safety training is conducted annually for all staff.</p>
          </div>
        ),
      },
    ],
  },
  {
    id:    'performance',
    label: 'Performance & Career',
    icon:  TrendingUp,
    desc:  'Reviews, growth & development',
    intro: 'We have built our performance management practices to ensure you understand your job responsibilities and have specific goals to meet. We provide you with actionable and timely feedback on your work, invest in development opportunities that help you grow professionally, and recognise and reward your work in financial or non-financial ways.',
    contents: [
      'Performance management framework',
      'How we expect managers to lead employees',
      'Setting clear objectives',
      'Providing useful feedback',
      'Employee training and development',
      'Career progression pathways',
    ],
    sections: [
      {
        heading: 'Performance Management',
        body: (
          <div className="space-y-2 font-sans text-sm text-[#333] leading-relaxed">
            <p>We conduct formal bi-annual performance reviews. During these reviews, your manager will fill out your performance evaluation report and arrange a meeting with you to discuss it. Through these discussions, managers aim to recognise employees who are good at their jobs, identify areas of improvement, and talk about career moves.</p>
            <p>Pay increases or bonuses are not guaranteed. We encourage managers to recommend rewards for their team members when they deserve them. There won't be any forced ranking or comparison between employees, as our goal is to help all employees improve and develop their careers.</p>
            <p>All managers are instructed to meet with their team members once per fortnight to provide feedback and talk about their work and motivations. This way, you can receive feedback in a timely manner and avoid surprises during the bi-annual performance review.</p>
          </div>
        ),
      },
      {
        heading: 'How We Expect Managers to Lead',
        body: (
          <div className="space-y-3 font-sans text-sm text-[#333] leading-relaxed">
            <p>If you manage a team, you are responsible for your team members' performance. To conduct effective regular meetings and performance evaluations, we expect you to:</p>
            <ul className="list-disc pl-5 space-y-2 text-[#444]">
              <li><strong>Set clear objectives.</strong> Your team members should know what you expect of them. When you first hire someone to your team, ensure they understand their job duties. Set specific goals for each team member and revisit those goals during bi-annual performance reviews.</li>
              <li><strong>Provide useful feedback.</strong> During scheduled meetings with your team members, give them both guidance and praise, as appropriate. Be fair and specific to help them understand and implement your feedback.</li>
              <li><strong>Keep your team members involved.</strong> There should be two-way communication between you and your team. Make your expectations clear, but always take your team members' motivations and aspirations into account. Discuss training and development opportunities that may interest them.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: 'Career Progression',
        body: (
          <div className="space-y-2 font-sans text-sm text-[#333] leading-relaxed">
            <p>The Ritz-Carlton is committed to promoting from within wherever possible. Employees who demonstrate consistent performance, a commitment to the Gold Standards, and a desire to grow are encouraged to apply for internal positions through the HR Processes &rsaquo; Internal Job Postings section of the intranet.</p>
            <p>Career development plans are discussed during annual reviews and are documented in the HR system. Employees may request a career development conversation with HR at any time.</p>
          </div>
        ),
      },
      {
        heading: 'Training & Development',
        body: (
          <ul className="list-disc pl-5 font-sans text-sm text-[#444] space-y-1 leading-relaxed">
            <li>Every employee is expected to complete a minimum of 20 training hours per year, including mandatory compliance modules.</li>
            <li>Training sponsorship of up to SGD 2,000 per year is available for approved external courses relevant to the employee's role.</li>
            <li>Training requests must be submitted via Learning & Development &rsaquo; Training Proposal at least 4 weeks before the course start date.</li>
          </ul>
        ),
      },
    ],
  },
]

// ── Policy document view ──────────────────────────────────────────────────────

function PolicyDocument({
  policy,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  policy:   Policy
  onPrev:   () => void
  onNext:   () => void
  hasPrev:  boolean
  hasNext:  boolean
}) {
  return (
    <div className="flex flex-col h-full">
 
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* White document card */}
        <div className="bg-white shadow-sm space-y-6">
 
          {/* Intro */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1B2A4A] mb-3">{policy.label}</h3>
            <p className="font-sans text-sm text-[#444] leading-relaxed">{policy.intro}</p>
          </div>
 
          {/* Contents list */}
          <div>
            <p className="font-sans text-sm font-semibold text-[#1B2A4A] mb-2">Contents:</p>
            <ul className="list-disc pl-5 space-y-1">
              {policy.contents.map((item) => (
                <li key={item} className="font-sans text-sm text-[#555]">{item}</li>
              ))}
            </ul>
          </div>
 
          {/* Divider */}
          <div className="h-px bg-[#E5E5E5]" />
 
          {/* Policy sections */}
          {policy.sections.map((section, i) => (
            <div key={i}>
              <h4 className="font-serif text-base font-bold text-[#1B2A4A] mb-2">{section.heading}</h4>
              {section.body}
            </div>
          ))}
 
          {/* Download row */}
          {/* <div className="pt-2 border-t border-[#E5E5E5]">
            <button className="flex items-center gap-2 font-sans text-xs text-[#B8975A] hover:underline font-medium">
              <Download className="w-3.5 h-3.5" />
              Download this policy as a .doc file
            </button>
          </div> */}
        </div>
      </div>
 
      {/* Navigation buttons */}
      <div
        className="flex items-center justify-end gap-3 px-5 py-3 flex-shrink-0"
        style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
      >
        {hasPrev && (
          <button
            onClick={onPrev}
            className="flex items-center gap-1.5 px-4 py-2 font-sans text-xs font-semibold transition-opacity hover:opacity-80"
            style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: '#b8975aff', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Previous
          </button>
        )}
        {hasNext && (
          <button
            onClick={onNext}
            className="flex items-center gap-1.5 px-4 py-2 font-sans text-xs font-semibold transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#b8975aff', color: '#fff' }}
          >
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
        {!hasNext && (
          <span className="font-sans text-xs" style={{ color: '#b8975aff' }}>
            End of Policy Library
          </span>
        )}
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function HRPolicyLibrary() {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const active = activeIndex !== 0 ? POLICIES[activeIndex] : POLICIES[0]

  return (
    <div>
      <div className="flex gap-5 items-start">
          {/* Sidebar — policy list */}
          <div className="w-44 flex-shrink-0 space-y-1">
            {POLICIES.map((policy, i) => {
              const isActive = i === activeIndex
              const Icon     = policy.icon
              return (
                <button
                  key={policy.id}
                  onClick={() => setActiveIndex(i)}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-left font-sans text-xs font-medium transition-all"
                  style={{
                    backgroundColor: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                    color:           isActive ? '#fff'                   : 'rgba(255,255,255,0.5)',
                    borderLeft:      isActive ? '3px solid #B8975A'      : '3px solid transparent',
                  }}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: isActive ? '#B8975A' : 'rgba(85, 76, 76, 0.3)' }} />
                  <span className="leading-snug text-[#1B2A4A] group-hover:text-[#B8975A]">{policy.label}</span>
                </button>
              )
            })}
          </div>
 
          {/* Document panel */}
          <div
            className="flex-1 min-w-0 flex flex-col"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              border:          '1px solid rgba(255,255,255,0.1)',
              // maxHeight:       680,
            }}
          >
            <PolicyDocument
              policy={active}
              hasPrev={activeIndex > 0}
              hasNext={activeIndex < POLICIES.length - 1}
              onPrev={() => setActiveIndex(i => (i ?? 1) - 1)}
              onNext={() => setActiveIndex(i => (i ?? 0) + 1)}
            />
          </div>
        </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
      </div> */}
    </div>
  )
}
