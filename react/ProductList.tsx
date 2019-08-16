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
  <div className="ml5 ml0-l mb6-l">
    <h3>
      <span className="t-heading-3 c-on-base t-heading-2-l">Cart</span>
      <span className="t-heading-5 c-muted-1 t-heading-4-l">
        &nbsp;({items.length} items)
      </span>
    </h3>

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
