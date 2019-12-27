import HTTP from '../util/http'
import UserMessages from '../util/user-messages'

class Account {
  static async getUserInfoFromServer (url) {
    return HTTP.getFromServer(url)
  }
  static async getUserCartFromServer (url) {
    return HTTP.getFromServer(url)
  }
  static async getUserFavoritesFromServer (url) {
    return HTTP.getFromServer(url)
  }
  static async getUserPurchasesFromServer (url) {
    return HTTP.getFromServer(url)
  }
  constructor (username, password, email, firstName, lastName, rememberMe, groups, authorization) {
    this.username = username
    this.password = password
    this.email = email
    this.firstName = firstName
    this.lastName = lastName
    this.rememberMe = rememberMe
    this.groups = groups
    this.authorization = authorization
  }
  validate () {
    if (!this.username || 0 === this.username.length) return UserMessages.ERROR_USERNAME_REQUIRED
    if (5 > this.username.length) return UserMessages.ERROR_INVALID_USERNAME_LENGTH
    if (!/[a-zA-Z0-9-_]/.test(this.username)) return UserMessages.ERROR_INVALID_USERNAME
    if (!this.password || 0 === this.password.length) return UserMessages.ERROR_PASSWORD_REQUIRED
    if (5 > this.password.length) return UserMessages.ERROR_PASSWORD_LENGTH
    if (!this.email || 0 === this.email.length) return UserMessages.ERROR_EMAIL_REQUIRED
    if (0 < this.email.length && 5 > this.email.length) return UserMessages.ERROR_INVALID_EMAIL
    if (0 < this.email.length && -1 === this.email.indexOf('@')) return UserMessages.ERROR_INVALID_EMAIL
    if (0 < this.email.length && -1 === this.email.indexOf('.')) return UserMessages.ERROR_INVALID_EMAIL
    return 0
  }
  async postToServer (url, validate = true) {
    if (validate) {
      let errorCode = this.validate()
      if (0 !== errorCode) {
        throw TypeError(errorCode)
      }
    }
    let formData = new FormData()
    if (this.username) formData.set('username', this.username)
    if (this.password) formData.set('password', this.password)
    if (this.email) formData.set('email', this.email)
    if (this.firstName) formData.set('firstName', this.firstName)
    if (this.lastName) formData.set('lastName', this.lastName)
    if (this.rememberMe) formData.set('rememberMe', this.rememberMe)
    if (this.groups) formData.set('group1', this.groups[0])
    return HTTP.postToServer(url, formData)
  }
  async signInToServer (url) {
    let formData = new FormData()
    formData.set('username', this.username)
    formData.set('password', this.password)
    formData.set('rememberMe', this.rememberMe)
    let response = await HTTP.postToServer(url, formData)
    // TO DO
    /*
    if (!result.headers.has('Authorization')) {
      let msg = UserMessages.getMessage(UserMessages.LANGUAGE.en_US, UserMessages.ERROR_INVALID_CREDENTIALS)
      let successMsg = new QueuedUserMessage(msg, UserMessages.SOUND_SUCCESS, 0, false)
      return
    }
    let authorizationHeader = result.headers.get('Authorization')
    this.$store.commit('SET_AUTHORIZATION', authorizationHeader)
    */
    return response
  }
}
export default Account
