import React, { useState } from 'react'
import { Input } from 'vtex.styleguide'

import TranslatedTitle from './components/TranslatedTitle'

import styles from './styles.css'

const Example: StorefrontFunctionComponent<ExampleProps> = ({ title }) => {
  const [inputValue, setValue] = useState<string | null>(null)

  return (
    <div className={`${styles.container} flex flex-column pv6 ph4`}>
      <TranslatedTitle title="Hello from Product List!" />
      <div className="t-body pv4">
        <span>Foobar</span>
      </div>
      <Input
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
    </div>
  )
}

interface ExampleProps {
  title?: string
}

Example.schema = {
  title: 'editor.base-store-component.title',
  description: 'editor.base-store-component.description',
  type: 'object',
  properties: {
    title: {
      title: 'editor.base-store-component.title.title',
      description: 'editor.base-store-component.title.description',
      type: 'string',
      default: null,
    },
  },
}

export default Example
