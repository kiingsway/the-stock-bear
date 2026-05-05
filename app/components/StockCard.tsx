import { IProduct } from "@/types"
import { Typography } from "antd"
import { CheckCircleFilled } from '@ant-design/icons'
import Stepper from "./Stepper"
import locations from "@/mocks/locations"
import styles from './ProductCard/ProductCard.module.scss'

const { Text } = Typography

interface Props {
  product: IProduct
  needed: number
  picked: number
  onPickedChange: (value: number) => void
}

export default function StockCard({ product, needed, picked, onPickedChange }: Props) {
  const location = locations.find(l => l.id === product.kLocationId)
  const remaining = Math.max(0, needed - picked)
  const isComplete = picked >= needed

  return (
    <div
      className={styles.card_container}
      style={{
        background: isComplete ? '#f0fdf4' : '#fff',
        border: isComplete ? '2px solid #4ade80' : '2px solid #e2e8f0',
      }}
    >
      
      {isComplete && <div className={styles.status_indicator} />}

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
          <div style={{ marginTop: 2 }}>
            <Text style={{ fontSize: 13, color: '#94a3b8', marginTop: 2, fontStyle: needed ? 'initial' : 'italic', fontFamily: "'DM Sans', sans-serif" }}>
              {needed ? (
                <>
                  Required:{' '}
                  <strong style={{ color: '#64748b' }}>{needed}</strong>
                </>
              ) : 'No refill needed'}
            </Text>
          </div>
        </div>
        {isComplete ? (
          <CheckCircleFilled
            style={{ fontSize: 22, color: '#4ade80', cursor: product.par > 0 ? 'pointer' : 'default' }}
            onClick={() => picked > 0 ? onPickedChange(0) : undefined}
          />
        ) : (
          <div
            onClick={() => onPickedChange(product.par)}
            style={{
              background: remaining > 0 ? '#fef3c7' : '#f0fdf4',
              color: remaining > 0 ? '#92400e' : '#166534',
              borderRadius: 8,
              padding: '3px 10px',
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "'DM Mono', monospace",
              cursor: 'pointer'
            }}
          >
            {remaining > 0 ? `Left: ${remaining}` : 'Done'}
          </div>
        )}
      </div>


      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 13, color: '#64748b', fontFamily: "'DM Sans', sans-serif" }}>
          {location?.title || `Unknown location (#${product.kLocationId})`}
        </Text>
        {!needed ? <></> : <Stepper
          value={picked}
          onChange={(v) => onPickedChange(Math.min(v, needed))}
          accentColor="#f97316"
        />}
      </div>
    </div>
  )
}