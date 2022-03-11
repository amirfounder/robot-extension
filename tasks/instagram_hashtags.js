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

const writeHashtag = async (hashtagValue) => {

  await socket.waitUntilConnected()
  const element = await waitUntilElementRenders(() => searchBoxElement().parentElement)
  await clickElement(element)
  await socket.sendAsync(`keyboard-write "#${hashtagValue}"`)

  setTimeout(async () => {

    const hashtags = getHashtagData()
    await socket.send(hashtags)

  }, 1000)
}


const navigateToUrl = async () => {
  return new Promise((resolve, reject) => {
    const message = { method: 'navigate_to_url', url: 'https://www.instagram.com' }
    const callback = (response) => {
      console.log(response)
      resolve()
      // if (response == 'SUCCESS') {
      //   resolve()
      // } else {
      //   reject('Received response but it was not a success')
      // }
    }
    chrome.runtime.sendMessage(message, callback)
  })
}


const queryHashtagsTask = async () => {
  console.log('triggered the queryHashtagsTask task ...')
  await navigateToUrl('https://www.instagram.com')
  writeHashtag('test')
}
