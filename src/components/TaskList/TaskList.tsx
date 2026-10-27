'use client'

import { useTranslation } from 'react-i18next'
import CheckButton from '@/components/CheckButton/CheckButton'
import ListGroup from '@/components/ListGroup/ListGroup'
import { PinIcon } from '@/components/icons'
import { locations, tasks } from '@/data'
import { countOpen, orderItems, toggleTask, useAppState } from '@/store/store'
import styles from './TaskList.module.css'

export default function TaskList() {
  const { t } = useTranslation()
  const state = useAppState()
  const { tasks: taskProgress, settings } = state
  const ordered = orderItems(tasks, (id) => taskProgress[id], settings.moveDoneToEnd)

  return (
    <ListGroup name="tasks" openCount={countOpen(state, 'tasks')}>
      {ordered.map((task) => {
        const done = taskProgress[task.id].done
        const location = locations.find((l) => l.id === task.locationId)?.title
        return (
          <li
            key={task.id}
            className={`${styles.row} ${settings.hand === 'left' ? styles.left : ''} ${done ? styles.done : ''}`}
            style={{ viewTransitionName: `task-${task.id}` }}
          >
            <button type="button" className={styles.body} onClick={() => toggleTask(task.id)}>
              <span className={styles.name}>{task.name}</span>
              {task.desc && <span className={styles.desc}>{task.desc}</span>}
              {location && (
                <span className={styles.location}>
                  <PinIcon size={10} />
                  {location}
                </span>
              )}
            </button>
            <CheckButton
              done={done}
              label={t(done ? 'item.uncomplete' : 'item.complete', { name: task.name })}
              onToggle={() => toggleTask(task.id)}
            />
          </li>
        )
      })}
    </ListGroup>
  )
}
