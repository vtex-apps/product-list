import type { FunctionComponent } from 'react'
import React from 'react'
import { render, fireEvent, screen } from '@vtex/test-tools/react'
import { useRuntime } from 'vtex.render-runtime'

import { items } from '../__fixtures__/items'
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

jest.mock('../LazyRender', () => ({ children } = { children: undefined }) =>
  children
)

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
        items={items}
        loading={false}
        onQuantityChange={() => {}}
        onRemove={() => {}}
      >
        <ListItem />
      </ProductList>
    )

    expect(queryByText(items[0].name as string)).toBeTruthy()
    expect(queryByText(items[1].name as string)).toBeTruthy()
    expect(queryByText(items[2].name as string)).toBeTruthy()
  })

  it('should call onRemove when remove button is clicked', () => {
    const mockHandleRemove = jest.fn((_: string) => {})

    const { getByTitle } = render(
      <ProductList
        items={[items[2]]}
        loading={false}
        onQuantityChange={() => {}}
        onRemove={mockHandleRemove}
      >
        <ListItem />
      </ProductList>
    )

    const removeButton = getByTitle('remove')

    fireEvent.click(removeButton)

    expect(mockHandleRemove).toHaveBeenCalledTimes(1)
    expect(mockHandleRemove.mock.calls[0][0]).toBe(items[2].uniqueId)
  })

  it('should display unavailable items separately', () => {
    const { getByText } = render(
      <ProductList
        items={items}
        loading={false}
        onQuantityChange={() => {}}
        onRemove={() => {}}
      >
        <ListItem />
      </ProductList>
    )

    expect(getByText('2 unavailable products')).toBeTruthy()
    expect(getByText('1 available product')).toBeTruthy()
  })

  it('should display a message when item is out of stock', () => {
    const { queryByText } = render(
      <ProductList
        items={[items[1]]}
        loading={false}
        onQuantityChange={() => {}}
        onRemove={() => {}}
      >
        <ListItem />
      </ProductList>
    )

    expect(queryByText(/no longer available/)).toBeTruthy()
  })

  it('should display a message when item cannot be delivered', () => {
    const { queryByText } = render(
      <ProductList
        items={[items[2]]}
        loading={false}
        onQuantityChange={() => {}}
        onRemove={() => {}}
      >
        <ListItem />
      </ProductList>
    )

    expect(queryByText(/cannot be delivered/)).toBeTruthy()
  })

  it('should render the product detailUrl with correct rootPath', () => {
    const { unmount } = render(
      <ProductList
        items={[items[0]]}
        loading={false}
        onQuantityChange={() => {}}
        onRemove={() => {}}
      >
        <ListItem />
      </ProductList>
    )

    let [productImageLink, productNameLink] = screen.getAllByRole('link')

    expect(productImageLink).toHaveAttribute('href', '/work-shirt/p')
    expect(productImageLink).toHaveClass('productImageAnchor')
    expect(productNameLink).toHaveAttribute('href', '/work-shirt/p')
    expect(productNameLink).toHaveClass('productName')

    const mockedUseRuntime = useRuntime as jest.MockedFunction<
      () => ReturnType<typeof useRuntime>
    >

    // @ts-expect-error: we are not mocking everything on purpose
    mockedUseRuntime.mockReturnValue({
      rootPath: '/pt-br',
    })

    unmount()

    render(
      <ProductList
        items={[items[0]]}
        loading={false}
        onQuantityChange={() => {}}
        onRemove={() => {}}
      >
        <ListItem />
      </ProductList>
    )
    ;[productImageLink, productNameLink] = screen.getAllByRole('link')

    expect(productImageLink).toHaveAttribute('href', '/pt-br/work-shirt/p')
    expect(productImageLink).toHaveClass('productImageAnchor')
    expect(productNameLink).toHaveAttribute('href', '/pt-br/work-shirt/p')
    expect(productNameLink).toHaveClass('productName')
  })
})
