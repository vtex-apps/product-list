import React, { FunctionComponent } from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'

import { mockItems } from '../__mocks__/mockItems'
import AvailabilityMessage from '../AvailabilityMessage'
import Image from '../Image'
import Price from '../Price'
import ProductBrand from '../ProductBrand'
import ProductList from '../ProductList'
import ProductName from '../ProductName'
import ProductVariations from '../ProductVariations'
import QuantitySelector from '../QuantitySelector'
import RemoveButton from '../RemoveButton'
import UnitPrice from '../UnitPrice'

const ListItem: FunctionComponent = () => (
  <div>
    <AvailabilityMessage layout="cols" />
    <Image />
    <Price textAlign="left" />
    <ProductBrand />
    <ProductName />
    <ProductVariations />
    <QuantitySelector />
    <RemoveButton />
    <UnitPrice textAlign="left" />
  </div>
)

describe('Product List', () => {
  it('should display the list of products', () => {
    const { queryByText } = render(
      <ProductList
        items={mockItems}
        onQuantityChange={() => {}}
        onRemove={() => {}}
        children={<ListItem />}
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
        children={<ListItem />}
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
        children={<ListItem />}
      />
    )

    expect(getByText('2 unavailable products')).toBeTruthy()
    expect(getByText('1 available product')).toBeTruthy()
  })

  it('should display a message when item is out of stock', () => {
    const { queryByText } = render(
      <ProductList
        items={[mockItems[1]]}
        onQuantityChange={() => {}}
        onRemove={() => {}}
        children={<ListItem />}
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
        children={<ListItem />}
      />
    )

    expect(queryByText(/cannot be delivered/)).toBeTruthy()
  })
})
