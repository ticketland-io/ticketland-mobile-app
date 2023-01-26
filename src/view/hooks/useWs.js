import {useEffect, useState} from 'react'
import Ws from '../../services/ws'

export default () => {
  const [ws, setWs] = useState()

  useEffect(() => {
    const initWs = async () => {
      const ws = Ws()
      await ws.init()
      setWs(ws)
    }
    
    initWs().catch(console.error)
  }, [])

  return ws
}
