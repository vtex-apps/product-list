import React, { FunctionComponent, useMemo } from 'react'
import { Loading } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

import { useItemContext } from './ItemContext'
import { opaque } from './utils/opaque'
import {
  PRODUCT_REFERENCE_ID,
  PRODUCT_SKU_REFERENCE_ID,
  PRODUCT_ID,
  PRODUCT_SKU_ITEM_ID,
} from './constants/Identifiers'

const CSS_HANDLES = [
  'productIdentifier',
  'productIdentifierValue',
  'productIdentifierLabelValue',
] as const

interface Props {
  identifierLabel?: string
  identifierOption?: string
}

const ProductReference: FunctionComponent<Props> = props => {
  const { identifierOption, identifierLabel } = props
  const { item, loading } = useItemContext()
  const handles = useCssHandles(CSS_HANDLES)

  const identifierValue = useMemo(() => {
    if (identifierOption === PRODUCT_REFERENCE_ID) return item.productRefId
    if (identifierOption === PRODUCT_SKU_REFERENCE_ID) return item.refId
    if (identifierOption === PRODUCT_SKU_ITEM_ID) return item.id
    if (identifierOption === PRODUCT_ID) return item.productId

    return item.productRefId
  }, [item.productRefId, identifierOption, item.id, item.productId, item.refId])

  if (loading) return <Loading />
  if (!identifierValue) return null

  return (
    <div
      className={`c-on-base t-title lh-copy fw6 no-underline fw5-m ${
        handles.productIdentifier
      } ${opaque(item.availability)}`}
    >
      {identifierLabel && (
        <span className={`${handles.productIdentifierLabelValue}`}>
          {identifierLabel}
        </span>
      )}
      <span className={`${handles.productIdentifierValue}`}>
        {identifierValue}
      </span>
    </div>
  )
}

export default ProductReference
