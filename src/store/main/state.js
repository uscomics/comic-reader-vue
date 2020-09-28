import UserState from '../../util/user-state'
import Image from '../../data/image'

// urlBase: 'https://www-hero-web-server.herokuapp.com/',
// urlBase: 'http://localhost:3000/',
// urlBase: 'https://us-comics.herokuapp.com/',
export default function () {
  return {
    urlBase: 'http://localhost:3000/',
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
