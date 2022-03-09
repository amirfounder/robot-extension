const searchBoxElement = () => document.querySelector('input[aria-label="Search Input"]')

chrome.runtime.onMessage.addListener((request, sender, sendMessage) => {
  if (request?.method == 'writeHashtag') {
    writeHashtag()
  }
})

const writeHashtag = async () => {
  
  const socket = new WebSocketConnection()

  await socket.connect()

  const searchBarBox = getSearchBarBox()
  const [x, y] = searchBarBox.center

  let response;

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

  const hashtags = getHashtagData()
  socket.send(hashtags)

  socket.close()

}

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

const getSearchBarBox = () => {
  return getElementBox(searchBoxElement())
}

const getElementBox = (element) => {
  const _screenWidth = window.screen.width
  const _screenHeight = window.screen.height
  const _docWidth = window.document.documentElement.clientWidth
  const _docHeight = window.document.documentElement.clientHeight
  const _eleRect = element.getBoundingClientRect()

  const _xOffset = 40
  const _yOffset = _screenHeight - _docHeight

  const _x = _eleRect.x + _xOffset
  const _y = _eleRect.y + _yOffset

  return {
    x: _x,
    y: _y,
    width: _eleRect.width,
    height: _eleRect.height,
    center: [
      _x + (_eleRect.width / 2),
      _y + (_eleRect.height / 2)
    ]
  }
}