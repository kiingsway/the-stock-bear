"use client"
import { JSX, useCallback, useEffect, useState } from 'react'
import { ConfigProvider, theme } from 'antd'
import products from '@/mocks/products'
import { loadLS, saveLS } from '@/app/helpers/ls'
import { Modes } from '@/types'
import Footer from './components/App/Footer'
import StatsBar from './components/App/StatsBar'
import Header from './components/App/Header'
import ItemsList from './components/App/ItemsList'
import { getAccentColor, LS_KEY } from './helpers/consts'

export default function Home(): JSX.Element {
  const [mode, setMode] = useState<Modes>('kitchen')
  const [kitchenCount, setKitchenCount] = useState<Record<number, number>>({})
  const [picked, setPicked] = useState<Record<number, number>>({})
  const [todo, setTodo] = useState<Record<number, boolean>>({})

  // Load from localStorage on mount
  useEffect(() => {
    setKitchenCount(loadLS(LS_KEY.kitchen))
    setPicked(loadLS(LS_KEY.stock))
    setTodo(loadLS(LS_KEY.tasks))
  }, [])

  const handleChange = useCallback(
    (id: number, value: number | boolean, mode: Modes) => {
      const ls = LS_KEY[mode];

      if (mode === "tasks") {
        setTodo((prev) => {
          const next = { ...prev, [id]: value as boolean };
          saveLS(ls, next);
          return next;
        });

        return;
      }


      (mode === 'kitchen' ? setKitchenCount : setPicked)((prev) => {
        const next = { ...prev, [id]: value as number };
        saveLS(ls, next);
        return next;
      });
    },
    []
  );

  const handleReset = () => {
    localStorage.removeItem(LS_KEY.kitchen)
    localStorage.removeItem(LS_KEY.stock)
    localStorage.removeItem(LS_KEY.tasks)
    setKitchenCount({})
    setPicked({})
    setTodo({})
  }

  const sortedProducts = [...products].sort((a, b) =>
    mode === 'kitchen'
      ? a.kLocationId - b.kLocationId
      : a.sLocationId - b.sLocationId
  )

  const accentColor = getAccentColor(mode)

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: accentColor.accent,
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
          mode={mode}
          onModeChange={setMode}
          accent={accentColor.gradient}
        />

        {/* ── Stats bar ── */}
        <StatsBar
          mode={mode}
          products={products}
          kitchenCount={kitchenCount}
          picked={picked}
          todo={todo}
        />

        {/* ── List ── */}
        <ItemsList
          sortedProducts={sortedProducts}
          kitchenCount={kitchenCount}
          picked={picked}
          mode={mode}
          todo={todo}
          onChange={handleChange} />

        {/* ── Footer ── */}
        <Footer onResetCount={handleReset} />
      </div>
    </ConfigProvider>
  )
}
