import React from 'react'
import { FormattedMessage } from 'react-intl'

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

const AvailabilityMessage: StorefrontFunctionComponent<Props> = ({
  layout,
}) => {
  const {
    item: { availability },
    loading,
  } = useItemContext()

  if (loading) {
    return null
  }

  return availability !== AVAILABLE ? (
    <div className={`bg-warning--faded br2 ${setContainerLayout(layout)}`}>
      <div className="lh-title pa4">
        {availability === CANNOT_BE_DELIVERED ? (
          <FormattedMessage id="store/product-list.message.cantBeDelivered" />
        ) : (
          <FormattedMessage id="store/product-list.message.noLongerAvailable" />
        )}
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
