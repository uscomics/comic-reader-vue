import UserState from '../../util/user-state'
import Image from '../../data/image'
export default function () {
  return {
    urlBase: 'http://localhost:1337/',
    account: null,
    currentBook: null,
    purchased: null,
    bookInfo: null,
    favorites: null,
    cart: null,
    userPanelState: UserState.SIGN_IN,
    readerState: Image.BOOK
  }
}
