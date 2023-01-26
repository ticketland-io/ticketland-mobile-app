import Record from '@ppoliani/im-record'

const send = (self, msg) => {
  self.ws.send(JSON.stringify(msg))
}

const unsubscribe = (self, msg, index) => {
  self.subscribers[msg].splice(index)
}

const subscribe = (self, msg, fn) => {
  if (!self.subscribers[msg]) {
    self.subscribers[msg] = []
  }
 
  return self.subscribers[msg].push(fn) - 1
}

const init = async self => new Promise((resolve) => {
  const ws = new WebSocket(`${process.env.CHECKOUT_WS}/ws/`)

  ws.addEventListener('open', () => {
    resolve()
  })

  ws.addEventListener('message', msg => {
    const data = JSON.parse(msg.data)
    const event = typeof data.result === 'string' ? data.result : Object.keys(data.result)[0]
    const subscribers = self.subscribers[event]
    
    if(subscribers) {
      subscribers.forEach(fn => fn(data))
    }
  })

  self.ws = ws
})

const Ws = Record({
  ws: null,
  subscribers: {},
  subscribe,
  unsubscribe,
  init,
  send,
})

export default Ws
