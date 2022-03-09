chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.method == 'newTab') {
    newTab()
  }
})

const newTab = async (url=null) => {
  console.log('opening tab')
  chrome.tabs.create({
    active: true
  })
}