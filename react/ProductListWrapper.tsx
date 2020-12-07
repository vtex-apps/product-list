import React from 'react'
import { SizeMe } from 'react-sizeme'
import type { Item } from 'vtex.checkout-graphql'
import { ExtensionPoint, useChildBlock } from 'vtex.render-runtime'
import { useDevice } from 'vtex.device-detector'
import { OrderForm } from 'vtex.order-manager'

const { useOrderForm } = OrderForm

const MAX_MOBILE_WIDTH = 640

interface Props {
  items: Item[]
  onQuantityChange: (uniqueId: string, value: number) => void
  onRemove: (uniqueId: string) => void
}

const ProductListWrapper: React.FC<Props> = (props) => {
  const { loading } = useOrderForm()
  const { device } = useDevice()
  const hasMobileContent = Boolean(
    useChildBlock({ id: 'product-list-content-mobile' })
  )

  const hasDesktopContent = Boolean(
    useChildBlock({ id: 'product-list-content-desktop' })
  )

  if (!hasMobileContent) {
    return <ExtensionPoint id="product-list-content-desktop" {...props} />
  }

  if (!hasDesktopContent) {
    return <ExtensionPoint id="product-list-content-mobile" {...props} />
  }

  return (
    <SizeMe noPlaceholder>
      {({ size }) =>
        (loading && device === 'phone') ||
        (size.width && size.width < MAX_MOBILE_WIDTH) ? (
          <ExtensionPoint id="product-list-content-mobile" {...props} />
        ) : (
          <ExtensionPoint id="product-list-content-desktop" {...props} />
        )
      }
    </SizeMe>
  )
}

export default ProductListWrapper
