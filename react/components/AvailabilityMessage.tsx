import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import { Button } from 'vtex.styleguide'

import { CANNOT_BE_DELIVERED } from '../constants/Availability'

interface Props {
  availability: string
  onRemove: () => void
}

const AvailabilityMessage: FunctionComponent<Props> = ({
  availability,
  onRemove,
}) => (
  <div className="bg-warning--faded br2 flex-m justify-between">
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
)

export default AvailabilityMessage
