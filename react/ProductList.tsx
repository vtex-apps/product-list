import type { ReactNode } from 'react'
import React, { useMemo, memo, useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import type { Item } from 'vtex.checkout-graphql'
import { useCssHandles } from 'vtex.css-handles'

import { ItemContextProvider } from './ItemContext'
import { AVAILABLE } from './constants/Availability'
import { CALL_CENTER_OPERATOR } from './constants/User'
import LazyRender from './LazyRender'
import type { TotalItemsType } from './utils'
import { countCartItems, groupByUniqueId } from './utils'

interface Props {
  allowManualPrice?: boolean
  items: ItemWithIndex[]
  loading: boolean
  userType?: string
  itemCountMode?: TotalItemsType
  onQuantityChange: (
    uniqueId: string,
    value: number,
    item?: ItemWithIndex
  ) => void
  onUpdateItems: (items: ItemWithIndex[], itemsInCart?: ItemWithIndex[]) => void
  onSetManualPrice?: (price: number, itemIndex: number) => void
  lazyRenderHeight?: number
  lazyRenderOffset?: number
  children: ReactNode
}

interface ItemWithIndex extends Item {
  index: number
}

const CSS_HANDLES = [
  'productListItem',
  'productListUnavailableItemsMessage',
  'productListAvailableItemsMessage',
] as const

interface ItemWrapperProps
  extends Pick<Props, 'onQuantityChange' | 'onUpdateItems'> {
  items: ItemWithIndex[]
  itemIndex: number
  loading: boolean
  children: ReactNode
  shouldAllowManualPrice: boolean
  onSetManualPrice?: (price: number, itemIndex: number) => void
  lazyRenderHeight?: number
  lazyRenderOffset?: number
}

const getReferenceItem = (items: ItemWithIndex[]) => {
  let referenceItem = items[0]

  for (const item of items) {
    if (
      item.sellingPrice != null &&
      referenceItem.sellingPrice != null &&
      item.sellingPrice > referenceItem.sellingPrice
    ) {
      referenceItem = item
    }
  }

  return referenceItem
}

const updateItemsQuantity = (items: ItemWithIndex[], delta: number) => {
  let remaining = delta

  return items
    .map((item) => {
      if (remaining === 0) {
        return null
      }

      let quantity = item.quantity + remaining

      remaining = Math.min(quantity, 0)
      quantity = Math.max(quantity, 0)

      return {
        ...item,
        quantity,
      }
    })
    .filter((item): item is ItemWithIndex => item != null)
}

const ItemContextWrapper = memo<ItemWrapperProps>(function ItemContextWrapper({
  items,
  itemIndex,
  loading,
  onQuantityChange,
  onUpdateItems,
  children,
  shouldAllowManualPrice,
  onSetManualPrice,
  lazyRenderHeight,
  lazyRenderOffset,
}) {
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0)
  const referenceItem = useMemo(
    () => ({ ...getReferenceItem(items), quantity: totalQuantity }),
    [items, totalQuantity]
  )

  const handleQuantityChange = useCallback(
    (value: number) => {
      const quantityDifference = value - totalQuantity

      if (quantityDifference > 0) {
        onQuantityChange(
          referenceItem.uniqueId,
          items[0].quantity + quantityDifference,
          referenceItem
        )
      } else {
        onUpdateItems(updateItemsQuantity(items, quantityDifference), items)
      }
    },
    [items, onQuantityChange, referenceItem, totalQuantity, onUpdateItems]
  )

  const handleRemove = useCallback(() => {
    onUpdateItems(items.map((item) => ({ ...item, quantity: 0 })))
  }, [items, onUpdateItems])

  const context = useMemo(
    () => ({
      item: referenceItem,
      items,
      itemIndex,
      loading,
      shouldAllowManualPrice,
      onQuantityChange: handleQuantityChange,
      onRemove: handleRemove,
      onSetManualPrice: (price: number, index: number) =>
        onSetManualPrice?.(price, index),
    }),
    [
      items,
      referenceItem,
      itemIndex,
      loading,
      handleRemove,
      onSetManualPrice,
      shouldAllowManualPrice,
      handleQuantityChange,
    ]
  )

  return (
    <LazyRender height={lazyRenderHeight} offset={lazyRenderOffset}>
      <ItemContextProvider value={context}>{children}</ItemContextProvider>
    </LazyRender>
  )
})

