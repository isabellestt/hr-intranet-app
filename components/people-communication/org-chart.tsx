'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { orgChartData, type OrgNode } from '@/lib/mock-data'

const COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  blue:   { bg: '#1E4D8C', text: '#fff', border: '#2563AB' },
  teal:   { bg: '#1A6B5A', text: '#fff', border: '#1E8A72' },
  green:  { bg: '#2D6A2D', text: '#fff', border: '#3A8A3A' },
  orange: { bg: '#8C4A1A', text: '#fff', border: '#B05E20' },
  purple: { bg: '#5A2D8C', text: '#fff', border: '#7A3AB5' },
  red:    { bg: '#8C2D2D', text: '#fff', border: '#B03A3A' },
  default:{ bg: 'rgba(255,255,255,0.12)', text: '#fff', border: 'rgba(255,255,255,0.25)' },
}

function OrgNodeCard({
  node,
  isRoot = false,
}: {
  node: OrgNode
  isRoot?: boolean
}) {
  const [expanded, setExpanded] = useState(true)
  const hasChildren = node.children && node.children.length > 0
  const colors = COLOR_MAP[node.color ?? 'default']

  return (
    <div className="flex flex-col items-center">
      {/* Card */}
      <div className="relative">
        <button
          onClick={() => hasChildren && setExpanded((v) => !v)}
          className="flex items-center gap-1.5 px-3 py-1.5 font-sans text-xs font-semibold whitespace-nowrap transition-opacity hover:opacity-80"
          style={{
            backgroundColor: colors.bg,
            color:            colors.text,
            border:           `1px solid ${colors.border}`,
            minWidth:         isRoot ? 140 : 110,
            cursor:           hasChildren ? 'pointer' : 'default',
          }}
        >
          <span className="flex-1 text-center leading-tight">{node.title}</span>
          {hasChildren && (
            expanded
              ? <ChevronDown className="w-3 h-3 flex-shrink-0 opacity-60" />
              : <ChevronRight className="w-3 h-3 flex-shrink-0 opacity-60" />
          )}
        </button>
      </div>

      {/* Children */}
      {hasChildren && expanded && (
        <div className="flex flex-col items-center">
          {/* Vertical connector from parent */}
          <div className="w-px h-4" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />

          {node.children!.length === 1 ? (
            <OrgNodeCard node={node.children![0]} />
          ) : (
            <div className="flex flex-col items-center">
              {/* Horizontal bar */}
              <div className="relative flex items-start">
                {node.children!.map((child, i) => {
                  const isFirst = i === 0
                  const isLast  = i === node.children!.length - 1
                  const isMid   = !isFirst && !isLast

                  return (
                    <div key={child.id} className="flex flex-col items-center px-2">
                      {/* Top connector segment */}
                      <div
                        className="h-px"
                        style={{
                          width:           isFirst || isLast ? '50%' : '100%',
                          alignSelf:       isFirst ? 'flex-end' : isLast ? 'flex-start' : 'stretch',
                          backgroundColor: 'rgba(255,255,255,0.2)',
                        }}
                      />
                      <div className="w-px h-3" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                      <OrgNodeCard node={child} />
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Simpler flat-branch renderer for the full tree
function TreeBranch({ node }: { node: OrgNode }) {
  const [expanded, setExpanded] = useState(true)
  const hasChildren = node.children && node.children.length > 0
  const colors = COLOR_MAP[node.color ?? 'default']

  return (
    <div className="flex flex-col items-center select-none">
      <button
        onClick={() => hasChildren && setExpanded((v) => !v)}
        className="flex items-center gap-1 px-2.5 py-1 font-sans text-xs font-medium whitespace-nowrap transition-opacity hover:opacity-80"
        style={{
          backgroundColor: colors.bg,
          color:            colors.text,
          border:           `1px solid ${colors.border}`,
          cursor:           hasChildren ? 'pointer' : 'default',
          borderRadius:     2,
          minWidth:         90,
          textAlign:        'center',
        }}
      >
        <span className="flex-1 text-center leading-tight">{node.title}</span>
        {hasChildren && (expanded
          ? <ChevronDown className="w-2.5 h-2.5 flex-shrink-0 opacity-50" />
          : <ChevronRight className="w-2.5 h-2.5 flex-shrink-0 opacity-50" />
        )}
      </button>

      {hasChildren && expanded && (
        <>
          <div className="w-px h-3" style={{ backgroundColor: 'rgba(255,255,255,0.18)' }} />
          {node.children!.length === 1 ? (
            <TreeBranch node={node.children![0]} />
          ) : (
            <div className="flex items-start gap-1">
              {node.children!.map((child) => (
                <div key={child.id} className="flex flex-col items-center">
                  <div className="w-px h-3" style={{ backgroundColor: 'rgba(255,255,255,0.18)' }} />
                  <TreeBranch node={child} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function OrgChart() {
  return (
    <div className="p-6 min-h-full" style={{ backgroundColor: '#1A2E55' }}>
      <h2 className="font-serif text-xl font-bold text-white mb-1">Hotel Organisational Chart</h2>
      <p className="font-sans text-xs mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
        Click any node to expand or collapse its branch
      </p>

      {/* Chart area */}
      <div
        className="w-full overflow-auto p-6"
        style={{
          backgroundColor: 'rgba(255,255,255,0.04)',
          border:           '1px solid rgba(255,255,255,0.08)',
          minHeight:        420,
        }}
      >
        <div className="flex justify-center" style={{ minWidth: 900 }}>
          <TreeBranch node={orgChartData} />
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4">
        {[
          { label: 'Front Office', color: 'blue'   },
          { label: 'Logistics',    color: 'teal'   },
          { label: 'F&B',          color: 'green'  },
          { label: 'Sales',        color: 'orange' },
          { label: 'HR',           color: 'purple' },
          { label: 'Finance',      color: 'red'    },
        ].map(({ label, color }) => (
          <div key={color} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: COLOR_MAP[color].bg, border: `1px solid ${COLOR_MAP[color].border}` }}
            />
            <span className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}