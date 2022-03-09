const usernameField = () => document.querySelector('input[aria-label="Phone number, username, or email"]')
const passwordField = () => document.querySelector('input[aria-label="Password"]')

const login = async () => {
  const username = ''
  const password = ''

  const socket = new WebSocketConnection()
  await socket.connect()

  await clickElement(usernameField().parentElement)

  await socket.sendAsync('keyboard-write "testUsername"')

  await clickElement(passwordField().parentElement)

  await socket.sendAsync('keyboard-write "password"')

}