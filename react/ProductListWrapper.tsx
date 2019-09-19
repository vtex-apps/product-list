import React from 'react'
import { useDevice } from 'vtex.device-detector'
import { ExtensionPoint } from 'vtex.render-runtime'

interface Props {
  items: Item[]
  onQuantityChange: (uniqueId: string, value: number) => void
  onRemove: (uniqueId: string) => void
}

const ProductListWrapper: StorefrontFunctionComponent<Props> = props => {
  const { device } = useDevice()

  return device === 'phone' ? (
    <ExtensionPoint id="product-list-content-mobile" {...props} />
  ) : (
    <ExtensionPoint id="product-list-content-desktop" {...props} />
  )
}

export default ProductListWrapper
