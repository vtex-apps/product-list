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
  <div className="c-on-base flex bb b--muted-4 pl5 pb5">
    <div className="flex-none mr5 mt5">
      <a href={item.detailUrl}>
        <img alt={item.name} src={item.imageUrl} width="100%" />
      </a>
    </div>
    <div className="flex-auto">
      <div className="flex-none w-100 flex mb4">
        <div className="flex-auto mt5">
          <div className="ttu f7 fw5 c-muted-1 mb2">{item.additionalInfo.brandName}</div>
          <a className="c-on-base t-title lh-copy fw5 no-underline" href={item.detailUrl}>
            {item.name}
          </a>
        </div>
        <div className="flex-none">
          <button className="bg-transparent bn pa2 mt4 mr4" onClick={onRemove}>
            <IconDelete color="#727273"/>
          </button>
        </div>
      </div>
      
      <div className="">
        {item.skuSpecifications &&
          item.skuSpecifications.map((spec: SKUSpecification, idx: number) => {
            return (
              <div key={idx}>
                {`${spec.fieldName}: ${spec.fieldValues.join(', ')}`}
              </div>
            )
          })}
      </div>
      
      <div className="" style={{ width: '70px' }}>
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

      <div className="mt5">
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
        <div className="div fw5 mr3">
          <FormattedPrice
            currency={currency}
            value={item.sellingPrice * item.quantity}
          />
        </div>
      </div>
    </div>
  </div>
)

export default ListItem
