const writeHashtagsButton = document.querySelector('#write-hashtags-button')
const writeHashtagsInput = document.querySelector('#write-hashtags-input')
const visitInstagramButton = document.querySelector('#visit-instagram-button')
const visitGoogleAccountsButton = document.querySelector('#visit-google-accounts-button')
const loginButton = document.querySelector('#login-button')
const createGoogleAccountButton = document.querySelector('#create-google-account-button')

const getCurrentTab = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  return tab
}

writeHashtagsButton.addEventListener('click', async () => {
  const tab = await getCurrentTab()
  chrome.tabs.sendMessage(tab.id, { method: 'writeHashtag' })
})

loginButton.addEventListener('click', async () => {
  const tab = await getCurrentTab()
  chrome.tabs.sendMessage(tab.id, { method: 'login' })
})

visitInstagramButton.addEventListener('click', () => {
  chrome.runtime.sendMessage({ method: 'newTab', url: 'https://www.instagram.com' })
})

visitGoogleAccountsButton.addEventListener('click', () => {
  chrome.runtime.sendMessage({ method: 'newTab', url: 'https://accounts.google.com' })
})

createGoogleAccountButton.addEventListener('click', async () => {
  const tab = await getCurrentTab()
  chrome.tabs.sendMessage(tab.id, { method: 'googleCreateAccount' })
})
