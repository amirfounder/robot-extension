const createAccountButton = () => document.querySelector('div[jsname="WjL7X"]')
const forMyselfButton = () => Array.from(document.querySelectorAll('span.VfPpkd-StrnGf-rymPhb-pZXsl')).find(ele => ele.textContent === 'For myself')

const navigateToCreateAccountPage = () => {
  Array.from(document.querySelector('ul[aria-label="Create account"]').children).find(x => x.textContent === 'For myself').click()
}

const googleCreateAccount = async () => {

  await clickElement(createAccountButton().parentElement)

  setTimeout(async () => {

    await clickElement(forMyselfButton().parentElement)

  }, 300)

}