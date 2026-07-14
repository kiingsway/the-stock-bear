import { JSX } from "react";
import StatPill, { StatPillProps } from "../StatPill";
import { IProduct, Modes } from "@/types";
import tasks from "@/mocks/tasks";

interface Props {
  mode: Modes
  products: IProduct[]
  kitchenCount: Record<number, number>
  picked: Record<number, number>
  todo: Record<number, boolean>
}

export default function StatsBar({ mode, products, kitchenCount, picked, todo }: Props): JSX.Element {

  const info: Record<Modes, { pill1: StatPillProps, pill2?: StatPillProps }> = {
    kitchen: {
      pill1: {
        label: "Items counted",
        color: "#6366f1",
        total: products.length,
        value: products.filter((p) => (kitchenCount[p.id] ?? 0) > 0).length
      },
      pill2: {
        label: "Complete",
        color: "#4ade80",
        total: products.length,
        value: products.filter((p) => Math.max(0, p.par - (kitchenCount[p.id] ?? 0)) === 0).length
      },
    },
    stock: {
      pill1: {
        label: "Items picked",
        color: "#f97316",
        total: products.filter((p) => Math.max(0, p.par - (kitchenCount[p.id] ?? 0)) > 0).length,
        value: products.filter((p) => {
          const needed = Math.max(0, p.par - (kitchenCount[p.id] ?? 0))
          return (picked[p.id] ?? 0) >= needed && needed > 0
        }).length
      },
      pill2: {
        label: "Still needed",
        color: "#fbbf24",
        total: products.length,
        value: products.filter((p) => {
          const needed = Math.max(0, p.par - (kitchenCount[p.id] ?? 0))
          return needed > (picked[p.id] ?? 0)
        }).length
      },
    },
    tasks: {
      pill1: {
        label: "Tasks done",
        color: "#3b82f6",
        total: tasks.length,
        value: tasks.filter(task => todo[task.id]).length
      },
    },
  }

  const pillProps = info[mode]

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
      <StatPill {...pillProps.pill1} />
      {pillProps.pill2 && <StatPill {...pillProps.pill2} />}
    </div>
  );
}