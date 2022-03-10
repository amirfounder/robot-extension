chrome.runtime.onMessage.addListener((request, sender, sendMessage) => {
  if (request?.method == 'writeHashtag') {
    writeHashtag()
  }
  if (request?.method == 'login') {
    instagramLogin()
  }
  if (request?.method == 'googleCreateAccount') {
    googleCreateAccount()
  }
})
