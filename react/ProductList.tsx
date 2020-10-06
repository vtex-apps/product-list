import React, { useMemo, memo, ReactNode } from 'react'
import { FormattedMessage } from 'react-intl'
import { Item } from 'vtex.checkout-graphql'
import { useCssHandles } from 'vtex.css-handles'

import { ItemContextProvider } from './ItemContext'
import { AVAILABLE } from './constants/Availability'
import { chunkArray } from './utils/chunkArray'
import { useRenderOnView } from './hooks/useRenderOnView'
import { CALL_CENTER_OPERATOR } from './constants/User'

interface Props {
  allowManualPrice: boolean
  items: ItemWithIndex[]
  loading: boolean
  userType: string
  onQuantityChange: (
    uniqueId: string,
    value: number,
    item?: ItemWithIndex
  ) => void
  onRemove: (uniqueId: string, item?: ItemWithIndex) => void
  renderOnView: boolean
  onSetManualPrice: (price: number, itemIndex: number) => void
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
  onSetManualPrice: (price: number, itemIndex: number) => void
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
      onSetManualPrice: (price: number, itemIndex: number) =>
        onSetManualPrice(price, itemIndex),
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

  return <ItemContextProvider value={context}>{children}</ItemContextProvider>
})

const ProductGroup: StorefrontFunctionComponent<Props> = props => {
  const { items, renderOnView, userType, allowManualPrice, children } = props
  const shouldAllowManualPrice =
    allowManualPrice && userType === CALL_CENTER_OPERATOR

  const { hasBeenViewed, dummyElement } = useRenderOnView({
    lazyRender: true,
    offset: 900,
  })

  if (renderOnView && (!hasBeenViewed || items.length === 0)) {
    return dummyElement
  }

  return (
    <>
      {items.map((item: ItemWithIndex) => (
        <ItemContextWrapper
          key={item.uniqueId + item.sellingPrice}
          item={item}
          itemIndex={item.index}
          shouldAllowManualPrice={shouldAllowManualPrice}
          {...props}
        >
          {children}
        </ItemContextWrapper>
      ))}
    </>
  )
}

const ProductList: StorefrontFunctionComponent<Props> = props => {
  const { items } = props

  const handles = useCssHandles(CSS_HANDLES)

  const [availableItems, unavailableItems] = items
    .map((item, index) => ({ ...item, index }))
    .reduce<ItemWithIndex[][]>(
      (acc, item) => {
        acc[item.availability === AVAILABLE ? 0 : 1].push(item)
        return acc
      },
      [[], []]
    )

  const availableGroups: ItemWithIndex[][] = chunkArray(availableItems, 10)
  const unavailableGroups: ItemWithIndex[][] = chunkArray(unavailableItems, 10)

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
            values={{ quantity: unavailableItems.length }}
          />
        </div>
      ) : null}
      {unavailableGroups.map(group => (
        <ProductGroup
          key={group.reduce((result, item) => `${result}#${item.id}`, '')}
          {...props}
          items={group}
        />
      ))}
      {unavailableItems.length > 0 && availableItems.length > 0 ? (
        <div
          className={`${handles.productListAvailableItemsMessage} c-muted-1 bb b--muted-4 fw5 mt7 pv5 pl5 pl6-m pl0-l t-heading-5-l`}
        >
          <FormattedMessage
            id="store/product-list.availableItems"
            values={{ quantity: availableItems.length }}
          />
        </div>
      ) : null}
      {availableGroups.map(group => (
        <ProductGroup
          key={group.reduce((result, item) => `${result}#${item.id}`, '')}
          {...props}
          items={group}
        />
      ))}
    </div>
  )
}

export default React.memo(ProductList)
