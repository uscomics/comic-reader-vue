class Issue {
  static SORT_BY_NAME = 1
  static SORT_BY_DATE = 2
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
  static async getBooksFromServer (urlBase, list) {
    return new Promise((resolve, reject) => {
      if (!list) resolve([])
      let getterFunc = async (book) => {
        let url = urlBase + book.id + '/' + book.issue
        let bookInfo = await Issue.getFromServer(url)
        return bookInfo
      }
      Promise.all(list.map(getterFunc)).then((responses) => {
        let data = []
        for (let i = 0; i < responses.length; i++) {
          let response = responses[i]
          if (200 !== response.status) continue
          data.push(JSON.parse(response.body))
        }
        resolve(data)
      })
    })
  }
  static getBook (list, id, issue) {
    if (!list) return null
    for (let i = 0; i < list.length; i++) {
      let book = list[i]
      if (book.id !== id || book.issue !== issue) continue
      return book
    }
    return null
  }
  static hasBook (list, id, issue) {
    return !!Issue.getBook(list, id, issue)
  }
  static sortBooks (list, sortBy) {
    if (!list) return
    if (Issue.SORT_BY_DATE === sortBy) {
      // This is a stable sort.
      // http://www.csharp411.com/c-stable-sort/
      let count = list.length
      for (let j = 1; j < count; j++) {
        let jBook = list[j]

        let i = j - 1
        for (; i >= 0 && parseInt(list[i].transactionDate) > parseInt(jBook.transactionDate); i--) {
          list[i + 1] = list[i]
        }
        list[i + 1] = jBook
      }
      list.reverse()
    } else if (Issue.SORT_BY_NAME === sortBy) {
      let compare = (a, b) => { return (a.id === b.id) ? a.issue - b.issue : ('' + a.id).localeCompare(b.id) }
      list.sort(compare)
    }
  }
  constructor (id, issue) {
    this.id = id
    this.issue = issue
    if (this.issue.length) this.issue = parseInt(this.issue)
  }
  makeKey () { return this.id + ' ' + this.issue }
}
export default Issue
