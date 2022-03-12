const searchBoxElement = () => document.querySelector('input[aria-label="Search Input"]')

const getHashtagRecommendations = async (startingHashtag = '#oops') => {
  log('getHashtagRecommendations ...')
  writeHashtags(startingHashtag)
}

const writeHashtags = async (startinghashtag) => {
  try {

    log('writeHashtags method called');
    let hashtags
  
    await socket.waitUntilConnected()
    const element = searchBoxElement().parentElement
    await clickElement(element)
  
    await writeHashtag(startinghashtag)
    await delay(1000)
    hashtags = getHashtagData()
    await saveHashtags(hashtags)
    await clearHashtagSearch(startinghashtag)
  
    for (const { hashtag } of hashtags) {
  
      await writeHashtag(hashtag)
      await delay(1000)
      hashtags = getHashtagData()
      await saveHashtags(hashtags)
      await clearHashtagSearch(hashtag)
  
    }

  } catch (error) {
    log(error)
    throw error
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

const clearHashtagSearch = async (hashtag) => {
  await socket.sendAsync({
    method: 'keyboard-backspace',
    count: hashtag.length
  })
}

const saveHashtags = async (hashtags) => {
  await socket.send({
    method: 'save-data',
    data: hashtags,
    metadata: { count: hashtags.length }
  })
}

const writeHashtag = async (hashtag) => {
  await socket.sendAsync({
    method: 'keyboard-write',
    content: hashtag
  })
  await delay(1000)
}
