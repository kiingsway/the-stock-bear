import { JSX } from 'react';
import KitchenCard from '../KitchenCard';
import StockCard from '../StockCard';
import { IProduct } from '@/types';

interface Props {
  sortedProducts: IProduct[]
  kitchenCount: Record<number, number>
  picked: Record<number, number>
  isKitchen: boolean
  handleChange: (id: number, v: number, isKitchen: boolean) => void
}

export default function ItemsList({ handleChange, isKitchen, kitchenCount, picked, sortedProducts }: Props): JSX.Element {
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

        return isKitchen ? (
          <KitchenCard
            key={product.id}
            product={product}
            count={count}
            onCountChange={v => handleChange(product.id, v, isKitchen)}
          />
        ) : (
          <StockCard
            key={product.id}
            product={product}
            needed={needed}
            picked={pickedVal}
            onPickedChange={v => handleChange(product.id, v, isKitchen)}
          />
        )

        // return (
        //   <div key={product.id}>
        //     <ProductCard
        //       product={product}
        //       count={count}
        //       onCountChange={v => handleChange(product.id, v, isKitchen ? 'kitchen' : 'stock')}
        //       needed={needed}
        //       picked={pickedVal}
        //       local={isKitchen ? 'kitchen' : 'stock'} />
        //     {isKitchen ? (
        //       <KitchenCard
        //         product={product}
        //         count={count}
        //         onCountChange={v => handleKitchenChange(product.id, v)}
        //       />
        //     ) : (
        //       <StockCard
        //         product={product}
        //         needed={needed}
        //         picked={pickedVal}
        //         onPickedChange={v => handlePickedChange(product.id, v)}
        //       />
        //     )}
        //   </div>
        // )
      })}
    </div>
  );
}