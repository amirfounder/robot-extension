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
  log('write hashtggs method called')

  selfDestruct()

  await socket.waitUntilConnected()
  const element = await waitUntilElementRenders(() => searchBoxElement().parentElement)
  await clickElement(element)
  await socket.sendAsync(`keyboard-write "#${hashtagValue}"`)

  setTimeout(async () => {

    const hashtags = getHashtagData()
    await socket.send(hashtags)

  }, 1000)
}

const queryHashtagsTask = async () => {
  log('triggered the queryHashtagsTask task ...')
  log('begun writing hashtags ...')
  writeHashtag('test')
}
