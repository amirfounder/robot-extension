chrome.runtime.onMessage.addListener((message, sender, _sendResponse) => {
  const {
    method,
    message: log_message
  } = message

  if (method == 'log') {
    log(log_message)
  }

  if (method == 'self-destruct') {
    log(`Request received to remove tab with id : ${sender?.tab?.id}`)
    chrome.tabs.remove(sender?.tab?.id)
  }
})

const log = (message) => { console.log(new Date().toISOString() + ' : ' + message) }
