import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'

import ProductList from '../ProductList'

describe('Product List', () => {
  const mockItems: Item[] = [
    {
      additionalInfo: {
        brandName: 'Test Brand 0',
      },
      id: '1',
      detailUrl: '/work-shirt/p',
      imageUrl:
        'http://storecomponents.vteximg.com.br/arquivos/ids/155476-55-55/Frame-4.jpg?v=636793808441900000',
      listPrice: 2800000,
      measurementUnit: 'un',
      name: 'قميص العمل الأعلى',
      price: 2400000,
      productId: '1',
      quantity: 3,
      sellingPrice: 2400000,
      skuName: 'Test SKU 0',
      variations: [],
    },
    {
      additionalInfo: {
        brandName: 'Test Brand 1',
      },
      id: '30',
      detailUrl: '/long-sleeve-shirt/p',
      imageUrl:
        'http://storecomponents.vteximg.com.br/arquivos/ids/155487-55-55/Frame-7.jpg?v=636793837686400000',
      listPrice: 945000,
      measurementUnit: 'un',
      name: '上品なサングラス',
      price: 945000,
      productId: '2000005',
      quantity: 1,
      sellingPrice: 945000,
      skuName: 'Test SKU 1',
      variations: [],
    },
    {
      additionalInfo: {
        brandName: 'Test Brand 2',
      },
      id: '2000535',
      detailUrl: '/classy--sunglasses/p',
      imageUrl:
        'http://storecomponents.vteximg.com.br/arquivos/ids/155469-55-55/Frame-8.jpg?v=636793757498800000',
      listPrice: 400000,
      measurementUnit: 'un',
      name: 'กางเกงขาสั้น St Tropez',
      price: 360000,
      productId: '13',
      quantity: 4,
      sellingPrice: 360000,
      skuName: 'Test SKU 2',
      variations: [],
    },
  ]

  it('should display the list of products', async () => {
    const { findByText } = render(
      <ProductList
        items={mockItems}
        onQuantityChange={() => {}}
        onRemove={() => {}}
        currency="USD"
      />
    )

    expect(await findByText(mockItems[0].name)).toBeTruthy()
    expect(await findByText(mockItems[1].name)).toBeTruthy()
    expect(await findByText(mockItems[2].name)).toBeTruthy()
  })

  it('should call onRemove when remove button is clicked', async () => {
    const mockHandleRemove = jest.fn((_: number) => {})

    const { findAllByText } = render(
      <ProductList
        items={mockItems}
        onQuantityChange={() => {}}
        onRemove={mockHandleRemove}
        currency="USD"
      />
    )

    const removeButtons = (await findAllByText('x')) as HTMLElement[]
    expect(removeButtons.length).toBe(3)

    fireEvent.click(removeButtons[1])

    expect(mockHandleRemove.mock.calls.length).toBe(1)
    expect(mockHandleRemove.mock.calls[0][0]).toBe(1)
  })
})
