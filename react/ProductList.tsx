import React, { FunctionComponent } from 'react'

import ListItem from './components/ListItem'

interface Props {
  currency: string
  items: Item[]
  onQuantityChange: (index: number, value: number) => void
  onRemove: (index: number) => void
}

const ProductList: FunctionComponent<Props> = ({
  currency,
  items,
  onQuantityChange,
  onRemove,
}) => (
  <div>
    {items.map((item: any, index: number) => (
      <ListItem
        key={index}
        currency={currency}
        item={item}
        onQuantityChange={(value: number) => onQuantityChange(index, value)}
        onRemove={() => onRemove(index)}
      />
    ))}
  </div>
)

export default ProductList
