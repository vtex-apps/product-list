import React from 'react'
import { FormattedMessage } from 'react-intl'

import { ItemContextProvider } from './components/ItemContext'
import { AVAILABLE } from './constants/Availability'

interface Props {
  items: Item[]
  loading: boolean
  onQuantityChange: (uniqueId: string, value: number) => void
  onRemove: (uniqueId: string) => void
}

const ProductList: StorefrontFunctionComponent<Props> = ({
  items,
  loading,
  onQuantityChange,
  onRemove,
  children,
}) => {
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
          loading: loading,
          onQuantityChange: (value: number) =>
            onQuantityChange(item.uniqueId, value),
          onRemove: () => onRemove(item.uniqueId),
        }}
      >
        <div className="c-on-base bb b--muted-4">{children}</div>
      </ItemContextProvider>
    ))

  return (
    <div>
      {unavailableItems.length > 0 ? (
        <div
          id="unavailable-items"
          className="c-muted-1 bb b--muted-4 fw5 pv5 pl5 pl6-m pl0-l t-heading-5-l"
        >
          <FormattedMessage
            id="store/product-list.unavailableItems"
            values={{ quantity: unavailableItems.length }}
          />
        </div>
      ) : null}
      {productList(unavailableItems)}
      {unavailableItems.length > 0 && availableItems.length > 0 ? (
        <div className="c-muted-1 bb b--muted-4 fw5 mt7 pv5 pl5 pl6-m pl0-l t-heading-5-l">
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
