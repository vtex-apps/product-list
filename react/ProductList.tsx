import type { ReactNode } from 'react'
import React, { useMemo, memo, useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import type { Item } from 'vtex.checkout-graphql'
import { useCssHandles } from 'vtex.css-handles'

import { ItemContextProvider } from './ItemContext'
import { AVAILABLE } from './constants/Availability'
import { CALL_CENTER_OPERATOR } from './constants/User'
import LazyRender from './LazyRender'
import { fetchWithRetry } from './utils/fetchWithRetry'

type TotalItemsType =
  | 'total'
  | 'distinct'
  | 'totalAvailable'
  | 'distinctAvailable'

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
  onRemove: (uniqueId: string, item?: ItemWithIndex) => void
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
  extends Pick<Props, 'onQuantityChange' | 'onRemove'> {
  item: ItemWithIndex
  itemIndex: number
  loading: boolean
  children: ReactNode
  shouldAllowManualPrice: boolean
  onSetManualPrice?: (price: number, itemIndex: number) => void
  lazyRenderHeight?: number
  lazyRenderOffset?: number
}

const ItemContextWrapper = memo<ItemWrapperProps>(function ItemContextWrapper({
  item,
  itemIndex,
  loading,
  onQuantityChange,
  onRemove,
  children,
  shouldAllowManualPrice,
  onSetManualPrice,
  lazyRenderHeight,
  lazyRenderOffset,
}) {
  const context = useMemo(
    () => ({
      item,
      itemIndex,
      loading,
      shouldAllowManualPrice,
      onQuantityChange: (value: number) =>
        onQuantityChange(item.uniqueId, value, item),
      onRemove: () => onRemove(item.uniqueId, item),
      onSetManualPrice: (price: number, index: number) =>
        onSetManualPrice?.(price, index),
    }),
    [
      item,
      itemIndex,
      loading,
      onQuantityChange,
      onRemove,
      onSetManualPrice,
      shouldAllowManualPrice,
    ]
  )

  return (
    <LazyRender height={lazyRenderHeight} offset={lazyRenderOffset}>
      <ItemContextProvider value={context}>{children}</ItemContextProvider>
    </LazyRender>
  )
})

const countCartItems = (countMode: TotalItemsType, arr: Item[]) => {
  if (countMode === 'distinctAvailable') {
    return arr.reduce((itemQuantity: number, item: Item) => {
      if (item.availability === 'available') {
        return itemQuantity + 1
      }

      return itemQuantity
    }, 0)
  }

  if (countMode === 'totalAvailable') {
    return arr.reduce((itemQuantity: number, item: Item) => {
      if (item.availability === 'available') {
        return itemQuantity + Number(item.quantity)
      }

      return itemQuantity
    }, 0)
  }

  if (countMode === 'total') {
    return arr.reduce((itemQuantity: number, item: Item) => {
      return itemQuantity + Number(item.quantity)
    }, 0)
  }

  // countMode === 'distinct'
  return arr.length
}

const ProductList = memo<Props>(function ProductList(props) {
  const {
    items,
    itemCountMode = 'distinct',
    lazyRenderHeight = 100,
    lazyRenderOffset = 300,
    userType = 'STORE_USER',
    allowManualPrice = false,
    children,
  } = props

  const shouldAllowManualPrice =
    allowManualPrice && userType === CALL_CENTER_OPERATOR

  const handles = useCssHandles(CSS_HANDLES)

  const [packagesSkuIds, setPackagesSkuIds] = useState<string[]>([])
  const [sgrSkuIds, setSgrSkuIds] = useState<string[]>([])

  useEffect(() => {
    let isSubscribed = true

    fetchWithRetry('/_v/private/api/cart-bags-manager/app-settings', 3).then(
      (res: PackagesSkuIds) => {
        if (res && isSubscribed) {
          try {
            const { bagsSettings, sgrSettings } = (res && res.data) ?? {}

            setPackagesSkuIds(Object.values(bagsSettings))

            const allSkuIds: string[] = []

            Object.values(sgrSettings).forEach((sgrType) => {
              if (sgrType && sgrType.skuIds) {
                allSkuIds.push(...sgrType.skuIds)
              }
            })

            setSgrSkuIds(allSkuIds)
          } catch (error) {
            console.error('Error in packages feature.', error)
          }
        }
      }
    )

    return () => {
      isSubscribed = false
    }
  }, [])

  const [availableItems, unavailableItems] = items
    .map((item, index) => ({ ...item, index }))
    .reduce<ItemWithIndex[][]>(
      (acc, item) => {
        if (
          item.productId &&
          (packagesSkuIds.includes(item.productId) ||
            sgrSkuIds.includes(item.productId))
        ) {
          return acc
        }

        acc[item.availability === AVAILABLE ? 0 : 1].push(item)

        return acc
      },
      [[], []]
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
      {unavailableItems.map((item) => {
        return (
          <ItemContextWrapper
            key={`${item.uniqueId}-${item.sellingPrice}-${item.index}`}
            item={item}
            itemIndex={item.index}
            shouldAllowManualPrice={shouldAllowManualPrice}
            {...props}
            lazyRenderHeight={lazyRenderHeight}
            lazyRenderOffset={lazyRenderOffset}
          >
            {children}
          </ItemContextWrapper>
        )
      })}
      {unavailableItems.length > 0 && availableItems.length > 0 ? (
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
      {availableItems.map((item) => {
        return (
          <ItemContextWrapper
            key={`${item.uniqueId}-${item.sellingPrice}-${item.index}`}
            item={item}
            itemIndex={item.index}
            shouldAllowManualPrice={shouldAllowManualPrice}
            {...props}
            lazyRenderHeight={lazyRenderHeight}
            lazyRenderOffset={lazyRenderOffset}
          >
            {children}
          </ItemContextWrapper>
        )
      })}
    </div>
  )
})

export default ProductList
