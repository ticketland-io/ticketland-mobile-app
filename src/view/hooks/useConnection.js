import {useEffect, useState} from 'react'
import * as anchor from '@project-serum/anchor'

const {Connection} = anchor.web3

export default (rpcServer) => {
  const [connection, setConnection] = useState()

  useEffect(() => {
    const initConnection = async () => {
      setConnection(
        new Connection(rpcServer, 'confirmed')
      )
    }
    
    initConnection().catch(console.error)
  }, [])

  return connection
}
