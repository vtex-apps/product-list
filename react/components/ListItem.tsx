import React, { FunctionComponent } from 'react'
import { IconDelete } from 'vtex.styleguide'

import FormattedPrice from './FormattedPrice'
import Selector from './QuantitySelector'

interface Props {
  currency: string
  item: Item
  onQuantityChange: (value: number) => void
  onRemove: () => void
}

const ListItem: FunctionComponent<Props> = ({
  currency,
  item,
  onQuantityChange,
  onRemove,
}) => (
  <div className="c-on-base flex bb b--muted-4 pb5 pb6-l">
    {/* Image */}
    <div className="flex-none mr5 mt5 mr6-l mt6-l">
      <a href={item.detailUrl}>
        <img alt={item.name} src={item.imageUrl} width="100%" />
      </a>
    </div>


    {/* Desktop Container */}
    <div className="flex-auto flex-l">

      {/* Product Info */}
      <div className="flex-none w-100 flex mb4 w-60-l">
        {/* Brand and Name */}
        <div className="flex-auto mt5 mt6-l mr6-l">
          <div className="ttu f7 fw6 c-muted-1 mb2 fw5-l">{item.additionalInfo.brandName}</div>
          <div>
            <a className="c-on-base t-title lh-copy fw6 no-underline fw5-l" href={item.detailUrl}>
              {item.name}
            </a>
          </div>
          {/* Variations */}
          {
            item.skuSpecifications && item.skuSpecifications.length > 0 && (
              <div className="mt2 c-muted-1 f6 lh-copy">
                {item.skuSpecifications.map((spec: SKUSpecification, idx: number) => {
                  return (
                    <div key={idx}>
                      {`${spec.fieldName}: ${spec.fieldValues.join(', ')}`}
                    </div>
                  )
                })}
              </div>
            )
          }
        </div>

        {/* Remove - Mobile */}
        <div className="flex-none dn-l">
          <button className="bg-transparent bn pa2 mt4 mr4" onClick={onRemove}>
            <IconDelete color="#727273"/>
          </button>
        </div>        
      </div>
      
      {/* Quantity Selector */}
      <div className="flex-auto-l mt6-l">
        <div className="dn-l" style={{ width: '70px' }}>
          <Selector value={item.quantity} onChange={onQuantityChange} />
        </div>
        <div className="dn db-l" style={{ width: '90px' }}>
          <Selector value={item.quantity} onChange={onQuantityChange} />
        </div>

        {
          item.quantity > 1 && (
            <div className="mt3 t-mini c-muted-1">
              <FormattedPrice currency={currency} value={item.sellingPrice} />
              <span> per {item.measurementUnit}</span>
            </div>
          )
        }
      </div>

      {/* Price */}
      <div className="mt5 tr-l flex-auto-l mt6-l ml5-l">
        {
          item.listPrice !== item.price && (
            <div className="c-muted-1 strike t-mini mb2">
              <FormattedPrice
                currency={currency}
                value={item.listPrice * item.quantity}
              />
            </div>
          )
        }
        <div className="div fw6 fw5-l">
          <FormattedPrice
            currency={currency}
            value={item.sellingPrice * item.quantity}
          />
        </div>
      </div>

      {/* Remove - Desktop */}
      <div className="flex-none-l dn db-l">
        <button className="pointer bg-transparent bn pa2 mt6 ml6" onClick={onRemove}>
          <IconDelete color="#727273"/>
        </button>
      </div>

    </div>


  </div>
)

export default ListItem
