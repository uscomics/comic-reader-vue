import UserState from '../../util/user-state'
import Image from '../../data/image'

// urlBase: 'https://us-comics.herokuapp.com/',
export default function () {
  return {
    urlBase: 'https://us-comics.herokuapp.com/',
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
