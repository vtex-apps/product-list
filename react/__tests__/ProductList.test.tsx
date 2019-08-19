import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'

import ProductList from '../ProductList'
import { mockItems } from '../__mocks__/mockItems'

describe('Product List', () => {
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

    const { findAllByTitle } = render(
      <ProductList
        items={mockItems}
        onQuantityChange={() => {}}
        onRemove={mockHandleRemove}
        currency="USD"
      />
    )

    const removeButtons = (await findAllByTitle('remove')) as HTMLElement[]
    expect(removeButtons.length).toBe(3)

    fireEvent.click(removeButtons[1])

    expect(mockHandleRemove.mock.calls.length).toBe(1)
    expect(mockHandleRemove.mock.calls[0][0]).toBe(1)
  })
})
