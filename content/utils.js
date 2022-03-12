const log = (message) => {
  chrome.runtime.sendMessage(message = {
    method: 'log',
    message
  })
}

const clickElement = async (element) => {
  await socket.waitUntilConnected()
  await socket.sendAsync('screen-capture')

  const cleanup = highlightElement(element)

  await socket.sendAsync('screen-capture')
  
  cleanup()
  
  const response = await socket.sendAsync('compute-difference-between-last-two-images')
  const [x, y] = response

  await socket.sendAsync(`mouse-click ${x},${y}`)
}

const highlightElement = (element) => {
  console.log('highlighting element ...')

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
    console.log('cleaning up element ...')
    elements.forEach((element, index) => {
      element.style.backgroundColor = styleBackups[index].backgroundColor;
      element.style.borderColor = styleBackups[index].borderColor;
      element.style.color = styleBackups[index].color;
    })
  }

  return cleanup
}

const waitUntilElementRenders = (elementQuery, timeoutInterval = 5000) => {
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
