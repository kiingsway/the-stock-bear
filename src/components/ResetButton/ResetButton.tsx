'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ResetIcon } from '@/components/icons'
import { resetAll } from '@/store/store'
import styles from './ResetButton.module.css'

interface ResetButtonProps {
  variant?: 'icon' | 'wide'
  label?: string
  onReset?: () => void
}

/** Two taps to restore everything, so it is never triggered by accident. */
export default function ResetButton({ variant = 'icon', label, onReset }: ResetButtonProps) {
  const { t } = useTranslation()
  const [armed, setArmed] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  function handleClick() {
    clearTimeout(timer.current)
    if (armed) {
      setArmed(false)
      resetAll()
      onReset?.()
      return
    }
    setArmed(true)
    timer.current = setTimeout(() => setArmed(false), 2500)
  }

  return (
    <button
      type="button"
      className={`${styles.btn} ${styles[variant]} ${armed ? styles.armed : ''}`}
      onClick={handleClick}
      aria-label={armed ? t('actions.resetConfirm') : (label ?? t('actions.reset'))}
    >
      <ResetIcon size={variant === 'icon' ? 15 : 14} />
      {(variant === 'wide' || armed) && (
        <span className={styles.text}>{armed ? t('actions.resetConfirm') : (label ?? t('actions.reset'))}</span>
      )}
    </button>
  )
}
