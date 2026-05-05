import { IProduct } from "@/types"
import { CheckCircleFilled } from '@ant-design/icons'
import Stepper from "./Stepper"
import { Typography } from "antd"

const { Text } = Typography

interface Props {
  product: IProduct
  count: number
  onCountChange: (value: number) => void
}

export default function KitchenCard({ product, count, onCountChange }: Props) {
  const needed = Math.max(0, product.par - count)
  const isComplete = needed === 0

  return (
    <div
      style={{
        background: isComplete ? '#f0fdf4' : '#fff',
        border: isComplete ? '1px solid #4ade80' : '2px solid #e2e8f0',
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
              fontSize: 16,
              fontWeight: 700,
              color: isComplete ? '#166534' : '#1a1a2e',
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: '-0.3px',
            }}
          >
            {product.name}
          </Text>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>
            Par level: <strong style={{ color: '#64748b' }}>{product.par}</strong>
          </div>
        </div>
        {isComplete ? (
          <CheckCircleFilled
            style={{ fontSize: 22, color: '#4ade80', cursor: product.par > 0 ? 'pointer' : 'default' }}
            onClick={() => product.par > 0 ? onCountChange(0) : undefined}
          />
        ) : (
          <div
            style={{
              background: '#fef3c7',
              color: '#92400e',
              borderRadius: 8,
              padding: '3px 10px',
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "'DM Mono', monospace",
              cursor: 'pointer'
            }}
            onClick={() => onCountChange(product.par)}
          >
            Need {needed}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 13, color: '#64748b', fontFamily: "'DM Sans', sans-serif" }}>
          In kitchen
        </Text>
        <Stepper
          value={count}
          onChange={(v) => onCountChange(v)}
          accentColor="#6366f1"
        />
      </div>
    </div>
  )
}