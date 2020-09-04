import React, { useMemo, memo, ReactNode } from 'react'
import { FormattedMessage } from 'react-intl'
import { Item } from 'vtex.checkout-graphql'
import { useCssHandles } from 'vtex.css-handles'

import { ItemContextProvider } from './ItemContext'
import { AVAILABLE } from './constants/Availability'

interface Props {
  items: Item[]
  loading: boolean
  onQuantityChange: (uniqueId: string, value: number, item?: Item) => void
  onRemove: (uniqueId: string, item?: Item) => void
}

const CSS_HANDLES = [
  'productListItem',
  'productListUnavailableItemsMessage',
  'productListAvailableItemsMessage',
] as const

interface ItemWrapperProps
  extends Pick<Props, 'onQuantityChange' | 'onRemove'> {
  item: Item
  loading: boolean
  children: ReactNode
}

const ItemContextWrapper = memo<ItemWrapperProps>(function ItemContextWrapper({
  item,
  loading,
  onQuantityChange,
  onRemove,
  children,
}) {
  const context = useMemo(
    () => ({
      item,
      loading,
      onQuantityChange: (value: number) =>
        onQuantityChange(item.uniqueId, value, item),
      onRemove: () => onRemove(item.uniqueId, item),
    }),
    [item, loading, onQuantityChange, onRemove]
  )

  return <ItemContextProvider value={context}>{children}</ItemContextProvider>
})

const ProductList: StorefrontFunctionComponent<Props> = ({
  items,
  loading,
  onQuantityChange,
  onRemove,
  children,
}) => {
  const handles = useCssHandles(CSS_HANDLES)

  const [availableItems, unavailableItems] = items.reduce<Item[][]>(
    (acc, item) => {
      acc[item.availability === AVAILABLE ? 0 : 1].push(item)
      return acc
    },
    [[], []]
  )

  const productList = (itemList: Item[]) =>
    itemList.map((item: Item) => (
      <ItemContextWrapper
        key={item.uniqueId + item.sellingPrice}
        item={item}
        loading={loading}
        onQuantityChange={onQuantityChange}
        onRemove={onRemove}
      >
        {children}
      </ItemContextWrapper>
    ))

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
      {productList(unavailableItems)}
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
      {productList(availableItems)}
    </div>
  )
}

export default React.memo(ProductList)
