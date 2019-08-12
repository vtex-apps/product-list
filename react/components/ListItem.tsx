import React, { FunctionComponent } from 'react'
import { Link } from 'vtex.styleguide'

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
  <div className="flex bb b--muted-4 pv5 ph5">
    <div className="mr6">
      <a href={item.detailUrl}>
        <img alt={item.name} src={item.imageUrl} width="96" height="96" />
      </a>
    </div>
    <div>
      <div className="lh-copy pb3">
        <div>{item.additionalInfo.brandName}</div>
        <Link className="c-link no-underline" href={item.detailUrl}>
          {item.name}
        </Link>
        {item.skuSpecifications &&
          item.skuSpecifications.map((spec: SKUSpecification, idx: number) => {
            return (
              <div key={idx}>
                {`${spec.fieldName}: ${spec.fieldValues.join(', ')}`}
              </div>
            )
          })}
      </div>
      <div className="mb4 mt3" style={{ width: '70px' }}>
        <Selector value={item.quantity} onChange={onQuantityChange} />
      </div>
      <div className="mt3 t-mini">
        <FormattedPrice currency={currency} value={item.sellingPrice} />
        <span> per {item.measurementUnit}</span>
      </div>
      <div>
        <div className="div fw5 mr3">
          <FormattedPrice
            currency={currency}
            value={item.sellingPrice * item.quantity}
          />
        </div>
        <div
          className={
            item.listPrice === item.price ? 'dn' : 'c-muted-1 dib strike t-mini'
          }
        >
          <FormattedPrice
            currency={currency}
            value={item.listPrice * item.quantity}
          />
        </div>
      </div>
      <div>
        <a className="c-muted-1 no-underline" href="#" onClick={onRemove}>
          x
        </a>
      </div>
    </div>
  </div>
)

export default ListItem
