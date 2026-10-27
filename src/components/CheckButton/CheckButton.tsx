import { CheckIcon } from '@/components/icons'
import styles from './CheckButton.module.css'

interface CheckButtonProps {
  done: boolean
  label: string
  onToggle: () => void
}

export default function CheckButton({ done, label, onToggle }: CheckButtonProps) {
  return (
    <button
      type="button"
      className={styles.hit}
      aria-pressed={done}
      aria-label={label}
      onClick={onToggle}
    >
      <span className={`${styles.box} ${done ? styles.done : ''}`}>
        <CheckIcon size={14} strokeWidth={3} />
      </span>
    </button>
  )
}
