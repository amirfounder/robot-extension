const writeHashtagsButton = document.querySelector('#write-hashtags-button')
const writeHashtagsInput = document.querySelector('#write-hashtags-input')
const newTabButton = document.querySelector('#new-tab-button')
const loginButton = document.querySelector('#login-button')

writeHashtagsButton.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { method: 'writeHashtag' })
})

loginButton.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { method: 'login' })
})

newTabButton.addEventListener('click', () => {
  chrome.runtime.sendMessage({ method: 'newTab' })
})
