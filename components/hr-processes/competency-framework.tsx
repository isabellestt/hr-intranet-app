'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

interface CompetencyRow {
  id:          string
  element:     string
  description: string
  l1:          string
  l2:          string
  l3:          string
}

interface CompetencyCategory {
  id:    string
  title: string
  color: string   // accent color for this category
  rows:  CompetencyRow[]
}

// ── Data ──────────────────────────────────────────────────────────────────────

const COMPETENCY_CATEGORIES: CompetencyCategory[] = [
  {
    id:    'cem',
    title: 'Customer Experience Management',
    color: '#1B2A4A',
    rows: [
      {
        id:          'CEM-1',
        element:     'Measure Service Performance',
        description: 'Measure service performance and implement improvements',
        l1:          'Possess service performance standards and outcomes. Understand job roles and tasks of service staff. Understand principles of effective communication and interpersonal techniques. Aware of different methods of data collation.',
        l2:          'Conduct service performance audits on site. Methods of implementing service performance improvement solutions. Guidelines for scheduling audits. Prepare service performance audits.',
        l3:          'Analyse service performance outcomes. Implement actions for service performance improvement.',
      },
      {
        id:          'CEM-2',
        element:     'Evaluate Service Performance',
        description: 'Evaluate service performance standards and outcomes for improvements',
        l1:          'Organisational service performance standards. Importance and methods of evaluating guests\' and/or customers\' satisfaction levels. Guest and/or customer satisfaction index. Parameters for identifying trends in guests\' and/or customers\' satisfaction. Methods of data collection and data analyses.',
        l2:          'Monitor effectiveness of actions taken to improve service performance standards. Approaches to conduct service performance analyses. Organisational critical situation escalation procedures.',
        l3:          'Analyse service performance standards. Assess service performance outcomes. Propose actions to improve service performance standards.',
      },
      {
        id:          'CEM-3',
        element:     'Establish Desired Service Performance',
        description: 'Establish desired guest and/or customer experience frameworks',
        l1:          'Concept of guest and/or customer experience. Service products, service environments and service delivery processes. Principles of effective communication and interpersonal techniques. Industry and organisational measurement criteria for guests\' and/or customers\' satisfaction levels. Types of evaluation tools used to assess guests\' and/or customers\' satisfaction. Legal and ethical considerations relating to evaluation of guests\' and/or customers\' experiences. Factors determining successful guest and/or customer experience design.',
        l2:          'Monitor effectiveness of enhanced guest and/or customer experience, based on guests\' and/or customers\' satisfaction. Review service products, environments and delivery processes to enhance guests\' and/or customers\' experiences. Facilitate implementation of enhanced guest and/or customer experience framework. Take corrective measures to address irregularities in delivery of enhanced guests\' and/or customers\' experiences. Market trends and developments in creating guests\' and/or customers\' experiences.',
        l3:          'Design innovative service products, environment and delivery process to enhance guests\' and/or customers\' experiences. Formulate desired guest and/or customer experience framework based on guest and/or customer profiles. Evaluate enhanced guest and/or customer experience, based on guests\' and/or customers\' satisfaction.',
      },
    ],
  },
  {
    id:    'se',
    title: 'Service Excellence',
    color: '#2D6A2D',
    rows: [
      {
        id:          'SE-1',
        element:     'Build Customer Confidence',
        description: 'Build customer confidence in the organisation by demonstrating customer-centric behaviours within the work environment in achieving service excellence',
        l1:          "Methods to develop knowledge of organisation's service offering. Methods to establish customer rapport. Types of service opportunities and escalated service challenges.",
        l2:          "Enhance knowledge of organisation's service offerings and customer profile on a continuous basis. Establish customer rapport to build customer confidence. Methods to respond to service opportunities and escalated service challenges.",
        l3:          "Respond to service opportunities and escalated service challenges to reinforce customers' confidence in the organisation. Promote a customer-centric culture within the service environment to achieve service excellence. Methods to promote a customer-centric culture.",
      },
      {
        id:          'SE-2',
        element:     'Establish & Maintain Relationships',
        description: 'Establish and maintain relationships to enhance service excellence, which includes implementing continuous improvements to achieve desired service levels',
        l1:          "Types of service partners. Methods to strengthen collaborations with service partners. Techniques to evaluate performance of partnerships. Methods to evaluate the success of implemented service innovation ideas. Methods to promote a customer-centric culture. Methods to establish customer rapport. Methods to develop knowledge of organisation's service offering. Methods to encourage team to deliver service.",
        l2:          "Establish and maintain relationships with service partners to enhance service excellence. Share with service partners the organisation's service standards and key performance indicators (KPIs) for service partners. Share industry knowledge and experience with service partners. Communicate reasons for continuous improvements to service partners. Obtain feedback from service partner on improvements. Communicate continuous improvements to team. Monitor service partners' performance after implementation of continuous improvements.",
        l3:          "Assess performance of service partnerships to identify areas of improvement. Implement continuous improvements to strengthen relationships with service partners.",
      },
      {
        id:          'SE-3',
        element:     'Establish Partnerships',
        description: 'Establish partnerships that are necessary to the organisation in delivering service excellence and to enhance the service operations process',
        l1:          "Types of service partners. Strategies to establish value creating partnerships.Methods to promote a customer-centric culture. Techniques to evaluate performance of partnerships. Methods to strengthen collaborations with service partners. Methods to encourage team to deliver service. Methods to monitor performance of self and team. Methods to demonstrate organisational vision, mission and core values. Characteristics of a role model.",
        l2:          "Develop clarity and reasons for partnership. Create clear and robust partnership arrangements. Develop and maintain trust (e.g. through consistent communication and delivery). Update service partners on the organisation's vision, mission, values and customer-focused strategy. Strengthen collaborations with service partners to enhance performance to achieve the organisation's service standards.",
        l3:          "Establish value creating partnerships with service partners to achieve organisational service excellence. Evaluate performance of service partners and their contributions to the organisation's service standards.",
      },
    ],
  },
  {
    id:    'cm',
    title: 'Crisis Management',
    color: '#8C4A1A',
    rows: [
      {
        id:          'CM-1',
        element:     'Execute Plans',
        description: 'Execute plans in response to disruptive events and collate post-crisis feedback from stakeholders',
        l1:          'Types of disruptive events. Critical business functions. Business continuity plans. Organisation crisis management plans, including crisis response and recovery activities. Organisation crisis communication plans. Types of crisis response and recovery activities. Emergency control exercises.',
        l2:          "Identify the impact of internal and external factors on business unit based on identified sources of disruptive events. Execute actions in response to disruptive events based on 'return to normal' procedures of crisis management plans. Participate in the organisation's emergency control exercises to validate crisis management plans and ensure organisational readiness. Assist in coordinating and integrating crisis response and recovery activities in accordance with recovery and business continuity plans. Collate and verify information to support dissemination of organisation crisis management key messages to relevant stakeholders.",
        l3:          'Document crisis responses, communications procedures and recovery activity data. Collate post-crisis feedback from relevant stakeholders to highlight areas for improvement.',
      },
      {
        id:          'CM-2',
        element:     'Manage Crisis Assessment Situations',
        description: 'Manage crisis assessment situations, determine recovery activities and conduct post-crisis analysis including delivery of training programmes to relevant stakeholders',
        l1:          'Best practices in crisis management. Critical work functions in business units. Crisis response and recovery activities. Organisation crisis management plans. Organisation crisis communication plans. Documentation components for crisis response and recovery activities. Resources required for crisis situations. Operational roles and responsibilities of a manager handling a crisis.',
        l2:          'Communicate organisational crisis management key messages to relevant stakeholders. Deliver training programmes to relevant stakeholders to address the performance gaps for crisis readiness. Form crisis communications teams to manage communication processes during disruptive events based on requirements of communications plans. Define, identify and classify sources of disruptive events for input into crisis management plans. Identify critical business functions and develop risk profiles for business units.',
        l3:          "Allocate resources and implement 'return-to-normal' procedures in accordance with crisis management plans. Conduct post-crisis analysis to determine the need for post-event interventions.",
      },
      {
        id:          'CM-3',
        element:     'Develop Crisis Management Plans',
        description: 'Develop crisis management plans and recovery strategies for the organisation',
        l1:          "Types of stakeholder management. Organisational business continuity strategies. Established stakeholders' communication platforms. Business impact and implications of disruptive events on organisation. Best practices in crisis management. Best practices in crisis communication. Damage assessment of disruptive events.",
        l2:          "Identify current trends in disruptions that can impact business processes. Utilise established communication platforms to facilitate communication processes to internal and external stakeholders during disruptive events. Activate crisis response and recovery activities and stand-down procedures in accordance with business continuity strategies and crisis management plans. Activate 'return-to-normal' procedures in accordance with crisis management plans.",
        l3:          "Direct the implementation of crisis response and recovery activities in accordance with business continuity and recovery strategies. Design organisation-wide crisis management plans for recovery from disruptive events. Refine organisational crisis management plans to ensure relevance to the current threat environment.",
      },
    ],
  },
]

