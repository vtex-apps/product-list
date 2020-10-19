import React, { FunctionComponent } from 'react'
import { Loading } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

import { useItemContext } from './ItemContext'
import { opaque } from './utils/opaque'

const CSS_HANDLES = ['productReference'] as const

const ProductReference: FunctionComponent = () => {
  const { item, loading } = useItemContext()
  const handles = useCssHandles(CSS_HANDLES)

  if (loading) {
    return <Loading />
  }

  console.log(item)

  return (
    <a
      id={`name-${item.id}`}
      className={`c-on-base t-title lh-copy fw6 no-underline fw5-m ${
        handles.productReference
      } ${opaque(item.availability)}`}
      href={item.detailUrl || undefined}
    >
      {item.productRefId}
    </a>
  )
}

export default ProductReference
