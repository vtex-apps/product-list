interface Item {
  additionalInfo: ItemAdditionalInfo
  detailUrl: string
  id: string
  imageUrl: string
  listPrice: number
  measurementUnit: string
  name: string
  price: number
  productId: string
  quantity: number
  sellingPrice: number
  skuName: string
  variations: Variation[]
}

interface ItemAdditionalInfo {
  brandName: string
}

interface Variation {
  name: string
  values: string[]
}
