import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'

import ProductList from '../ProductList'
import { mockItems } from '../__mocks__/mockItems'

describe('Product List', () => {
  it('should display the list of products', () => {
    const { queryByText } = render(
      <ProductList
        items={mockItems}
        onQuantityChange={() => {}}
        onRemove={() => {}}
      />
    )

    expect(queryByText(mockItems[0].name)).toBeTruthy()
    expect(queryByText(mockItems[1].name)).toBeTruthy()
    expect(queryByText(mockItems[2].name)).toBeTruthy()
  })

  it('should call onRemove when remove button is clicked', () => {
    const mockHandleRemove = jest.fn((_: string) => {})

    const { getByTitle } = render(
      <ProductList
        items={[mockItems[2]]}
        onQuantityChange={() => {}}
        onRemove={mockHandleRemove}
      />
    )

    const removeButton = getByTitle('remove')
    fireEvent.click(removeButton)

    expect(mockHandleRemove).toHaveBeenCalledTimes(1)
    expect(mockHandleRemove.mock.calls[0][0]).toBe(mockItems[2].uniqueId)
  })

  it('should display unavailable items separately', () => {
    const { getByText } = render(
      <ProductList
        items={mockItems}
        onQuantityChange={() => {}}
        onRemove={() => {}}
      />
    )

    expect(getByText('2 unavailable items')).toBeTruthy()
    expect(getByText('1 available item')).toBeTruthy()
  })

  it('should display a message when item is out of stock', () => {
    const { queryByText } = render(
      <ProductList
        items={[mockItems[1]]}
        onQuantityChange={() => {}}
        onRemove={() => {}}
      />
    )

    expect(queryByText(/no longer available/)).toBeTruthy()
  })

  it('should display a message when item cannot be delivered', () => {
    const { queryByText } = render(
      <ProductList
        items={[mockItems[2]]}
        onQuantityChange={() => {}}
        onRemove={() => {}}
      />
    )

    expect(queryByText(/cannot be delivered/)).toBeTruthy()
  })
})
