import tasks from "@/mocks/tasks";
import TaskCard from "./TaskCard";
import styles from './Tasks.module.scss'

interface Props {
  todo: Record<number, boolean>;
  onChange: (id: number, value: number | boolean, mode: 'tasks') => void;
}

export default function Tasks({ todo, onChange }: Props) {
  return (
    <div className={styles.list}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          checked={todo[task.id] ?? false}
          onToggle={() =>
            onChange(task.id, !(todo[task.id] ?? false), 'tasks')
          }
        />
      ))}
    </div>
  );
}