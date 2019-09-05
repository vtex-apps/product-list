import React, { FunctionComponent } from 'react'

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
}) => (
  <div>
    {items.map((item: any) => (
      <ListItem
        key={item.uniqueId}
        item={item}
        onQuantityChange={(value: number) =>
          onQuantityChange(item.uniqueId, value)
        }
        onRemove={() => onRemove(item.uniqueId)}
      />
    ))}
  </div>
)

export default ProductList
