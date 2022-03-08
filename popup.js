const writeHashtagsButton = document.querySelector('#write-hashtags-button')
const writeHashtagsInput = document.querySelector('#write-hashtags-input')

writeHashtagsButton.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { method: 'writeHashtag' })
})
