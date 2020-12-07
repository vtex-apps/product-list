import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'

import { useItemContext } from './ItemContext'
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

const CSS_HANDLES = [
  'availabilityMessageContainer',
  'availabilityMessageTextContainer',
  'availabilityMessageText',
] as const

const AvailabilityMessage: React.FC<Props> = ({ layout }) => {
  const {
    item: { availability },
    loading,
  } = useItemContext()

  const handles = useCssHandles(CSS_HANDLES)

  if (loading) {
    return null
  }

  return availability !== AVAILABLE ? (
    <div
      className={`bg-warning--faded br2 ${
        handles.availabilityMessageContainer
      } ${setContainerLayout(layout)}`}
    >
      <div
        className={`lh-title pa4 ${handles.availabilityMessageTextContainer}`}
      >
        {availability === CANNOT_BE_DELIVERED ? (
          <FormattedMessage id="store/product-list.message.cantBeDelivered">
            {(message) => (
              <span className={handles.availabilityMessageText}>{message}</span>
            )}
          </FormattedMessage>
        ) : (
          <FormattedMessage id="store/product-list.message.noLongerAvailable">
            {(message) => (
              <span className={handles.availabilityMessageText}>{message}</span>
            )}
          </FormattedMessage>
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
