import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import type { Product } from 'vtex.search-graphql'
import type { Item } from 'vtex.checkout-graphql'

import GetAvailableQuantity from './graphql/queries/GetAvailableQuantity.graphql'

const MAX_ITEM_QUANTITY = 99999

export default function useAvailableQuantity(item: Item) {
  const [availableQuantity, setAvailableQuantity] = useState(MAX_ITEM_QUANTITY)
  const [skip, setSkip] = useState(false)
  const { data, loading } = useQuery<{ product: Product }>(
    GetAvailableQuantity,
    {
      variables: { id: Number(item.id) },
      skip,
    }
  )

  useEffect(() => {
    if (!data) return

    setSkip(true)

    const sku = data.product.items?.find(
      (productItem) => item.id === productItem?.itemId
    )

    const maxQuantity = sku?.sellers?.[0]?.commertialOffer?.AvailableQuantity

    setAvailableQuantity(maxQuantity ?? MAX_ITEM_QUANTITY)
  }, [data, loading, item.id])

  return { availableQuantity }
}
