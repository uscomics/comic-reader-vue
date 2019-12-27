export let urlBase = state => {
  return state.urlBase
}
export let authorization = state => {
  if (!state.account) return null
  return state.account.authorization
}
export let username = state => {
  if (!state.account) return null
  return state.account.username
}
export let firstName = state => {
  if (!state.account) return null
  return state.account.firstName
}
export let lastName = state => {
  if (!state.account) return null
  return state.account.lastName
}
export let email = state => {
  if (!state.account) return null
  return state.account.email
}
export let purchased = state => {
  return state.purchased
}
export let purchasedCount = state => {
  if (!state.purchased) return 0
  return state.purchased.length
}
export let purchasedItem = (state) => (index) => {
  if (!state.purchased || state.purchased.length <= index || 0 > index) return null
  return state.purchased[index]
}
export let bookInfo = state => {
  return state.bookInfo
}
export let bookInfoCount = state => {
  if (!state.bookInfo) return 0
  return state.bookInfo.length
}
export let bookInfoiteItem = (state) => (index) => {
  if (!state.bookInfo || state.bookInfo.length <= index || 0 > index) return null
  return state.bookInfo[index]
}
export let currentBook = state => {
  return state.currentBook
}
export let currentBookPages = state => {
  if (!state.currentBook) return []
  return state.currentBook.pages
}
export let currentBookPageCount = state => {
  if (!state.currentBook) return 0
  return state.currentBook.pages.length
}
export let currentBookId = state => {
  if (!state.currentBook) return ''
  return state.currentBook.id
}
export let currentBookIssue = state => {
  if (!state.currentBook) return 0
  return state.currentBook.issue
}
export let favoritesCount = state => {
  if (!state.favorites) return 0
  return state.favorites.length
}
export let favoriteItem = (state) => (index) => {
  if (!state.favorites || state.favorites.length <= index || 0 > index) return null
  return state.favorites[index]
}
export let hasFavorite = (state) => (favorite) => {
  if (!state.favorites) return false
  for (let i = state.favorites.length - 1; i >= 0; i--) {
    let fav = state.favorites[i]
    if (fav.id !== favorite.id || fav.issue !== favorite.issue) continue
    return true
  }
  return false
}
export let cart = state => {
  if (!state.cart) return null
  return state.cart
}
export let cartCount = state => {
  if (!state.cart) return 0
  return state.cart.length
}
export let cartItem = (state) => (index) => {
  if (!state.cart || state.cart.length <= index || 0 > index) return null
  return state.cart[index]
}
export let hasCart = (state) => (cart) => {
  if (!state.cart) return false
  for (let i = state.cart.length - 1; i >= 0; i--) {
    let car = state.cart[i]
    if (car.id !== cart.id || car.issue !== cart.issue) continue
    return true
  }
  return false
}
export let userPanelState = (state) => {
  return state.userPanelState
}
