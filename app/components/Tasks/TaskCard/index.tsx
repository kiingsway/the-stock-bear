import { ITask } from '@/types'
import { useCallback, type JSX } from 'react'
import styles from './TaskCard.module.scss'
import locations from '@/mocks/locations'

interface CardProps {
  task: ITask
  checked: boolean
  onToggle: (id: number, checked: boolean) => void
}

export default function TaskCard({ task, checked, onToggle }: CardProps): JSX.Element {
  const handleClick = useCallback(() => {
    onToggle(task.id, !checked)
  }, [task.id, checked, onToggle])

  const location = locations.find(l => l.id === task.locationId)

  return (
    <div
      className={`${styles.card} ${checked ? styles.checked : ''}`}
      onClick={handleClick}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        readOnly
        className={styles.checkbox}
        // evita o clique duplo (input + card)
        onClick={(e) => e.stopPropagation()}
      />

      <div className={styles.info}>
        <span className={styles.name}>{task.name}</span>

        {!checked && (
          <>
            {task.desc && (
              <span className={styles.desc}>{task.desc}</span>
            )}

            {location && (
              <span className={styles.location}>
                {location.title}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  )
}
