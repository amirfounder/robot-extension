const log = (message) => {
  chrome.runtime.sendMessage(message = {
    method: 'log',
    message
  })
}