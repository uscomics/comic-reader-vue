export function SET_ACCOUNT (state, account) {
  state.account = account
}
export function SET_CURRENT_BOOK (state, currentBook) {
  state.currentBook = currentBook
}
export function SET_PURCHASED (state, purchased) {
  state.purchased = purchased
}
export function SET_BOOK_INFO (state, bookInfo) {
  state.bookInfo = bookInfo
}
export function SET_AUTHORIZATION (state, authorization) {
  state.authorization = authorization
}
export function SET_CART (state, cart) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].issue.length) cart[i].issue = parseInt(cart[i].issue)
  }
  state.cart = cart
}
export function ADD_CART (state, cart) {
  if (!state.cart) state.cart = []
  let car = { ...cart }
  if (car.issue.length) car.issue = parseInt(car.issue)
  state.cart.push(car)
}
export function REMOVE_CART (state, cart) {
  if (!state.cart) return
  let inCart = { ...cart }
  if (inCart.issue.length) inCart.issue = parseInt(inCart.issue)
  for (let i = state.cart.length - 1; i >= 0; i--) {
    let car = state.cart[i]
    if (car.id !== inCart.id || car.issue !== inCart.issue) continue
    state.cart.splice(i, 1)
    return
  }
}
export function SET_FAVORITES (state, favorites) {
  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i].issue.length) favorites[i].issue = parseInt(favorites[i].issue)
  }
  state.favorites = favorites
}
export function ADD_FAVORITE (state, favorite) {
  if (!state.favorites) state.favorites = []
  let fav = { ...favorite }
  if (fav.issue.length) fav.issue = parseInt(fav.issue)
  state.favorites.push(fav)
}
export function REMOVE_FAVORITE (state, favorite) {
  if (!state.favorites) return
  let inFav = { ...favorite }
  if (inFav.issue.length) inFav.issue = parseInt(inFav.issue)
  for (let i = state.favorites.length - 1; i >= 0; i--) {
    let fav = state.favorites[i]
    if (fav.id !== inFav.id || fav.issue !== inFav.issue) continue
    state.favorites.splice(i, 1)
    return
  }
}
export function SIGN_OUT (state) {
  state.account = null
  state.currentBook = null
  state.purchased = null
  state.favorites = null
  state.cart = null
}
export function SET_USER_PANEL_STATE (state, userPanelState) {
  state.userPanelState = userPanelState
}
export function SET_READER_STATE (state, readerState) {
  state.readerState = readerState
}
