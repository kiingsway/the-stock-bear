'use client'

import i18n from '@/i18n'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ProductList from '@/components/ProductList/ProductList'
import ResetButton from '@/components/ResetButton/ResetButton'
import SettingsSheet from '@/components/SettingsSheet/SettingsSheet'
import TaskList from '@/components/TaskList/TaskList'
import { BoxIcon, GearIcon, ListIcon, PotIcon } from '@/components/icons'
import { countOpen, useAppState } from '@/store/store'
import type { ListName } from '@/types'
import styles from './AppShell.module.css'

const tabs = [
  { id: 'kitchen', Icon: PotIcon },
  { id: 'stock', Icon: BoxIcon },
  { id: 'tasks', Icon: ListIcon },
] as const satisfies { id: ListName; Icon: unknown }[]

const hints = {
  kitchen: 'lists.kitchenHint',
  stock: 'lists.stockHint',
  tasks: 'lists.tasksHint',
} as const

export default function AppShell() {
  const { t } = useTranslation()
  const state = useAppState()
  const [tab, setTab] = useState<ListName>('kitchen')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [toast, setToast] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const language = state.settings.language
  useEffect(() => {
    i18n.changeLanguage(language)
    document.documentElement.lang = language
  }, [language])

  const closeSettings = useCallback(() => setSettingsOpen(false), [])

  const showResetToast = useCallback(() => {
    clearTimeout(toastTimer.current)
    setToast(true)
    toastTimer.current = setTimeout(() => setToast(false), 1800)
  }, [])

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icon.svg" alt="" width={22} height={22} className={styles.logo} />
        <div className={styles.titles}>
          <h1 className={styles.title}>{t('app.name')}</h1>
          <p key={tab} className={styles.hint}>
            {t(hints[tab])}
          </p>
        </div>
        <ResetButton onReset={showResetToast} />
        <button
          type="button"
          className={styles.iconBtn}
          aria-label={t('actions.settings')}
          onClick={() => setSettingsOpen(true)}
        >
          <GearIcon size={15} />
        </button>
      </header>

      <main key={tab} className={styles.main}>
        {tab === 'tasks' ? <TaskList /> : <ProductList list={tab} />}
      </main>

      <nav className={styles.tabbar}>
        {tabs.map(({ id, Icon }) => {
          const open = countOpen(state, id)
          return (
            <button
              key={id}
              type="button"
              className={`${styles.tab} ${tab === id ? styles.active : ''}`}
              aria-current={tab === id ? 'page' : undefined}
              onClick={() => setTab(id)}
            >
              <span className={styles.tabIcon}>
                <Icon size={18} />
                {open > 0 && (
                  <span key={open} className={styles.badge}>
                    {open}
                  </span>
                )}
              </span>
              <span>{t(`tabs.${id}`)}</span>
            </button>
          )
        })}
      </nav>

      {toast && (
        <div className={styles.toast} role="status">
          {t('actions.resetDone')}
        </div>
      )}

      {settingsOpen && <SettingsSheet onClose={closeSettings} onReset={showResetToast} />}
    </div>
  )
}
