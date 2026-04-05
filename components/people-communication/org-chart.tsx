'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { orgChartData, type OrgNode } from '@/lib/mock-data'

// ── Color map ─────────────────────────────────────────────────────────────────

const COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  blue:    { bg: '#1E4D8C', text: '#fff', border: '#2563AB' },
  teal:    { bg: '#1A6B5A', text: '#fff', border: '#1E8A72' },
  green:   { bg: '#2D6A2D', text: '#fff', border: '#3A8A3A' },
  orange:  { bg: '#8C4A1A', text: '#fff', border: '#B05E20' },
  purple:  { bg: '#5A2D8C', text: '#fff', border: '#7A3AB5' },
  red:     { bg: '#8C2D2D', text: '#fff', border: '#B03A3A' },
  default: { bg: 'rgba(255,255,255,0.1)', text: '#fff', border: 'rgba(255,255,255,0.22)' },
}

const LINE = 'rgba(255,255,255,0.2)'
const PAD  = 10  // horizontal padding per side on each child wrapper

// ── Tree node ─────────────────────────────────────────────────────────────────
//
// Connector strategy for multiple children:
//
//        [Parent]
//           |          <- vertical stem (1px wide, 14px tall)
//    ───────┼───────   <- horizontal bar built from split halves per child
//    |             |   <- vertical drops (already part of split connector)
//  [Child1]     [Child2]
//
// Each child wrapper has paddingLeft/Right = PAD for breathing room.
// The split connector row uses:
//   width: calc(100% + PAD*2px)  +  marginLeft: -PAD
// so it overflows into the padding on both sides, closing the gap that padding
// would otherwise leave in the horizontal line.
//
//   [left-half border-top] | [1px vertical] | [right-half border-top]
//   first child  → left-half  border OFF
//   last child   → right-half border OFF
//   middle child → both halves border ON

function TreeNode({ node, isRoot = false }: { node: OrgNode; isRoot?: boolean }) {
  const [expanded, setExpanded] = useState(true)
  const hasChildren = (node.children?.length ?? 0) > 0
  const colors      = COLOR_MAP[node.color ?? 'default']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {/* ── Node pill ── */}
      <button
        onClick={() => hasChildren && setExpanded(v => !v)}
        style={{
          display:         'flex',
          alignItems:      'center',
          gap:             4,
          padding:         isRoot ? '6px 16px' : '4px 10px',
          backgroundColor: colors.bg,
          color:           colors.text,
          border:          `1px solid ${colors.border}`,
          borderRadius:    3,
          fontSize:        isRoot ? 13 : 11,
          fontFamily:      'system-ui, sans-serif',
          fontWeight:      600,
          whiteSpace:      'nowrap',
          cursor:          hasChildren ? 'pointer' : 'default',
          transition:      'opacity 0.15s',
          userSelect:      'none',
        }}
        onMouseEnter={e => { if (hasChildren) (e.currentTarget as HTMLButtonElement).style.opacity = '0.75' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
      >
        <span style={{ textAlign: 'center', lineHeight: 1.4 }}>{node.title}</span>
        {hasChildren && (
          expanded
            ? <ChevronDown  style={{ width: 10, height: 10, opacity: 0.55, flexShrink: 0 }} />
            : <ChevronRight style={{ width: 10, height: 10, opacity: 0.55, flexShrink: 0 }} />
        )}
      </button>

      {/* ── Children subtree ── */}
      {hasChildren && expanded && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Vertical stem down from parent node */}
          <div style={{ width: 1, height: 14, backgroundColor: LINE }} />

          {node.children!.length === 1 ? (
            // Single child — straight drop, no horizontal bar needed
            <TreeNode node={node.children![0]} />
          ) : (
            // Multiple children — draw horizontal bar via split-connector
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              {node.children!.map((child, i) => {
                const isFirst = i === 0
                const isLast  = i === node.children!.length - 1

                return (
                  <div
                    key={child.id}
                    style={{
                      display:       'flex',
                      flexDirection: 'column',
                      alignItems:    'center',
                      paddingLeft:   PAD,
                      paddingRight:  PAD,
                    }}
                  >
                    {/*
                      Connector row is wider than the content box by PAD on each side
                      (calc + negative marginLeft) so border-top runs continuously
                      through the padding gap between siblings.
                    */}
                    <div style={{
                      display:    'flex',
                      width:      `calc(100% + ${PAD * 2}px)`,
                      marginLeft: -PAD,
                      height:     14,
                    }}>
                      <div style={{
                        flex:      1,
                        borderTop: isFirst ? 'none' : `1px solid ${LINE}`,
                      }} />
                      <div style={{ width: 1, backgroundColor: LINE }} />
                      <div style={{
                        flex:      1,
                        borderTop: isLast ? 'none' : `1px solid ${LINE}`,
                      }} />
                    </div>

                    <TreeNode node={child} />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Page component ─────────────────────────────────────────────────────────────

export default function OrgChart() {
  const scrollRef  = useRef<HTMLDivElement>(null)
  const rootRef    = useRef<HTMLDivElement>(null)

  // On mount, scroll the container so the root node is horizontally centred
  useEffect(() => {
    const container = scrollRef.current
    const root      = rootRef.current
    if (!container || !root) return

    const containerW   = container.clientWidth
    const contentW     = container.scrollWidth
    const rootOffsetL  = root.offsetLeft           // left edge of root relative to inner div
    const rootW        = root.offsetWidth
    const rootCentre   = rootOffsetL + rootW / 2   // centre of root node

    // Scroll so rootCentre lands at the horizontal middle of the container
    container.scrollLeft = rootCentre - containerW / 2
  }, [])
  return (
    <div className="p-6 min-h-full" style={{ backgroundColor: '#1A2E55' }}>

      <h2 className="font-serif text-xl font-bold text-white mb-1">
        Hotel Organisational Chart
      </h2>
      <p className="font-sans text-xs mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
        Click any node to expand or collapse its branch
      </p>

      {/* Scrollable chart canvas */}
      <div
        ref={scrollRef}
        style={{
          width:           '100%',
          overflowX:       'auto',
          overflowY:       'visible',
          padding:         24,
          backgroundColor: 'rgba(255,255,255,0.03)',
          border:          '1px solid rgba(255,255,255,0.08)',
          minHeight:       420,
        }}
      >
        <div
          ref={rootRef}
          style={{ display: 'inline-flex', justifyContent: 'center', minWidth: '100%' }}
        >
          <TreeNode node={orgChartData} isRoot />
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 16 }}>
        {(
          [
            { label: 'Front Office', color: 'blue'   },
            { label: 'Logistics',    color: 'teal'   },
            { label: 'F&B',          color: 'green'  },
            { label: 'Sales',        color: 'orange' },
            { label: 'HR',           color: 'purple' },
            { label: 'Finance',      color: 'red'    },
          ] as const
        ).map(({ label, color }) => (
          <div key={color} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              width:           10,
              height:          10,
              borderRadius:    2,
              backgroundColor: COLOR_MAP[color].bg,
              border:          `1px solid ${COLOR_MAP[color].border}`,
              flexShrink:      0,
            }} />
            <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}