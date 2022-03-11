const navigateToUrl = (url) => {
  return new Promise((resolve, reject) => {

    const lastOpenedTab = tabs.at(-1)
    if (!lastOpenedTab) {
      console.error(`Failed to get current tab`)
      reject('Failed to get current tab')
    }

    let hasNavigatedToUrl = false

    chrome.tabs.update(lastOpenedTab?.id, { url })

    const onNavigatedToUrlListener = (tabId, changeInfo, tab) => {
      console.log('Tabs updated : ', tabId, changeInfo, tab)
      if (tabId === lastOpenedTab?.id && changeInfo?.status == 'complete') {
        hasNavigatedToUrl = true
        console.log(`Navigated to url : ${url}`)
        chrome.tabs.onUpdated.removeListener(onNavigatedToUrlListener)
        resolve()
      }
    }

    chrome.tabs.onUpdated.addListener(onNavigatedToUrlListener)

    setTimeout(() => {
      if (!hasNavigatedToUrl) {
        console.error(`Failed to navigate to URL: ${url}`)
        reject(`Failed to navigate to URL: ${url}`)
      }
    }, 5000)

  })
}
