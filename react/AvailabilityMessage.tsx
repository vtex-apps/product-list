import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Button } from 'vtex.styleguide'

import { useItemContext } from './components/ItemContext'
import { AVAILABLE, CANNOT_BE_DELIVERED } from './constants/Availability'

interface Props {
  layout: 'cols' | 'rows'
}

const setContainerLayout = (prop: string) => {
  switch (prop) {
    case 'cols':
      return 'flex justify-between items-center'
    case 'rows':
      return ''
    default:
      return ''
  }
}

const setTextLayout = (prop: string) => {
  switch (prop) {
    case 'cols':
      return 'pa4'
    case 'rows':
      return 'pt4 pr4 pb0 pl4'
    default:
      return ''
  }
}

const AvailabilityMessage: StorefrontFunctionComponent<Props> = ({ layout }) => {
  const {
    item: { availability },
    onRemove,
  } = useItemContext()

  return availability !== AVAILABLE ? (
    <div className={`bg-warning--faded br2 ${setContainerLayout(
      layout
    )}`}>
      <div className={`t-small lh-title ${setTextLayout(
      layout
    )}`}>
        {availability === CANNOT_BE_DELIVERED ? (
          <FormattedMessage id="store/product-list.message.cantBeDelivered" />
        ) : (
          <FormattedMessage id="store/product-list.message.noLongerAvailable" />
        )}
      </div>
      <div className="ph3">
        <Button variation="tertiary" onClick={onRemove} collapseRight>
          <FormattedMessage id="store/product-list.message.remove" />
        </Button>
      </div>
    </div>
  ) : null
}

AvailabilityMessage.defaultProps = {
  layout: 'cols',
}

AvailabilityMessage.schema = {
  properties: {
    layout: {
      type: 'string',
      default: AvailabilityMessage.defaultProps.layout,
      isLayout: true,
    },
  },
}

export default AvailabilityMessage
