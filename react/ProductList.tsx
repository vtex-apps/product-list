import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'

import ListItem from './components/ListItem'
import Availability from './constants/Availability'

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
      acc[item.availability === Availability.AVAILABLE ? 0 : 1].push(item)
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
        <div className="c-muted-1 bb b--muted-4 fw5 pv5 pl5 pl6-m pl0-l t-heading-5-l">
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
