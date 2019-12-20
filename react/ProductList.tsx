import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'

import { ItemContextProvider } from './components/ItemContext'
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

const ProductList: StorefrontFunctionComponent<Props> = ({
  items,
  loading,
  onQuantityChange,
  onRemove,
  children,
}) => {
  const handles = useCssHandles(CSS_HANDLES)

  const [availableItems, unavailableItems] = items.reduce(
    (acc: any, item: Item) => {
      acc[item.availability === AVAILABLE ? 0 : 1].push(item)
      return acc
    },
    [[], []] as Item[][]
  )

  const productList = (itemList: Item[]) =>
    itemList.map((item: Item) => (
      <ItemContextProvider
        key={item.uniqueId}
        value={{
          item,
          loading,
          onQuantityChange: (value: number) =>
            onQuantityChange(item.uniqueId, value, item),
          onRemove: () => onRemove(item.uniqueId, item),
        }}
      >
        <div className={`${handles.productListItem} c-on-base bb b--muted-4`}>
          {children}
        </div>
      </ItemContextProvider>
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

export default ProductList
