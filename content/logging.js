const log = (message) => {
  chrome.runtime.sendMessage(message = {
    method: 'log',
    message: new Date().toISOString() + ' : ' + message
  })
}