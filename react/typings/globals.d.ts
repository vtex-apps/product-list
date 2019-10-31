import { FunctionComponent } from 'react'

declare global {
  interface StorefrontFunctionComponent<P = {}> extends FunctionComponent<P> {
    schema?: object
    getSchema?(props?: P): object
  }

  interface Item {
    additionalInfo: ItemAdditionalInfo
    availability: string
    detailUrl: string
    id: string
    imageUrls?: {
      at1x: string
      at2x: string
      at3x: string
    }
    listPrice: number
    measurementUnit: string
    name: string
    price: number
    productId: string
    quantity: number
    sellingPrice: number
    skuName: string
    skuSpecifications: SKUSpecification[]
    uniqueId: string
  }

  interface ItemAdditionalInfo {
    brandName: string
  }

  interface SKUSpecification {
    fieldName: string
    fieldValues: string[]
  }
}
