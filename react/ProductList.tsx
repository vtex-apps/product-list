import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useDevice } from 'vtex.device-detector'

import { ItemContextProvider } from './components/ItemContext'
import { AVAILABLE } from './constants/Availability'

interface LayoutProps {
  divider: DividerProps,
  marginLeft: string
  marginRight: string
}

interface DividerProps {
  color: string,
  expand: DividerExpansion,
  width: string,
}

interface DividerExpansion {
  device: string,
  side: string,
  width: string
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

const parseDividerStyle = ({ divider }: LayoutProps) => {
  if (!divider.color && !divider.width) {
    return
  }
  const color = divider.color ? `b--${divider.color}` : ''
  const width = divider.width ? `bw-${divider.width}` : ''
  return `bb ${color} ${width}`
}

const parseDividerExpansion = ({ divider }: LayoutProps) => {
  const { device } = useDevice()
  console.log(device)

  if (divider.expand && divider.expand.device && divider.expand.device === device) {
    const width = divider.expand.width ? `-${parseInt(divider.expand.width)}rem` : '0'
    switch (divider.expand.side) {
      case 'left':
        return {'marginLeft': width}
        break
      case 'right':
        return {'marginRight': width}
        break
      case 'all':
        return {'marginLeft': width, 'marginRight': width}
        break
    }
  }
  return
}

const ProductList: StorefrontFunctionComponent<LayoutProps & ParentProps> = ({
  divider,
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
        <div className="c-on-base">
          {children}
          <div className={parseDividerStyle({ divider, marginLeft, marginRight })} style={parseDividerExpansion({ divider, marginLeft, marginRight })}></div>
        </div>
      </ItemContextProvider>
    ))

  return (
    <div className={parseMargins({ divider, marginLeft, marginRight })}>
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
  divider: undefined,
  marginLeft: undefined,
  marginRight: undefined,
}

ProductList.schema = {
  properties: {
    divider: {
      type: 'object',
      default: ProductList.defaultProps.divider,
      isLayout: true,
    },
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
