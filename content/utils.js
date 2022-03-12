const log = (message) => {
  chrome.runtime.sendMessage(message = {
    method: 'log',
    message
  })
}

const delay = (ms = 500) => new Promise((resolve) => {
  log('starting timer ...')
  setTimeout(() => {
    log('timing out ...')
    resolve()
  }, ms)
})

const clickElement = async (element) => {
  await socket.waitUntilConnected()
  await socket.sendAsync({ method: 'screen-capture' })
  const cleanup = highlightElement(element)
  await delay(250)
  await socket.sendAsync({ method: 'screen-capture' })
  await delay(250)
  cleanup()
  const response = await socket.sendAsync({ method: 'compute-difference-between-last-two-images' })
  const [x, y] = response
  await socket.sendAsync({ method: 'mouse-click', coordinates: [x, y] })
}

const highlightElement = (element) => {
  log('highlighting element ...')

  const styleBackups = []
  const elements = Array.from(element.querySelectorAll('*'))

  elements.forEach((element) => {
    styleBackups.push({
      backgroundColor: element.style.backgroundColor,
      borderColor: element.style.borderColor,
      color: element.style.color
    })
    element.style.backgroundColor = 'red';
    element.style.borderColor = 'red';
    element.style.color = 'red'
  })

  const cleanup = () => {
    log('cleaning up element ...')
    elements.forEach((element, index) => {
      element.style.backgroundColor = styleBackups[index].backgroundColor;
      element.style.borderColor = styleBackups[index].borderColor;
      element.style.color = styleBackups[index].color;
    })
  }

  return cleanup
}

const waitUntilElementRenders = (elementQuery, timeoutInterval = 5000) => {
  log('waitUntilElementRenders called!')
  return new Promise((resolve, reject) => {
    let checkForElementIterationCount = 0
    const maxIterationsCount = timeoutInterval / 100
    const checkForElement = () => {
      setTimeout(() => {
        const element = elementQuery()
        if (element) {
          resolve(element)
        } else {
          if (checkForElementIterationCount < maxIterationsCount) {
            checkForElement()
          } else {
            reject('Could not find element ...')
          }
        }
      }, 100)
    }
  })
}

const selfDestruct = () => {
  socket.send({
    method: 'unregister-connection',
    url: document.location.href
  })
  socket.close(1000)
  chrome.runtime.sendMessage({ method: 'self-destruct' })
}
