import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import { Button } from 'vtex.styleguide'

import { useItemContext } from './components/ItemContext'
import { AVAILABLE, CANNOT_BE_DELIVERED } from './constants/Availability'

const AvailabilityMessage: FunctionComponent = () => {
  const {
    item: { availability },
    onRemove,
  } = useItemContext()

  return availability !== AVAILABLE ? (
    <div className="bg-warning--faded br2 flex-m justify-between mt4">
      <div className="self-center ph4 pt4 pt0-m">
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

export default AvailabilityMessage
