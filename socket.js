class WebSocketConnection {
  constructor() {
    this.socket = null
    this.nextMessageId = 1
    this.onMessageReceivedMap = {}
    this.isConnected = false
    this.isWaitedOnUntilConnected = false
    this.isWaitedOnForConnectionOnConnect = null
  }

  connect = () => {
    console.log('connecting ...')

    this.isConnected = false
    this.socket = new WebSocket('ws://127.0.0.1:8001');

    this.socket.onopen = () => {
      this.isConnected = true;
      this.send('hello') // initial message is the id of this connection in server
      if (this.isWaitedOnUntilConnected) {
        this.resolveWaitedUntilConnectedCallback()
      }
    }

    this.socket.onmessage = (e) => {
      const message = JSON.parse(e.data)

      if (message.requestId in this.onMessageReceivedMap) {
        this.onMessageReceivedMap[message.requestId](message.data)
        delete this.onMessageReceivedMap[message.requestId]
      }
      this.#handleMessage(message)
    }

    return this
  }

  waitUntilConnected = (timeoutInterval = 5000) => {
    return new Promise((resolve, reject) => {
      if (this.isConnected) {
        resolve(this)
      }

      this.isWaitedOnUntilConnected = true
      this.resolveWaitedUntilConnectedCallback = () => {
        this.isWaitedOnUntilConnected = false
        resolve(this)
      }

      setTimeout(() => {
        if (!this.isConnected && this.isWaitedOnUntilConnected) {
          reject('Connection timed out ...')
        }
      }, timeoutInterval)
    })
  }


  sendAsync = (messageData, timeoutInterval = 5000) => {
    console.log(`sending async message ... ${messageData}`)

    return new Promise((resolve, reject) => {
      const message = this.#buildMessage(messageData)
      const messageId = message.id

      let messageReceived = false

      const onMessageReceived = (messageData) => {
        console.log('Message response received ...')
        messageReceived = true;
        resolve(messageData)
      }

      this.onMessageReceivedMap[messageId] = onMessageReceived

      this.socket.send(JSON.stringify(message))
      setTimeout(() => {
        if (!messageReceived) {
          reject('Message response timed out. No message response received ...')
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

  #handleMessage = (message) => {
    const {
      requestId,
      method,
      data
    } = message

    if (method === 'start-task') {
      const taskName = data?.taskName
      if (taskName == 'query-hashtags') {
        queryHashtagsTask();
      }
    }
  }
}

socket = new WebSocketConnection()
socket.connect()
