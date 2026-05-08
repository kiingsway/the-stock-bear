"use client"
import { JSX, useCallback, useEffect, useState } from 'react'
import { ConfigProvider, theme } from 'antd'
import products from '@/mocks/products'
import { loadLS, saveLS } from '@/app/helpers/ls'
import { LocationNames } from '@/types'
import Footer from './components/App/Footer'
import StatsBar from './components/App/StatsBar'
import Header from './components/App/Header'
import ItemsList from './components/App/ItemsList'

const LS_KITCHEN = 'sr_kitchenCount'
const LS_PICKED = 'sr_picked'

export type TTabs = 'count' | 'stock'

export default function Home(): JSX.Element {
  const [mode, setMode] = useState<LocationNames>('kitchen')
  const [sortBy, setSortBy] = useState<LocationNames>('kitchen')
  const [kitchenCount, setKitchenCount] = useState<Record<number, number>>({})
  const [picked, setPicked] = useState<Record<number, number>>({})

  // Load from localStorage on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
        <Header
          isKitchen={isKitchen}
          mode={mode}
          onModeChange={(v) => {
            const local = v ? 'stock' : 'kitchen';
            setMode(local);
            setSortBy(local);
          }}
        />

        {/* ── Stats bar ── */}
        <StatsBar
          isKitchen={isKitchen}
          products={products}
          kitchenCount={kitchenCount}
          picked={picked}
        />

        {/* ── List ── */}
        <ItemsList
          sortedProducts={sortedProducts}
          kitchenCount={kitchenCount}
          picked={picked}
          isKitchen={isKitchen}
          handleChange={handleChange} />

        {/* ── Footer ── */}
        <Footer onResetCount={handleReset} />
      </div>
    </ConfigProvider>
  )
}
