'use client'

import { useTranslation } from 'react-i18next'
import CheckButton from '@/components/CheckButton/CheckButton'
import { ArrowIcon, MinusIcon, PlusIcon } from '@/components/icons'
import { changeNeed, changePicked, toggleProduct } from '@/store/store'
import type { Hand, IProduct, IProductProgress, MainLocationNames } from '@/types'
import styles from './ProductRow.module.css'

interface ProductRowProps {
  list: MainLocationNames
  product: IProduct
  progress: IProductProgress
  /** The other side of the trip: where it comes from (kitchen) or where it goes (stock). */
  otherLocation?: string
  hand: Hand
}

export default function ProductRow({ list, product, progress, otherLocation, hand }: ProductRowProps) {
  const { t } = useTranslation()
  const { id, name } = product
  const { need, picked } = progress
  const done = progress[list].done
  const isKitchen = list === 'kitchen'

  // Kitchen edits how many are needed; stock counts how many were picked out of that.
  const value = isKitchen ? need : picked
  const change = (delta: number) => (isKitchen ? changeNeed(id, delta) : changePicked(id, delta))

  return (
    <li
      className={`${styles.row} ${hand === 'left' ? styles.left : ''} ${done ? styles.done : ''}`}
      style={{ viewTransitionName: `${list}-${id}` }}
    >
      <button type="button" className={styles.body} onClick={() => toggleProduct(list, id)}>
        <span className={styles.name}>{name}</span>
        <span className={styles.sub}>
          {isKitchen ? (
            <>
              {otherLocation}
              {need > 0 && picked > 0 && (
                <span className={styles.picked}>· {t('item.picked', { picked, need })}</span>
              )}
            </>
          ) : (
            otherLocation && (
              <>
                <ArrowIcon size={10} /> {otherLocation}
              </>
            )
          )}
        </span>
      </button>

      <div className={styles.stepper}>
        <button
          type="button"
          className={styles.step}
          aria-label={t('item.decrease', { name })}
          onClick={() => change(-1)}
          disabled={value === 0}
        >
          <MinusIcon size={12} />
        </button>
        <span key={value} className={`${styles.qty} ${isKitchen && need === 0 ? styles.zero : ''}`}>
          {value}
          {!isKitchen && <span className={styles.par}>/{need}</span>}
        </span>
        <button
          type="button"
          className={styles.step}
          aria-label={t('item.increase', { name })}
          onClick={() => change(1)}
        >
          <PlusIcon size={12} />
        </button>
      </div>

      <CheckButton
        done={done}
        label={t(done ? 'item.uncomplete' : 'item.complete', { name })}
        onToggle={() => toggleProduct(list, id)}
      />
    </li>
  )
}
