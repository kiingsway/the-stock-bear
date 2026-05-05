import { MinusOutlined, PlusOutlined } from '@ant-design/icons'

interface Props {
  value: number
  onChange: (v: number) => void
  min?: number
  accentColor: string
}

export default function Stepper({ value, onChange, min = 0, accentColor }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        style={{
          width: 44,
          height: 44,
          borderRadius: '12px 0 0 12px',
          border: `2px solid ${accentColor}`,
          borderRight: 'none',
          background: 'transparent',
          color: accentColor,
          fontSize: 20,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <MinusOutlined />
      </button>
      <div
        style={{
          width: 52,
          height: 44,
          border: `2px solid ${accentColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          fontWeight: 700,
          fontFamily: "'DM Mono', monospace",
          color: '#1a1a2e',
          background: '#fff',
          flexShrink: 0,
        }}
      >
        {value}
      </div>
      <button
        onClick={() => onChange(value + 1)}
        style={{
          width: 44,
          height: 44,
          borderRadius: '0 12px 12px 0',
          border: `2px solid ${accentColor}`,
          borderLeft: 'none',
          background: accentColor,
          color: '#fff',
          fontSize: 20,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <PlusOutlined />
      </button>
    </div>
  )
}