import Queue from './queue'
import QueuedUserMessage from './queued-user-message'
import Messages from './messages'
import UserMessages from './user-messages'

class HTTP {
  static async getFromServer (url) {
    try {
      // TODO: Add AUTHORIATION header
      let response = await fetch(url, { method: 'GET' })
      let body = await response.text()

      return { status: response.status, statusText: response.statusText, body: body, headers: response.headers, cookies: response.cookies }
    } catch (e) {
      return { status: 500, body: JSON.stringify(e) }
    }
  }
  static async postToServer (url, form) {
    try {
      // TODO: Add AUTHORIATION header
      let response = await fetch(url, { method: 'POST', body: form })
      let body = await response.text()
      return { status: response.status, statusText: response.statusText, body: body, headers: response.headers, cookies: response.cookies }
    } catch (e) {
      return { status: 500, body: JSON.stringify(e) }
    }
  }
  static hasErrors (result) {
    if (200 === result.status) {
      return false
    } else if (500 !== result.status) {
      let errorMsg = new QueuedUserMessage(result.body, UserMessages.SOUND_ERROR, 0, false)
      Queue.broadcast(Messages.USER_ERROR, errorMsg)
      console.log(result.body)
      return true
    } else {
      let msg = UserMessages.getMessage(UserMessages.LANGUAGE.en_US, UserMessages.ERROR_NETWORK)
      let errorMsg = new QueuedUserMessage(msg, UserMessages.SOUND_ERROR, 0, false)
      Queue.broadcast(Messages.USER_ERROR, errorMsg)
      console.log(msg)
      return true
    }
  }
}
export default HTTP
