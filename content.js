chrome.runtime.onMessage.addListener((request, sender, sendMessage) => {
  if (request?.method == 'writeHashtag') {
    writeHashtag()
  }
})

const writeHashtag = () => {
  const socket = new WebSocket('ws://127.0.0.1:8001')
  socket.onopen = async () => {

    const searchBarBox = getSearchBarBox();
    const [x, y] = searchBarBox.center
  
    let messagesReceived = 0;

    socket.onmessage = (e) => {
      if (messagesReceived === 0) {
        messagesReceived ++
        console.log('response received!', e)
        socket.send(`keyboard-write "#testing"`)
        setTimeout(() => {
          const data = getHashtagData()
          socket.send(JSON.stringify(data))
        }, 1000)
      }
    }
    
    socket.send(`mouse-click ${x},${y}`)

  }
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
  return getElementBox(document.querySelector('input[aria-label="Search Input"]'))
}

const getElementBox = (element) => {
  const _screenWidth = window.screen.width
  const _screenHeight = window.screen.height
  const _docWidth = window.document.documentElement.clientWidth
  const _docHeight = window.document.documentElement.clientHeight
  const _eleRect = element.getBoundingClientRect()

  const _xOffset = _docWidth * .04
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