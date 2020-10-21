import React, { FunctionComponent, useState, useEffect } from 'react'
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
  'productReferenceId',
  'productIdentifierValue',
  'productIdentifierLabelValue',
] as const

interface Props {
  identifierLabel?: String
  identifierOption?: String
}

const ProductReference: FunctionComponent<Props> = props => {
  const { identifierOption = PRODUCT_REFERENCE_ID, identifierLabel } = props
  const { item, loading } = useItemContext()
  const handles = useCssHandles(CSS_HANDLES)

  if (loading) {
    return <Loading />
  }

  const [identifierValue, setIdentifierValue] = useState<
    String | null | undefined
  >()

  useEffect(() => {
    if (identifierOption === PRODUCT_REFERENCE_ID) {
      setIdentifierValue(item.productRefId)
    } else if (identifierOption === PRODUCT_SKU_REFERENCE_ID) {
      setIdentifierValue(item.refId)
    } else if (identifierOption === PRODUCT_SKU_ITEM_ID) {
      setIdentifierValue(item.id)
    } else if (identifierOption === PRODUCT_ID) {
      setIdentifierValue(item.productId)
    }
  }, [item.productRefId])

  return identifierValue ? (
    <div
      className={`c-on-base t-title lh-copy fw6 no-underline fw5-m ${
        handles.productReferenceId
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
  ) : null
}

export default ProductReference
