import type { ReactNode } from 'react'
import React, { useMemo, memo, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import type { Item } from 'vtex.checkout-graphql'
import { useCssHandles } from 'vtex.css-handles'
import { OrderForm } from 'vtex.order-manager'

import { ItemContextProvider } from './ItemContext'
import { AVAILABLE, WITHOUT_STOCK } from './constants/Availability'
import { CALL_CENTER_OPERATOR } from './constants/User'
import LazyRender from './LazyRender'

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
  maxValue?: number
}

const CSS_HANDLES = [
  'productListItem',
  'productListUnavailableItemsMessage',
  'productListAvailableItemsMessage',
] as const

const { useOrderForm } = OrderForm

const DEFAULT_GIFT_TABLE_ID = 'default-gift-table-id'
const VIRTUAL_MAX_VALUE = 36
export const SKUS_CERTIFIEDS = [
  "1572412",
  "1572412002",
  "1572412003",
  "1572412004",
  "1572412005",
  "1572412006",
  "1572412007",
  "1572412008",
  "1572412009",
  "1572412010",
  "1572412011",
  "1572412012",
  "1572412013",
  "1572412014",
  "1572412015",
  "1572412016",
  "1572412017",
  "1572412018",
  "1572412019",
  "1572412020",
  "1572412021",
  "1572412022",
  "1572412023",
  "1572412024",
  "1572412025",
  "1572412026",
  "1572412027",
  "1572412028",
  "1572412029",
  "1572412030",
  "1572412031",
  "1572412032",
  "1572412033",
  "1572412034"
]

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
  
  const [customItems, setCustomItems] = useState(items)

  const orderForm = useOrderForm()
  
  const mdr = orderForm?.orderForm?.customData?.customApps?.find((app: {id: string}) =>  app?.id === 'mdr')

  useEffect(() => {
    const giftTableId = mdr?.fields?.giftTableId ?? DEFAULT_GIFT_TABLE_ID

    if(!items[0].refId || !orderForm?.orderForm?.id) return

    const getIsVirtual = async () => {
      const res = await fetch(`/chapur/v1/items-are-virtual/${giftTableId}/${orderForm?.orderForm?.id}`)
      const data = await res.json()
      const newItems = items.map((item) => {

        const foundItem = data.find((x: { skuId: string }) => x.skuId === item.id)
        
        return {
          ...item,
          availability: foundItem.virtual || SKUS_CERTIFIEDS.find((certified) => certified === item.id) ? AVAILABLE : foundItem.physicalInventory <= 0 ? WITHOUT_STOCK : item.availability,
          maxValue: foundItem.virtual || SKUS_CERTIFIEDS.find((certified) => certified === item.id) ? VIRTUAL_MAX_VALUE : foundItem.physicalInventory
        }
      })
      
      if(JSON.stringify(newItems) === JSON.stringify(customItems)) return 
      console.log("paso")
      setCustomItems(newItems)
    } 

    getIsVirtual()
  }, [items, mdr])


  const shouldAllowManualPrice =
    allowManualPrice && userType === CALL_CENTER_OPERATOR

  const handles = useCssHandles(CSS_HANDLES)

  const [availableItems, unavailableItems] = customItems
    .map((item, index) => ({ ...item, index }))
    .reduce<ItemWithIndex[][]>(
      (acc, item) => {
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