const LEVEL_COLORS = {
  L1: { bg: '#EEF1F6', text: '#1B2A4A', border: '#C8D4E8' },
  L2: { bg: '#FBF7EF', text: '#7A5520', border: '#E8D5A8' },
  L3: { bg: '#F0F7F0', text: '#2D5A2D', border: '#A8D4A8' },
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function LevelBadge({ level }: { level: 'L1' | 'L2' | 'L3' }) {
  const c = LEVEL_COLORS[level]
  return (
    <span
      className="inline-block font-sans text-xs font-bold px-2.5 py-0.5 uppercase tracking-wider"
      style={{ backgroundColor: c.bg, color: c.text, border: `1px solid ${c.border}` }}
    >
      {level}
    </span>
  )
}

function CompetencyTable({ category }: { category: CompetencyCategory }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left" style={{ minWidth: 860 }}>

        {/* Category header */}
        <thead>
          <tr>
            <th
              colSpan={5}
              className="font-sans text-sm font-bold uppercase tracking-widest text-white text-center py-3 px-4"
              style={{ backgroundColor: category.color }}
            >
              Competency: {category.title}
            </th>
          </tr>
          <tr style={{ backgroundColor: '#1B2A4A' }}>
            {['Competency Element', 'Description', 'L1', 'L2', 'L3'].map((h) => (
              <th
                key={h}
                className="font-sans text-xs font-semibold text-white px-4 py-2.5 text-center"
                style={{ border: '1px solid rgba(255,255,255,0.15)', width: h === 'Competency Element' ? '10%' : h === 'Description' ? '18%' : '24%' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {category.rows.map((row, i) => (
            <tr
              key={row.id}
              style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#F9F8F6' }}
            >
              {/* Element */}
              <td
                className="px-4 py-4 text-center align-top"
                style={{ border: '1px solid #E0DDD8', verticalAlign: 'middle' }}
              >
                <p className="font-sans text-xs font-bold text-[#1B2A4A]">{row.id}</p>
                <p className="font-sans text-xs font-bold text-[#1B2A4A] mt-0.5 leading-snug">{row.element}</p>
              </td>

              {/* Description */}
              <td
                className="px-4 py-4 align-top"
                style={{ border: '1px solid #E0DDD8' }}
              >
                <p className="font-sans text-xs text-[#444] leading-relaxed text-center">{row.description}</p>
              </td>

              {/* L1 */}
              <td
                className="px-4 py-4 align-top text-center"
                style={{ border: '1px solid #E0DDD8', backgroundColor: LEVEL_COLORS.L1.bg, color: LEVEL_COLORS.L1.text }}
              >
                <p className="font-sans text-xs text-[#333] leading-relaxed">{row.l1}</p>
              </td>

              {/* L2 */}
              <td
                className="px-4 py-4 align-top text-center"
                style={{ border: '1px solid #E0DDD8', backgroundColor: LEVEL_COLORS.L2.bg, color: LEVEL_COLORS.L2.text }}
              >
                <p className="font-sans text-xs text-[#333] leading-relaxed">{row.l2}</p>
              </td>

              {/* L3 */}
              <td
                className="px-4 py-4 align-top text-center"
                style={{ border: '1px solid #E0DDD8', backgroundColor: LEVEL_COLORS.L3.bg, color: LEVEL_COLORS.L3.text }}
              >
                <p className="font-sans text-xs text-[#333] leading-relaxed">{row.l3}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function CompetencyFramework() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['cem']))

  const toggle = (id: string) =>
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  return (
    <div className="p-6 min-h-full" style={{ backgroundColor: '#1A2E55' }}>

      {/* Header */}
      <div className="flex items-end justify-between mb-6 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div>
          <h2 className="font-serif text-xl font-bold text-white">Competency Framework</h2>
          <p className="font-sans text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Knowledge and skills required at each level · L1 = Foundation &nbsp;·&nbsp; L2 = Intermediate &nbsp;·&nbsp; L3 = Advanced
          </p>
        </div>

        {/* Level legend */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {(['L1', 'L2', 'L3'] as const).map(l => <LevelBadge key={l} level={l} />)}
        </div>
      </div>

      {/* Category accordions */}
      <div className="space-y-3">
        {COMPETENCY_CATEGORIES.map((cat) => {
          const isOpen = expanded.has(cat.id)
          return (
            <div
              key={cat.id}
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border:          '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {/* Accordion header */}
              <button
                onClick={() => toggle(cat.id)}
                className="w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1 h-5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="font-sans text-sm font-semibold text-white">{cat.title}</span>
                  <span
                    className="font-sans text-xs px-2 py-0.5"
                    style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)' }}
                  >
                    {cat.rows.length} competenc{cat.rows.length !== 1 ? 'ies' : 'y'}
                  </span>
                </div>
                {isOpen
                  ? <ChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />
                  : <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />
                }
              </button>

              {/* Table */}
              {isOpen && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <CompetencyTable category={cat} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}