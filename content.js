chrome.runtime.onMessage.addListener((request, sender, sendMessage) => {
  if (request?.method == 'writeHashtag') {
    writeHashtag()
  }
  if (request?.method == 'login') {
    login()
  }
  if (request?.method == 'googleCreateAccount') {
    googleCreateAccount()
  }
})
