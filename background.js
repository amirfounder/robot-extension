chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.method == 'newTab') {
    navigateToUrl(message?.url)
  }
})

const navigateToUrl = async (url) => {
  chrome.tabs.create({
    active: true,
    url
  })
}
