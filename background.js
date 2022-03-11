importScripts('utils.js')

chrome.runtime.onMessage.addListener(async (message, _sender, sendResponse) => {
  if (message?.method == 'newTab') {
    navigateToUrl(message?.url)
  }
  if (message?.method == 'navigate_to_url') {
    await navigateToUrl(message?.url)
    sendResponse('SUCCESS')
  }
})

const navigateToUrl = (url) => {
  return new Promise(async (resolve, reject) => {
    const tab = await getCurrentTab()
    if (tab) {
      let hasNavigatedToUrl = false

      chrome.tabs.update(tab?.id, { url })

      const navigatedToUrlListener = (tabId, changeInfo, _tab) => {
        console.log('Tabs updated : ', tabId, changeInfo, _tab)
        if (tabId === tab?.id && changeInfo?.status == 'complete') {
          console.log(`Navigated to url : ${url}`)
          chrome.tabs.onUpdated.removeListener(navigatedToUrlListener)
          hasNavigatedToUrl = true
          resolve()
        }
      }

      chrome.tabs.onUpdated.addListener(navigatedToUrlListener)

      setTimeout(() => {
        if (!hasNavigatedToUrl) {
          console.error(`Failed to navigate to URL: ${url}`)
          reject(`Failed to navigate to URL: ${url}`)
        }
      }, 5000)
    } else {
      console.error(`Failed to get current tab`)
      reject('Failed to get current tab')
    }
  })
}
