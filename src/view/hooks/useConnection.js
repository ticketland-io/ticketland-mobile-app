import {useEffect, useState} from 'react'
import {Connection, JsonRpcProvider} from '@mysten/sui.js';

export default rpcServer => {
  const [connection, setConnection] = useState()

  useEffect(() => {
    const initConnection = async () => {
      setConnection(
        new JsonRpcProvider(
          new Connection({fullnode: rpcServer}),
        ),
      )
    }

    initConnection().catch(console.error)
  }, [])

  return connection
}
