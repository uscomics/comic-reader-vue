import HTTP from '../util/http'

class UserCart {
  static async postPurchaseToServer (url, username, booksToPurchase) {
    let formData = new FormData()
    if (username) formData.set('username', username)
    if (booksToPurchase) formData.set('books', booksToPurchase)
    return HTTP.postToServer(url, formData)
  }
  constructor (username, id, issue) {
    this.username = username
    this.id = id
    this.issue = issue
    if (this.issue.length) this.issue = parseInt(this.issue)
  }
  async postToServer (url) {
    let formData = new FormData()
    if (this.username) formData.set('username', this.username)
    if (this.id) formData.set('id', this.id)
    if (this.issue) formData.set('issue', this.issue)
    return HTTP.postToServer(url, formData)
  }
}
export default UserCart
