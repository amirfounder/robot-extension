const clickElement = async (element) => {

  const socket = new WebSocketConnection()
  await socket.connect()

  await socket.sendAsync('screen-capture')

  const cleanup = highlightElement(element)

  await socket.sendAsync('screen-capture')
  
  cleanup()
  
  const response = await socket.sendAsync('compute-difference-between-last-two-images')
  const [x, y] = response

  await socket.sendAsync(`mouse-click ${x},${y}`)

  socket.close()

}


const highlightElement = (element) => {
  console.log('highlighting element ...')
  const styleBackups = []

  const elements = Array.from(element.querySelectorAll('*'))

  elements.forEach((element) => {
    const styleBackup = {
      backgroundColor: element.style.backgroundColor,
      borderColor: element.style.borderColor,
      color: element.style.color
    }
    styleBackups.push(styleBackup)
    element.style.backgroundColor = 'red';
    element.style.borderColor = 'red';
    element.style.color = 'red'
  })

  const cleanup = () => {
    console.log('cleaning up element ...')
    elements.forEach((element, index) => {
      const {
        backgroundColor,
        borderColor,
        color
      } = styleBackups[index]
      element.style.backgroundColor = backgroundColor;
      element.style.borderColor = borderColor;
      element.style.color = color;
    })
  }

  return cleanup
}
