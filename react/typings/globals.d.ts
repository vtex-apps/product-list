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
  skuSpecifications: SKUSpecification[]
}

interface ItemAdditionalInfo {
  brandName: string
}

interface SKUSpecification {
  fieldName: string
  fieldValues: string[]
}
