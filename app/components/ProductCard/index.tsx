import locations from '@/mocks/locations';
import { IProduct } from '@/types';
import { JSX } from 'react';
import styles from './ProductCard.module.scss'
import { Typography } from 'antd';
import Stepper from '../Stepper';
import { CheckCircleFilled } from '@ant-design/icons'

const { Text } = Typography

interface StockProps {
  local: 'stock'
  needed: number
  picked: number
  // onPickedChange: (value: number) => void
}

interface KitchenProps {
  local: 'kitchen'
  count: number
}

type Props = (StockProps | KitchenProps) & {
  product: IProduct
  onCountChange: (value: number) => void
}

export default function ProductCard(p: Props): JSX.Element {
  const isKitchen = p.local === 'kitchen'
  const location = locations.find(l => l.id === (isKitchen ? p.product.kLocationId : p.product.sLocationId))
  const left = isKitchen ? Math.max(0, p.product.par - p.count) : Math.max(0, p.needed - p.picked)
  const isComplete = isKitchen ? left === 0 : p.picked >= p.needed

  return (
    <div
      className={styles.card_container}
      style={{
        background: isComplete ? '#f0fdf4' : '#fff',
        border: isComplete ? '1px solid #4ade80' : '2px solid #e2e8f0',
      }}
    >
      <StatusIndicator isComplete={isComplete} />

      <Header
        name={p.product.name}
        isComplete={isComplete}
        par={p.product.par}
        left={left}
        // needed={p.needed}
        needed={0}
        onCountChange={p.onCountChange}
      />

      <div className={styles.footer_row}>
        <Text className={styles.location_text}>
          {location?.title || `Unknown location (#${p.product.kLocationId})`}
        </Text>
        <Stepper
          // value={p?.count || 0}
          value={0}
          max={p.product.par}
          onChange={p.onCountChange}
          accentColor="#6366f1"
        />
      </div>
    </div>
  );
}

const StatusIndicator = ({ isComplete }: { isComplete: boolean }): JSX.Element => !isComplete ? <></> : (
  <div className={styles.status_indicator} />
)

interface HeaderProps {
  name: string
  isComplete: boolean;
  left: number;
  par: number;
  needed: number;
  onCountChange: (value: number) => void
}

const Header = ({ name, isComplete, par, needed, left, onCountChange }: HeaderProps): JSX.Element => (
  <div className={styles.header_row}>
    <div>
      <Text
        className={styles.product_title}
        style={{ color: isComplete ? '#166534' : '#1a1a2e' }}
      >
        {name}
      </Text>
      <div className={styles.par_level_text}>
        Par level: <strong>{par}</strong>
      </div>
    </div>

    {isComplete ? (
      <CheckCircleFilled
        className={styles.checkicon}
        onClick={() => (par > 0 ? onCountChange(0) : undefined)}
        style={{ cursor: par > 0 ? 'pointer' : 'default' }}
      />
    ) : (
      <div
        className={styles.need_badge}
        onClick={() => onCountChange(par)}
        style={{
          background: left > 0 ? '#fef3c7' : '#f0fdf4',
          color: left > 0 ? '#92400e' : '#166534',
        }}
      >
        Need {needed}
      </div>
    )}
  </div>
)