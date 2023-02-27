import React from 'react'
import { render, screen, fireEvent } from '@vtex/test-tools/react'
import { ToastContext } from '@vtex/styleguide/lib/ToastProvider'

import QuantityStepper from '../QuantityStepper'

describe('<QuantityStepper />', () => {
  it('should allow use to type the quantity', () => {
    const onChange = jest.fn()

    render(<QuantityStepper id="1" value={1} onChange={onChange} />)

    const input = screen.getByLabelText(/product quantity/i)

    expect(input).toHaveValue('1')

    fireEvent.change(input, { target: { value: '10' } })
    fireEvent.blur(input)

    expect(onChange).toHaveBeenCalledWith(10)
    expect(input).toHaveValue('10')
  })

  it('should display toast when rounding values', () => {
    const onChange = jest.fn()
    const showToast = jest.fn()

    render(
      <ToastContext.Provider value={{ showToast }}>
        <QuantityStepper id="1" value={1} onChange={onChange} />
      </ToastContext.Provider>
    )

    const input = screen.getByLabelText(/product quantity/i)

    fireEvent.change(input, { target: { value: '1.9' } })
    fireEvent.blur(input)

    expect(onChange).toHaveBeenCalledWith(2)
    expect(input).toHaveValue('2')
    expect(showToast).toHaveBeenCalledTimes(1)
    expect(showToast).toHaveBeenCalledWith(
      'This product is sold by fractions of 1un. That is why the entered quantity has been rounded to 2un.'
    )
  })

  it('should increase quantity by one when pressing the increase button', () => {
    const onChange = jest.fn()

    render(<QuantityStepper id="1" value={1} onChange={onChange} />)

    const increaseButton = screen.getByRole('button', {
      name: /Increase quantity/i,
    })

    fireEvent.click(increaseButton)

    expect(onChange).toHaveBeenCalledWith(2)

    const input = screen.getByLabelText(/product quantity/i)

    expect(input).toHaveValue('2')
  })

  it('should decrease quantity by one when pressing the decrease button', () => {
    const onChange = jest.fn()

    render(<QuantityStepper id="1" value={2} onChange={onChange} />)

    const decreaseButton = screen.getByRole('button', {
      name: /Decrease quantity/i,
    })

    fireEvent.click(decreaseButton)

    expect(onChange).toHaveBeenCalledWith(1)

    const input = screen.getByLabelText(/product quantity/i)

    expect(input).toHaveValue('1')
  })

  it('should update input value when value prop changes', () => {
    const { rerender } = render(<QuantityStepper id="1" value={1} />)

    const input = screen.getByLabelText(/product quantity/i)

    expect(input).toHaveValue('1')

    rerender(<QuantityStepper id="1" value={2} />)

    expect(input).toHaveValue('2')
  })

  it('should not update input value when input is focused', () => {
    const { rerender } = render(<QuantityStepper id="1" value={1} />)

    const input = screen.getByLabelText(/product quantity/i)

    expect(input).toHaveValue('1')

    fireEvent.focus(input)

    rerender(<QuantityStepper id="1" value={2} />)

    expect(input).toHaveValue('1')

    fireEvent.blur(input)

    expect(input).toHaveValue('2')
  })

  it('can handle unit multipliers changes in the input', () => {
    const onChange = jest.fn()
    const showToast = jest.fn()

    render(
      <ToastContext.Provider value={{ showToast }}>
        <QuantityStepper
          id="1"
          value={1}
          onChange={onChange}
          unitMultiplier={0.5}
        />
      </ToastContext.Provider>
    )

    const input = screen.getByLabelText(/product quantity/i)

    expect(input).toHaveValue('0.5')

    fireEvent.change(input, { target: { value: '1.4' } })
    fireEvent.blur(input)

    expect(input).toHaveValue('1.5')
    expect(onChange).toHaveBeenLastCalledWith(3)
    expect(showToast).toHaveBeenLastCalledWith(
      'This product is sold by fractions of 0.5un. That is why the entered quantity has been rounded to 1.5un.'
    )
  })

  it('can handle increments of unit multiplier in increase and decrease button', () => {
    const onChange = jest.fn()

    const { rerender } = render(
      <QuantityStepper
        id="1"
        value={1}
        onChange={onChange}
        unitMultiplier={0.5}
      />
    )

    const increaseButton = screen.getByRole('button', {
      name: /increase quantity/i,
    })

    const decreaseButton = screen.getByRole('button', {
      name: /decrease quantity/i,
    })

    const input = screen.getByLabelText(/product quantity/i)

    expect(input).toHaveValue('0.5')

    fireEvent.click(increaseButton)

    expect(input).toHaveValue('1')
    expect(onChange).toHaveBeenLastCalledWith(2)

    expect(onChange).toHaveBeenCalledTimes(1)

    rerender(
      <QuantityStepper
        id="1"
        value={2}
        onChange={onChange}
        unitMultiplier={0.5}
      />
    )

    fireEvent.click(decreaseButton)

    expect(input).toHaveValue('0.5')
    expect(onChange).toHaveBeenLastCalledWith(1)

    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it('should display measurement unit alongside input', () => {
    render(<QuantityStepper id="1" value={1} measurementUnit="kg" />)

    expect(screen.getByText('kg')).toBeInTheDocument()
  })

  it('should remove item when decreasing quantity with button', () => {
    const onChange = jest.fn()

    render(<QuantityStepper id="1" value={1} onChange={onChange} />)

    const decreaseButton = screen.getByLabelText(/decrease quantity/i)

    fireEvent.click(decreaseButton)

    expect(onChange).toHaveBeenCalledWith(0)
  })

  it("shouldn't show toast when typed number isn't a number", () => {
    const showToast = jest.fn()
    const onChange = jest.fn()

    render(
      <ToastContext.Provider value={{ showToast }}>
        <QuantityStepper
          id="1"
          value={1}
          unitMultiplier={0.5}
          onChange={onChange}
        />
      </ToastContext.Provider>
    )

    const input = screen.getByLabelText(/product quantity/i)

    fireEvent.change(input, { target: { value: 'abc' } })
    fireEvent.blur(input)

    expect(onChange).toHaveBeenCalledWith(1)
    expect(showToast).not.toHaveBeenCalled()
  })

  it("shouldn't remove product when quantity is rounded to minimum value", () => {
    const onChange = jest.fn()

    render(<QuantityStepper id="1" value={1} onChange={onChange} />)

    const input = screen.getByLabelText(/product quantity/i)

    fireEvent.change(input, { target: { value: '0.1' } })
    fireEvent.blur(input)

    expect(onChange).toHaveBeenCalledWith(1)
  })
})
