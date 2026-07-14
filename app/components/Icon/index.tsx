import { PropsWithChildren, ReactNode } from 'react';
import styles from './Icon.module.scss';

export default function Icon({ children }: PropsWithChildren) {
  return (
    <span className={styles.segmentIcon}>
      {children}
    </span>
  )
}
