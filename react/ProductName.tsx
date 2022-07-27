import type { FunctionComponent } from 'react'
import React from 'react'
import { Loading, useRuntime } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

import { useItemContext } from './ItemContext'
import { opaque } from './utils/opaque'

const CSS_HANDLES = ['productName'] as const

const ProductName: FunctionComponent = () => {
  const { item, loading } = useItemContext()
  const { rootPath = '' } = useRuntime()
  const handles = useCssHandles(CSS_HANDLES)

  if (loading) {
    return <Loading />
  }

  return (
    <a
      id={`name-${item.id}`}
      className={`c-on-base t-title lh-copy fw6 no-underline fw5-m ${
        handles.productName
      } ${opaque(item.availability)}`}
      href={item.detailUrl ? `${rootPath}${item.detailUrl}` : undefined}
    >
      {item.name}
    </a>
  )
}

export default ProductName
