chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  const {
    method,
    url,
    message: log_message
  } = message

  if (method == 'newTab') {
    navigateToUrl(url)
  }
  if (method == 'navigate_to_url') {
    navigateToUrl(url)
  }
  if (method == 'log') {
    console.log(log_message)
  }

})

chrome.tabs.onCreated.addListener((tab) => {
  tabs.push(tab)
})