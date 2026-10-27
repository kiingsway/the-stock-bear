'use client'

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ResetButton from '@/components/ResetButton/ResetButton'
import { updateSettings, useAppState } from '@/store/store'
import { languageNames, languages } from '@/i18n'
import type { Hand, Language } from '@/types'
import styles from './SettingsSheet.module.css'

interface SettingsSheetProps {
  onClose: () => void
  onReset: () => void
}

const hands: Hand[] = ['left', 'right']

export default function SettingsSheet({ onClose, onReset }: SettingsSheetProps) {
  const { t } = useTranslation()
  const { settings } = useAppState()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.grip} />
        <h2 id="settings-title" className={styles.title}>
          {t('settings.title')}
        </h2>

        <label className={styles.row}>
          <span className={styles.text}>
            <span>{t('settings.language')}</span>
          </span>
          <select
            className={styles.select}
            value={settings.language}
            onChange={(e) => updateSettings({ language: e.target.value as Language })}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {languageNames[lang]}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.row}>
          <span className={styles.text}>
            <span>{t('settings.moveDoneToEnd')}</span>
            <span className={styles.hint}>{t('settings.moveDoneToEndHint')}</span>
          </span>
          <input
            type="checkbox"
            className={styles.switch}
            checked={settings.moveDoneToEnd}
            onChange={(e) => updateSettings({ moveDoneToEnd: e.target.checked })}
          />
        </label>

        <div className={styles.row}>
          <span className={styles.text}>
            <span>{t('settings.hand')}</span>
            <span className={styles.hint}>{t('settings.handHint')}</span>
          </span>
          <div className={styles.segment} role="radiogroup" aria-label={t('settings.hand')}>
            {hands.map((hand) => (
              <button
                key={hand}
                type="button"
                role="radio"
                aria-checked={settings.hand === hand}
                className={settings.hand === hand ? styles.active : ''}
                onClick={() => updateSettings({ hand })}
              >
                {t(`settings.${hand}`)}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.block}>
          <ResetButton variant="wide" label={t('settings.resetAll')} onReset={onReset} />
          <span className={styles.hint}>{t('settings.resetAllHint')}</span>
        </div>

        <button type="button" className={styles.close} onClick={onClose}>
          {t('actions.close')}
        </button>
      </div>
    </div>
  )
}
