'use client'

import { useTranslation } from 'react-i18next'
import ListGroup from '@/components/ListGroup/ListGroup'
import ProductRow from '@/components/ProductRow/ProductRow'
import { locations, products } from '@/data'
import { orderItems, useAppState } from '@/store/store'
import type { MainLocationNames } from '@/types'
import styles from './ProductList.module.css'

const locationTitle = (id: number) => locations.find((l) => l.id === id)?.title

export default function ProductList({ list }: { list: MainLocationNames }) {
  const { t } = useTranslation()
  const { products: progress, settings } = useAppState()
  const other: MainLocationNames = list === 'kitchen' ? 'stock' : 'kitchen'
  const status = (id: number) => progress[id][list]

  const groups = locations
    .filter((l) => l.floor === list)
    .map((location) => {
      const items = products.filter((p) => p.locationsId[list] === location.id)
      return {
        location,
        items: orderItems(items, status, settings.moveDoneToEnd),
        openCount: items.filter((p) => !status(p.id).done).length,
      }
    })
    .filter((g) => g.items.length > 0)

  // Finished locations sink too, so the next stop is always on top.
  const ordered = settings.moveDoneToEnd
    ? [...groups.filter((g) => g.openCount > 0), ...groups.filter((g) => g.openCount === 0)]
    : groups

  if (ordered.length === 0) {
    return <p className={styles.empty}>{t('lists.empty')}</p>
  }

  return (
    <div className={styles.wrap}>
      {ordered.map(({ location, items, openCount }) => (
        <ListGroup
          key={location.id}
          name={`group-${location.id}`}
          title={location.title}
          openCount={openCount}
        >
          {items.map((product) => (
            <ProductRow
              key={product.id}
              list={list}
              product={product}
              progress={progress[product.id]}
              otherLocation={locationTitle(product.locationsId[other])}
              hand={settings.hand}
            />
          ))}
        </ListGroup>
      ))}
    </div>
  )
}
