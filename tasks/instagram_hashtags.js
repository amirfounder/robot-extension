const searchBoxElement = () => document.querySelector('input[aria-label="Search Input"]')


const getHashtagData = () => {
  const results = Array.from(document.querySelector('.fuqBx, .c7DD5').children)
  return results.map((result) => {
    const dataNodes = Array.from(result.querySelectorAll('._7UhW9, .xLCgt, .qyrsm, .KV-D4, .uL8Hv'))
    const hashtag = dataNodes[1].innerText
    const postsCount = dataNodes[3].querySelector('span').innerText
    return {
      hashtag,
      postsCount
    }
  })
}

const writeHashtag = async () => {
  
  const socket = new WebSocketConnection()

  await socket.connect()

  let response;

  response = await socket.sendAsync('screen-capture')

  const cleanup = highlightElement(searchBoxElement().parentElement)

  response = await socket.sendAsync('screen-capture')

  cleanup()

  response = await socket.sendAsync('compute-difference-between-last-two-images')

  const [x, y] = response

  response = await socket.sendAsync(`mouse-click ${x},${y}`)

  if (!response.toUpperCase().includes('SUCCESS')) {
    console.error(response)
    return
  }

  response = await socket.sendAsync(`keyboard-write "#testing"`)

  if (!response.toUpperCase().includes('SUCCESS')) {
    console.error(response)
    return
  }

  setTimeout(() => {
    
    const hashtags = getHashtagData()
    socket.send(hashtags)
  
    socket.close()
  
  }, 2000)


}
