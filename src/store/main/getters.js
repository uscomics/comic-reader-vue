export const urlBase = state => {
  return state.urlBase
}
export const authorization = state => {
  if (!state.account) return null
  return state.account.authorization
}
export const username = state => {
  if (!state.account) return null
  return state.account.username
}
export const firstName = state => {
  if (!state.account) return null
  return state.account.firstName
}
export const lastName = state => {
  if (!state.account) return null
  return state.account.lastName
}
export const email = state => {
  if (!state.account) return null
  return state.account.email
}
export const purchased = state => {
  return state.purchased
}
export const purchasedCount = state => {
  if (!state.purchased) return 0
  return state.purchased.length
}
export const purchasedItem = (state) => (index) => {
  if (!state.purchased || state.purchased.length <= index || 0 > index) return null
  return state.purchased[index]
}
export const bookInfo = state => {
  return state.bookInfo
}
export const bookInfoCount = state => {
  if (!state.bookInfo) return 0
  return state.bookInfo.length
}
export const bookInfoiteItem = (state) => (index) => {
  if (!state.bookInfo || state.bookInfo.length <= index || 0 > index) return null
  return state.bookInfo[index]
}
export const currentBook = state => {
  return state.currentBook
}
export const currentBookPages = state => {
  if (!state.currentBook) return []
  return state.currentBook.pages
}
export const currentBookPageCount = state => {
  if (!state.currentBook) return 0
  return state.currentBook.pages.length
}
export const currentBookId = state => {
  if (!state.currentBook) return ''
  return state.currentBook.id
}
export const currentBookIssue = state => {
  if (!state.currentBook) return 0
  return state.currentBook.issue
}
export const favoritesCount = state => {
  if (!state.favorites) return 0
  return state.favorites.length
}
export const favoriteItem = (state) => (index) => {
  if (!state.favorites || state.favorites.length <= index || 0 > index) return null
  return state.favorites[index]
}
export const hasFavorite = (state) => (favorite) => {
  if (!state.favorites) return false
  for (let i = state.favorites.length - 1; i >= 0; i--) {
    let fav = state.favorites[i]
    if (fav.id !== favorite.id || fav.issue !== favorite.issue) continue
    return true
  }
  return false
}
export const cart = state => {
  if (!state.cart) return null
  return state.cart
}
export const cartCount = state => {
  if (!state.cart) return 0
  return state.cart.length
}
export const cartItem = (state) => (index) => {
  if (!state.cart || state.cart.length <= index || 0 > index) return null
  return state.cart[index]
}
export const hasCart = (state) => (cart) => {
  if (!state.cart) return false
  for (let i = state.cart.length - 1; i >= 0; i--) {
    let car = state.cart[i]
    if (car.id !== cart.id || car.issue !== cart.issue) continue
    return true
  }
  return false
}
export const userPanelState = (state) => {
  return state.userPanelState
}
