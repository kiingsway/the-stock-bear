import { JSX } from "react";
import StatPill from "../StatPill";
import { IProduct } from "@/types";

interface Props {
  isKitchen: boolean
  products: IProduct[]
  kitchenCount: Record<number, number>
  picked: Record<number, number>
}

export default function StatsBar({ isKitchen, products, kitchenCount, picked }: Props): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        background: '#1A1A1A',
        borderBottom: '1px solid #333',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: '10px 20px',
        gap: 16,
      }}
    >
      {isKitchen ? (
        <>
          <StatPill
            label="Items counted"
            value={products.filter((p) => (kitchenCount[p.id] ?? 0) > 0).length}
            total={products.length}
            color="#6366f1"
          />
          <StatPill
            label="Complete"
            value={products.filter((p) => Math.max(0, p.par - (kitchenCount[p.id] ?? 0)) === 0).length}
            total={products.length}
            color="#4ade80"
          />
        </>
      ) : (
        <>
          <StatPill
            label="Items picked"
            value={products.filter((p) => {
              const needed = Math.max(0, p.par - (kitchenCount[p.id] ?? 0))
              return (picked[p.id] ?? 0) >= needed && needed > 0
            }).length}
            total={products.filter((p) => Math.max(0, p.par - (kitchenCount[p.id] ?? 0)) > 0).length}
            color="#f97316"
          />
          <StatPill
            label="Still needed"
            value={products.filter((p) => {
              const needed = Math.max(0, p.par - (kitchenCount[p.id] ?? 0))
              return needed > (picked[p.id] ?? 0)
            }).length}
            total={products.length}
            color="#fbbf24"
          />
        </>
      )}
    </div>
  );
}