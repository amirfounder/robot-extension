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
  
  await socket.waitUntilConnected()

  await clickElement(searchBoxElement().parentElement)

  await socket.sendAsync(`keyboard-write "#testing"`)

  setTimeout(() => {
    
    const hashtags = getHashtagData()
    
    socket.send(hashtags)
    socket.close()
  
  }, 1000)

}
