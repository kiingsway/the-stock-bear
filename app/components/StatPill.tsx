import { JSX } from "react"

interface Props {
  label: string
  value: number
  total: number
  color: string
}

export default function StatPill({ label, value, total, color }: Props): JSX.Element {
  return (
    <div style={{ flex: 1 }}>
      <div
        style={{
          fontSize: 18,
          fontWeight: 900,
          color,
          fontFamily: "'DM Mono', monospace",
          lineHeight: 1,
        }}
      >
        {value}
        <span style={{ fontSize: 13, color: '#cbd5e1', fontWeight: 400 }}>/{total}</span>
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{label}</div>
    </div>
  )
}
