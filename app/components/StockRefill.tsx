/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { JSX, useCallback, useEffect, useState } from 'react'
import { Button, ConfigProvider, Switch, theme } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import products from '@/mocks/products'
import { loadLS, saveLS } from '@/app/helpers/ls'
import KitchenCard from './KitchenCard'
import StatPill from './StatPill'
import StockCard from './StockCard'
import { LocationNames } from '@/types'

const LS_KITCHEN = 'sr_kitchenCount'
const LS_PICKED = 'sr_picked'

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function StockRefill(): JSX.Element {
  const [mode, setMode] = useState<LocationNames>('kitchen')
  const [sortBy, setSortBy] = useState<LocationNames>('kitchen')
  const [kitchenCount, setKitchenCount] = useState<Record<number, number>>({})
  const [picked, setPicked] = useState<Record<number, number>>({})

  // Load from localStorage on mount
  useEffect(() => {
    setKitchenCount(loadLS(LS_KITCHEN))
    setPicked(loadLS(LS_PICKED))
  }, [])

  const handleChange = useCallback((id: number, v: number, isKitchen: boolean) => {
    const ls = isKitchen ? LS_KITCHEN : LS_PICKED;
    (isKitchen ? setKitchenCount : setPicked)((prev) => {
      const next = { ...prev, [id]: v }
      saveLS(ls, next)
      return next
    })
  }, [])

  const handleReset = () => {
    localStorage.removeItem(LS_KITCHEN)
    localStorage.removeItem(LS_PICKED)
    setKitchenCount({})
    setPicked({})
  }

  const sortedProducts = [...products].sort((a, b) =>
    sortBy === 'kitchen'
      ? a.kLocationId - b.kLocationId
      : a.sLocationId - b.sLocationId
  )

  const isKitchen = mode === 'kitchen'
  const accentColor = isKitchen ? '#6366f1' : '#f97316'

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: accentColor,
          borderRadius: 12,
          fontFamily: "'DM Sans', sans-serif",
        },
      }}
    >
      <div
        style={{
          maxWidth: 480,
          margin: '0 auto',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 10,
          width: '100%'
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            background: isKitchen
              ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
              : 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            padding: '20px 20px 10px',
            transition: 'background 0.35s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: '#fff',
                  letterSpacing: '-0.5px',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Stock Refill
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>
                {isKitchen ? 'Count what is in the kitchen' : 'Record what you picked up'}
              </div>
            </div>

            {/* Mode toggle */}
            <label
              style={{
                background: 'rgba(255,255,255,0.15)',
                borderRadius: 12,
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer', // Importante para o UX
              }}
            >
              <span style={{ fontSize: 12, color: '#fff', fontWeight: 600 }}>
                {isKitchen ? '🍳 Kitchen' : '📦 Stock'}
              </span>
              <Switch
                checked={mode === 'stock'}
                onChange={(v) => {
                  const local = v ? 'stock' : 'kitchen';
                  setMode(local);
                  setSortBy(local);
                }}
              />
            </label>
          </div>
        </div>

        {/* ── Stats bar ── */}
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

        {/* ── List ── */}
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

        {/* ── Footer ── */}
        <div
          style={{
            padding: '16px',
            background: '#1A1A1A',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderTop: '1px solid #333',
          }}
        >
          <Button
            danger
            icon={<ReloadOutlined />}
            onClick={handleReset}
            block
            size="large"
            style={{
              height: 50,
              fontWeight: 700,
              fontSize: 15,
              borderRadius: 14,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: '-0.2px',
            }}
          >
            Reset All Counts
          </Button>
        </div>
      </div>
    </ConfigProvider>
  )
}

