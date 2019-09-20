import React from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { SizeMe } from 'react-sizeme'

interface Props {
  items: Item[]
  onQuantityChange: (uniqueId: string, value: number) => void
  onRemove: (uniqueId: string) => void
}

const ProductListWrapper: StorefrontFunctionComponent<Props> = props => {
  return (
    <SizeMe>
      {({ size }) =>
        size.width && size.width < 640 ? (
          <ExtensionPoint id="product-list-content-mobile" {...props} />
        ) : (
          <ExtensionPoint id="product-list-content-desktop" {...props} />
        )
      }
    </SizeMe>
  )
}

export default ProductListWrapper
