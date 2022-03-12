chrome.runtime.onMessage.addListener(async (request, sender, sendMessage) => {
  if (request?.method == 'writeHashtag') {
    await writeHashtag('#test')
  }
  if (request?.method == 'login') {
    instagramLogin()
  }
  if (request?.method == 'googleCreateAccount') {
    googleCreateAccount()
  }
  if (request?.method == 'self-destruct') {
    chrome.runtime.sendMessage({method: 'self-destruct'})
  }
})
