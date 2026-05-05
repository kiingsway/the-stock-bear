import { IProduct } from "@/types"
import { Typography } from "antd"
import { CheckCircleFilled } from '@ant-design/icons'
import Stepper from "./Stepper"

const { Text } = Typography

interface Props {
  product: IProduct
  needed: number
  picked: number
  onPickedChange: (value: number) => void
}

export default function StockCard({ product, needed, picked, onPickedChange }: Props) {
  const remaining = Math.max(0, needed - picked)
  const isComplete = picked >= needed

  return (
    <div
      style={{
        background: isComplete ? '#f0fdf4' : '#fff',
        border: isComplete ? '2px solid #4ade80' : '2px solid #e2e8f0',
        borderRadius: 16,
        padding: '16px 18px',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {isComplete && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 4,
            height: '100%',
            background: '#4ade80',
            borderRadius: '16px 0 0 16px',
          }}
        />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: isComplete ? '#166534' : '#1a1a2e',
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: '-0.3px',
            }}
          >
            {product.name}
          </Text>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>
            Required:{' '}
            <strong style={{ color: '#64748b' }}>{needed}</strong>
          </div>
        </div>
        {isComplete ? (
          <CheckCircleFilled style={{ fontSize: 22, color: '#4ade80' }} />
        ) : (
          <div
            style={{
              background: remaining > 0 ? '#fef3c7' : '#f0fdf4',
              color: remaining > 0 ? '#92400e' : '#166534',
              borderRadius: 8,
              padding: '3px 10px',
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {remaining > 0 ? `Left: ${remaining}` : 'Done'}
          </div>
        )}
      </div>
      {needed === 0 ? (
        <Text style={{ fontSize: 13, color: '#94a3b8', fontStyle: 'italic', fontFamily: "'DM Sans', sans-serif" }}>
          No refill needed
        </Text>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 13, color: '#64748b', fontFamily: "'DM Sans', sans-serif" }}>
            Picked up
          </Text>
          <Stepper
            value={picked}
            onChange={(v) => onPickedChange(Math.min(v, needed))}
            accentColor="#f97316"
          />
        </div>
      )}
    </div>
  )
}