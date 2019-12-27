export default class UserMessages {
  static LANGUAGE = { en_US: 1 }

  static SOUND_NONE = 0
  static SOUND_ERROR = '../assets/Error.wav'
  static SOUND_SUCCESS = '../assets/Success.wav'

  static ERROR_USERNAME_REQUIRED = 1
  static ERROR_INVALID_USERNAME = 2
  static ERROR_INVALID_USERNAME_LENGTH = 3
  static ERROR_PASSWORD_REQUIRED = 4
  static ERROR_PASSWORD_LENGTH = 5
  static ERROR_PASSWORDS_DO_NOT_MATCH = 6
  static ERROR_EMAIL_REQUIRED = 7
  static ERROR_INVALID_EMAIL = 8
  static SUCCESS_ACCOUNT_ADDED = 9
  static SUCCESS_ACCOUNT_UPDATED = 10
  static SUCCESS_SIGN_IN = 11
  static ERROR_NETWORK = 12
  static ERROR_INVALID_CREDENTIALS = 13
  static ERROR_UNABLE_TO_OBTAIN_BOOK_LIST = 14
  static ERROR_NO_FAVORITES = 15
  static ERROR_NO_CART = 16
  static SUCCESS_PURCHASE = 17
  static MESSAGE_ALREADY_PURCHASED = 18
  static SUCCESS_PASSWORD_RESET_REQUEST = 19
  static NO_CART = 20
  static NO_FAVORITES = 21
  static NO_PURCHASES = 22
  static SIGN_IN_TO_ADD_TO_FAVORITES_OR_CART = 23

  // eslint-disable-next-line camelcase
  static messages_en_US = [
    'A user name is required.',
    'Invalid user name. User name can contain only letters, numbers, hyphens, or underscores.',
    'Invalid user name. Must be at least 5 characters long.',
    'A password is required.',
    'Invalid password. Must be at least 5 characters long.',
    'Passwords do not match.',
    'Email required.',
    'Invalid email.',
    'Account created successfully. Welcome to U.S. Comics.',
    'Account updated successfully.',
    'Login successful.',
    'A network error occured.',
    'Invalid credentials.',
    'Unable to obtain the list of your books from the server.',
    "You don't have any favorites.",
    'Your cart is empty.',
    'Purchase successful.',
    'You purchased this item on {0}.',
    'Password reset link sent. Check your email.',
    'There\'s nothing in our cart. Get shopping!',
    'You don\'t have any favorites. Yet.',
    'It doesn\'t look like you\'ve bought anything yet. Cheapskate.',
    'Sign in to add this book to your favoites or cart.'
  ]

  static getMessage (inLanguage, inMessageId) {
    if (UserMessages.LANGUAGE.en_US === inLanguage) {
      if (0 >= inMessageId || UserMessages.messages_en_US.length < inMessageId) return null
      return UserMessages.messages_en_US[inMessageId - 1]
    }
    return null
  }
}