const ProductList = memo<Props>(function ProductList(props) {
  const {
    items: products,
    itemCountMode = 'distinct',
    lazyRenderHeight = 100,
    lazyRenderOffset = 300,
    userType = 'STORE_USER',
    allowManualPrice = false,
    children,
    loading,
    onQuantityChange,
    onUpdateItems,
  } = props

  const shouldAllowManualPrice =
    allowManualPrice && userType === CALL_CENTER_OPERATOR

  const handles = useCssHandles(CSS_HANDLES)

  const [availableItems, unavailableItems] = useMemo(
    () =>
      products
        .map((item, index) => ({ ...item, index }))
        .reduce<ItemWithIndex[][]>(
          (acc, item) => {
            acc[item.availability === AVAILABLE ? 0 : 1].push(item)

            return acc
          },
          [[], []]
        ),
    [products]
  )

  const availableItemsByUniqueId = useMemo(
    () => availableItems.reduce<ItemWithIndex[][]>(groupByUniqueId, []),
    [availableItems]
  )

  const unavailableItemsByUniqueId = useMemo(
    () => unavailableItems.reduce<ItemWithIndex[][]>(groupByUniqueId, []),
    [unavailableItems]
  )

  return (
    /* Replacing the outer div by a Fragment may break the layout. See PR #39. */
    <div>
      {unavailableItems.length > 0 ? (
        <div
          id="unavailable-items"
          className={`${handles.productListUnavailableItemsMessage} c-muted-1 bb b--muted-4 fw5 pv5 pl5 pl6-m pl0-l t-heading-5-l`}
        >
          <FormattedMessage
            id="store/product-list.unavailableItems"
            values={{
              quantity: countCartItems(itemCountMode, unavailableItems),
            }}
          />
        </div>
      ) : null}
      {unavailableItemsByUniqueId.map((items) => {
        return (
          <ItemContextWrapper
            key={items[0].uniqueId}
            items={items}
            itemIndex={items[0].index}
            shouldAllowManualPrice={shouldAllowManualPrice}
            lazyRenderHeight={lazyRenderHeight}
            lazyRenderOffset={lazyRenderOffset}
            loading={loading}
            onQuantityChange={onQuantityChange}
            onUpdateItems={onUpdateItems}
          >
            {children}
          </ItemContextWrapper>
        )
      })}
      {unavailableItemsByUniqueId.length > 0 &&
      availableItemsByUniqueId.length > 0 ? (
        <div
          className={`${handles.productListAvailableItemsMessage} c-muted-1 bb b--muted-4 fw5 mt7 pv5 pl5 pl6-m pl0-l t-heading-5-l`}
        >
          <FormattedMessage
            id="store/product-list.availableItems"
            values={{
              quantity: countCartItems(itemCountMode, availableItems),
            }}
          />
        </div>
      ) : null}
      {availableItemsByUniqueId.map((items) => {
        return (
          <ItemContextWrapper
            key={items[0].uniqueId}
            items={items}
            itemIndex={items[0].index}
            shouldAllowManualPrice={shouldAllowManualPrice}
            lazyRenderHeight={lazyRenderHeight}
            lazyRenderOffset={lazyRenderOffset}
            loading={loading}
            onQuantityChange={onQuantityChange}
            onUpdateItems={onUpdateItems}
          >
            {children}
          </ItemContextWrapper>
        )
      })}
    </div>
  )
})

export default ProductList
