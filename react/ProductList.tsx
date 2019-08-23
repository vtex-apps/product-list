import React, { FunctionComponent } from 'react'

import ListItem from './components/ListItem'

interface Props {
  items: Item[]
  onQuantityChange: (index: number, value: number) => void
  onRemove: (index: number) => void
}

const ProductList: FunctionComponent<Props> = ({
  items,
  onQuantityChange,
  onRemove,
}) => (
  <div>
    {items.map((item: any, index: number) => (
      <ListItem
        key={index}
        item={item}
        onQuantityChange={(value: number) => onQuantityChange(index, value)}
        onRemove={() => onRemove(index)}
      />
    ))}
  </div>
)

export default ProductList
