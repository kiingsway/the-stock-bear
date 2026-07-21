import { JSX } from 'react';
import KitchenCard from '../KitchenCard';
import StockCard from '../StockCard';
import { IProduct, Modes } from '@/types';
import tasks from '@/mocks/tasks';
import TaskCard from '../TaskCard';

interface Props {
  sortedProducts: IProduct[]
  mode: Modes
  kitchenCount: Record<number, number>
  picked: Record<number, number>
  todo: Record<number, boolean>
  onChange: (id: number, v: number | boolean, mode: Modes) => void
}

export default function ItemsList({ onChange, todo, kitchenCount, picked, sortedProducts, mode }: Props): JSX.Element {
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
      {mode === 'tasks' ? (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            checked={todo[task.id] ?? false}
            onToggle={() =>
              onChange(task.id, !(todo[task.id] ?? false), 'tasks')
            }
          />
        ))
      ) : sortedProducts.map((product) => {
        const count = kitchenCount[product.id] ?? 0
        const needed = Math.max(0, product.par - count)
        const pickedVal = picked[product.id] ?? 0

        if (mode === 'kitchen') return (
          <KitchenCard
            key={product.id}
            product={product}
            count={count}
            onCountChange={v => onChange(product.id, v, mode)}
          />
        )

        if (mode === 'stock') return (
          <StockCard
            key={product.id}
            product={product}
            needed={needed}
            picked={pickedVal}
            onPickedChange={v => onChange(product.id, v, mode)}
          />
        )

      })}
    </div>
  );
}