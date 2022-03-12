class WebSocketConnection {
  constructor() {
    this.connection = null
    this.nextMessageId = 1
    this.onMessageReceivedMap = {}
    this.isConnected = false
    this.isWaitedOnUntilConnected = false
    this.isWaitedOnForConnectionOnConnect = null
  }

  connect = () => {
    log('connecting ...')

    this.isConnected = false
    this.connection = new WebSocket('ws://127.0.0.1:8001');

    this.connection.onopen = () => {
      this.isConnected = true;
      this.send({
        method: 'register-connection',
        url: document.location.href
      })
      if (this.isWaitedOnUntilConnected) {
        this.resolveWaitedUntilConnectedCallback()
      }
    }

    this.connection.onmessage = (e) => {
      const message = JSON.parse(e.data)

      if (message.requestId in this.onMessageReceivedMap) {
        this.onMessageReceivedMap[message.requestId](message.data)
        delete this.onMessageReceivedMap[message.requestId]
      }
      this.#handleMessage(message)
    }

    this.connection.onclose = () => {
      this.isConnected = false;
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
          log('Connection timed out ...')
          reject('Connection timed out ...')
        }
      }, timeoutInterval)
    })
  }


  sendAsync = (messageData, timeoutInterval = 5000) => {
    log(`sending async message ... ${messageData}`)

    return new Promise((resolve, reject) => {
      const message = this.#buildMessage(messageData)
      const messageId = message.id

      let messageReceived = false

      const onMessageReceived = (messageData) => {
        log('Message response received ...')
        messageReceived = true;
        resolve(messageData)
      }

      this.onMessageReceivedMap[messageId] = onMessageReceived

      this.connection.send(JSON.stringify(message))
      setTimeout(() => {
        if (!messageReceived) {
          log('Message response timed out. No message response received ...')
          reject('Message response timed out. No message response received ...')
        }
      }, timeoutInterval)
    })
  }

  send = (messageData) => {
    this.connection.send(JSON.stringify(this.#buildMessage(messageData)))
  }

  close = (...args) => {
    this.connection.close(...args)
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

  #handleMessage = async (message) => {
    log('Handing message ... ' + JSON.stringify(message))

    if (message?.method === 'start-task') {
      handleTaskRequest(message)
    }
  }
}

socket = new WebSocketConnection()
socket.connect()
