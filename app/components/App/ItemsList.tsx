import { JSX } from 'react';
import KitchenCard from '../KitchenCard';
import StockCard from '../StockCard';
import { IProduct, Modes } from '@/types';

interface Props {
  sortedProducts: IProduct[]
  kitchenCount: Record<number, number>
  picked: Record<number, number>
  mode: Exclude<Modes, 'tasks'>
  handleChange: (id: number, v: number | boolean, mode: Modes) => void
}

export default function ItemsList({ handleChange, kitchenCount, picked, sortedProducts, mode }: Props): JSX.Element {
  return (
    <div
      style={{
        flex: 1,
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        overflowY: 'auto',
      }}
    >
      {sortedProducts.map((product) => {
        const count = kitchenCount[product.id] ?? 0
        const needed = Math.max(0, product.par - count)
        const pickedVal = picked[product.id] ?? 0

        return mode === 'kitchen' ? (
          <KitchenCard
            key={product.id}
            product={product}
            count={count}
            onCountChange={v => handleChange(product.id, v, mode)}
          />
        ) : (
          <StockCard
            key={product.id}
            product={product}
            needed={needed}
            picked={pickedVal}
            onPickedChange={v => handleChange(product.id, v, mode)}
          />
        )
      })}
    </div>
  );
}