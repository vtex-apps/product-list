import React, { FunctionComponent } from 'react'

import { useItemContext } from './components/ItemContext'
import { NoImageIcon } from './components/NoImageIcon'
import { opaque } from './utils/opaque'
import { Loading } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

const getImageUrl = (imageUrls: Item['imageUrls']) => {
  if (!imageUrls) {
    return null
  }
  if (!window || !window.devicePixelRatio) {
    return imageUrls.at1x
  }

  if (window.devicePixelRatio <= 1.25) {
    return imageUrls.at1x
  } else if (window.devicePixelRatio <= 2.25) {
    return imageUrls.at2x
  } else {
    return imageUrls.at3x
  }
}

const CSS_HANDLES = [
  'productImageContainer',
  'productImageAnchor',
  'productImage',
] as const

const Image: FunctionComponent = () => {
  const { item, loading } = useItemContext()
  const handles = useCssHandles(CSS_HANDLES)

  if (loading) {
    return <Loading />
  }

  const imageUrl = getImageUrl(item.imageUrls)

  return (
    <div
      id={`image-${item.id}`}
      className={`${handles.productImageContainer} ${opaque(
        item.availability
      )}`}
      style={{ width: '96px' }}
    >
      <a className={handles.productImageAnchor} href={item.detailUrl}>
        {imageUrl ? (
          <img
            className={`${handles.productImage} br2`}
            alt={item.name}
            src={imageUrl}
            width="100%"
          />
        ) : (
          <NoImageIcon />
        )}
      </a>
    </div>
  )
}

export default Image
