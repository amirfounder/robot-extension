chrome.runtime.onMessage.addListener((request, sender, sendMessage) => {
  if (request?.method == 'writeHashtag') {
    writeHashtag('test')
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
