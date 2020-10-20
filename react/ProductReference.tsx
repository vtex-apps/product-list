import React, { FunctionComponent, useState, useEffect } from 'react'
import { Loading } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import { useItemContext } from './ItemContext'
import { opaque } from './utils/opaque'

import { PRODUCT_REFERENCE_ID, PRODUCT_SKU_REFERENCE_ID } from './constants/Identifiers'

const CSS_HANDLES = ['productReferenceId'] as const

interface identifierOption {
  identifierOptionValue?: string | undefined
}

const ProductReference: FunctionComponent<identifierOption> = ({
  identifierOptionValue = 'ProductReferenceId',
}) => {
  const { item, loading } = useItemContext()
  const handles = useCssHandles(CSS_HANDLES)

  if (loading) {
    return <Loading />
  }

  console.log(item)

  const [identifier, setIdentifier] = useState<string | null | undefined>()

  console.log(identifier)

  useEffect(() => {
    if (identifierOptionValue === PRODUCT_REFERENCE_ID) {
      setIdentifier(item.productRefId)
    } else if (identifierOptionValue === PRODUCT_SKU_REFERENCE_ID) {
      setIdentifier(item.refId)
    }
  }, [item.productRefId])

  return (
    <div
      className={`c-on-base t-title lh-copy fw6 no-underline fw5-m ${
        handles.productReferenceId
      } ${opaque(item.availability)}`}
    >
      {identifier}
    </div>
  )
}

export default ProductReference
