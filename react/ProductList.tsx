import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'

import ListItem from './components/ListItem'

interface Props {
  items: Item[]
  onQuantityChange: (uniqueId: string, value: number) => void
  onRemove: (uniqueId: string) => void
}

const ProductList: FunctionComponent<Props> = ({
  items,
  onQuantityChange,
  onRemove,
}) => {
  const [availableItems, unavailableItems] = items.reduce(
    (acc, item) => {
      acc[item.availability === 'available' ? 0 : 1].push(item)
      return acc
    },
    [[], []] as Item[][]
  )

  const productList = (itemList: Item[]) =>
    itemList.map((item: Item) => (
      <ListItem
        key={item.uniqueId}
        item={item}
        onQuantityChange={(value: number) =>
          onQuantityChange(item.uniqueId, value)
        }
        onRemove={() => onRemove(item.uniqueId)}
      />
    ))

  return (
    <div>
      {unavailableItems.length > 0 ? (
        <div className="t-heading-4 bb b--muted-4">
          <FormattedMessage
            id="store/product-list.unavailableItems"
            values={{ quantity: unavailableItems.length }}
          />
        </div>
      ) : null}
      {productList(unavailableItems)}
      {availableItems.length > 0 ? (
        <div className="t-heading-4 bb b--muted-4">
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
