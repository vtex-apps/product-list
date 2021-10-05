import type { FunctionComponent } from 'react'
import React, { useEffect, useMemo, useState } from 'react'
import { Loading } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import { useFullSession } from 'vtex.session-client'
import { useItemContext } from './ItemContext'
import { opaque } from './utils/opaque'
import { IdentifierType } from './constants/Identifiers'
const CSS_HANDLES = [
  'productIdentifier',
  'productIdentifierValue',
  'productIdentifierLabelValue',
] as const
interface Props {
  identifierLabel?: string
  identifierOption?: string
}
interface Balance {
  totalQuantity: number;
  reservedQuantity: number;
}
const ProductReference: FunctionComponent<Props> = (props) => {
  const { identifierOption, identifierLabel } = props
  const { item, loading } = useItemContext()
  const session = useFullSession()
  const handles = useCssHandles(CSS_HANDLES)
  const [userId, setUserId] = useState<string>('');
  const [warehouse, setWarehouse] = useState<string>('');
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const prodId = item.id;
  const [balance, setBalance] = useState<Balance>({ totalQuantity: 0, reservedQuantity: 0 })
  const getData = () => {
    fetch(`https://${window.location.hostname}/_v/status/${prodId}/${warehouse}`,
      {
        credentials: 'include'
      })
      .then(response => response.json())
      .then(json => {
        console.log('json', json)
        setBalance(json.balance[0])
      })
  }
  const getUser = () => {
    fetch(`https://${window.location.hostname}/_v/user/${userId}`,
      {
        credentials: 'include'
      })
      .then(response => response.json())
      // eslint-disable-next-line no-console
      .then(user => {
        console.log('user product list',user)
        if(user[0].agente === "VE" || user[0].agente === "VC" || user[0].agente === "CO") {
          setWarehouse(user[0].sucursal)
          setIsSeller(true);
        }
      })
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(session?.data?.session?.namespaces?.authentication?.storeUserId?.value)
    }
  }, [session])
  useEffect(() => {
    if (userId) {
      getUser()
    }
  }, [userId])
  useEffect(() => {
    if (userId) {
      getData()
    }
  }, [warehouse, item.id])
  const identifierValue = useMemo(() => {
    if (identifierOption === IdentifierType.PRODUCT_REFERENCE_ID)
      return item.productRefId
    if (identifierOption === IdentifierType.PRODUCT_SKU_REFERENCE_ID)
      return item.refId
    if (identifierOption === IdentifierType.PRODUCT_SKU_ITEM_ID) return item.id
    if (identifierOption === IdentifierType.PRODUCT_ID) return item.productId
    return item.productRefId
  }, [item.productRefId, identifierOption, item.id, item.productId, item.refId])
  if (loading) return <Loading />
  if (!identifierValue) return null
  return (
    <div
      className={`c-on-base t-title lh-copy fw6 fw5-m ${handles.productIdentifier
        } ${opaque(item.availability)}`}
    >
      {identifierLabel && (
        <span className={`${handles.productIdentifierLabelValue}`}>
          {identifierLabel}
        </span>
      )}
      <span className={`${handles.productIdentifierValue}`}>
        {identifierValue}
      </span>
      { isSeller && <p>Disponibles:{balance.totalQuantity - balance.reservedQuantity ?? 0}</p> }
    </div>
  )
}
export default ProductReference