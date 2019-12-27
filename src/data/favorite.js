import HTTP from '../util/http'

class Favorite {
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
export default Favorite
