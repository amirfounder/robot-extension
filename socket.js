const isFunction = (value) => typeof (value) == 'function'

class WebSocketConnection {
  constructor() {
    this.nextMessageId = 1
    this.onMessageReceivedMap = {}
  }

  connect = () => {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket('ws://127.0.0.1:8001');
      this.socket.onopen = () => {
        resolve(this.socket)
      }
      this.socket.onerror = () => {
        reject(this.socket)
      }
      this.socket.onmessage = (e) => {
        const { data, id } = JSON.parse(e.data)

        if (id in this.onMessageReceivedMap) {
          this.onMessageReceivedMap[id](data)
          delete this.onMessageReceivedMap[id]
        }
      }
    })
  }

  sendAsync = (messageData, timeoutInterval = 10000) => {
    return new Promise((resolve, reject) => {
      const message = this.#buildMessage(messageData)
      const messageId = message.id
      let messageReceived = false

      const onMessageReceived = (messageData) => {
        messageReceived = true;
        resolve(messageData)
      }

      this.onMessageReceivedMap[messageId] = onMessageReceived

      this.socket.send(JSON.stringify(message))

      setTimeout(() => {
        if (!messageReceived) {
          reject('Message response timed out ...')
        }
      }, timeoutInterval)
    })
  }

  send = (messageData) => {
    this.socket.send(JSON.stringify(this.#buildMessage(messageData)))
  }

  close = () => {
    this.socket.close
  }

  #buildMessage = (messageData) => ({
    id: this.#buidlMessageId(),
    data: messageData
  })

  #buidlMessageId = () => {
    const nextMessageId = this.nextMessageId
    this.nextMessageId++
    return nextMessageId
  }
}

