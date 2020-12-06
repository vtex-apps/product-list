import type { FunctionComponent } from 'react'
import React from 'react'
import { Loading } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

import { useItemContext } from './ItemContext'
import { opaque } from './utils/opaque'

const CSS_HANDLES = ['productBrandName'] as const

const ProductBrand: FunctionComponent = () => {
  const { item, loading } = useItemContext()
  const handles = useCssHandles(CSS_HANDLES)

  if (loading) {
    return <Loading />
  }

  return (
    <div
      id={`brand-name-${item.id}`}
      className={`ttu f7 fw6 c-muted-1 fw5-m ${
        handles.productBrandName
      } ${opaque(item.availability)}`}
    >
      {item.additionalInfo?.brandName}
    </div>
  )
}

export default ProductBrand
