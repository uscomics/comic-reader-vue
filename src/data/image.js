class Image {
  static SORT_BY_NAME = 1
  static SORT_BY_DATE = 2
  static BOOK = 1
  static PREVIEW = 2
  static async getFromServer (url) {
    try {
      // TODO: Add AUTHORIATION header
      let response = await fetch(url, { method: 'GET' })
      let body = await response.blob()

      return { status: response.status, statusText: response.statusText, body: URL.createObjectURL(body), headers: response.headers, cookies: response.cookies }
    } catch (e) {
      return { status: 500, body: JSON.stringify(e) }
    }
  }
}
export default Image
