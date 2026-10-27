import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { PinIcon } from '@/components/icons'
import styles from './ListGroup.module.css'

interface ListGroupProps {
  title?: string
  openCount: number
  name: string
  children: ReactNode
}

export default function ListGroup({ title, openCount, name, children }: ListGroupProps) {
  const { t } = useTranslation()
  const allDone = openCount === 0

  return (
    <section
      className={`${styles.group} ${allDone ? styles.allDone : ''}`}
      style={{ viewTransitionName: name }}
    >
      {title && (
        <header className={styles.head}>
          <span className={styles.title}>
            <PinIcon size={11} />
            {title}
          </span>
          <span className={styles.count}>
            {allDone ? t('lists.allDone') : t('lists.left', { count: openCount })}
          </span>
        </header>
      )}
      <ul className={styles.list}>{children}</ul>
    </section>
  )
}
