import React from 'react'
import { FormattedMessage } from 'react-intl'

import { ItemContextProvider } from './components/ItemContext'
import { AVAILABLE } from './constants/Availability'

interface LayoutProps {
  marginLeft: string
  marginRight: string
}

interface ParentProps {
  items: Item[]
  onQuantityChange: (uniqueId: string, value: number) => void
  onRemove: (uniqueId: string) => void
}

const parseMargins = ({ marginLeft, marginRight }: LayoutProps) => {
  const left = marginLeft ? `ml${marginLeft}` : ''
  const right = marginRight ? `mr${marginRight}` : ''
  return `${left} ${right}`
}

const ProductList: StorefrontFunctionComponent<LayoutProps & ParentProps> = ({
  marginLeft,
  marginRight,
  items,
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
          onQuantityChange: (value: number) =>
            onQuantityChange(item.uniqueId, value),
          onRemove: () => onRemove(item.uniqueId),
        }}
      >
        <div className="c-on-base bb b--muted-4">{children}</div>
      </ItemContextProvider>
    ))

  return (
    <div className={parseMargins({ marginLeft, marginRight })}>
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

ProductList.defaultProps = {
  marginLeft: undefined,
  marginRight: undefined,
}

ProductList.schema = {
  properties: {
    marginLeft: {
      type: 'string',
      default: ProductList.defaultProps.marginLeft,
      isLayout: true,
    },
    marginRight: {
      type: 'string',
      default: ProductList.defaultProps.marginRight,
      isLayout: true,
    },
  },
}

export default ProductList
