<template>
  <div class="q-pa-md UserPanel">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-tabs
        v-model="tab"
        class=""
      >
        <q-tab v-if="showFullPanel" class="Tabs" name="stuff" icon="menu_book" label="Stuff" />
        <q-tab class="Tabs" name="you" icon="face" label="You" />
        <q-tab class="Tabs" name="favs" icon="favorite" label="Favs" />
        <q-tab v-if="showFullPanel" class="Tabs" name="cart" icon="shopping_cart" label="Cart" />
      </q-tabs>
      <q-tab-panels class="Theme" v-model="tab" animated>
        <q-tab-panel v-if="showFullPanel" name="stuff">
          <ItemList
            style="height:100%;"
            v-bind:bookList="$store.state.main.purchased"
            v-bind:emptyMessage="emptyPurchasedMessage"
            v-bind:clickedMessage="clickedPurchasedMessage"
            v-bind:readerState="1"
            v-bind:showPrice="false"
            v-bind:listHeight="430"
            />
        </q-tab-panel>

        <q-tab-panel name="you">
          <div class="row justify-center">
            <label class="TextBody1 SignOutLink q-mb-lg" v-on:click="signOut">Sign Out</label>
          </div>
          <q-separator style="height: 5px;"/>
          <UpdateAccount/>
        </q-tab-panel>

        <q-tab-panel name="favs">
          <ItemList
            style="height:100%;"
            v-bind:bookList="$store.state.main.favorites"
            v-bind:emptyMessage="emptyFavoritesMessage"
            v-bind:clickedMessage="clickedFavoritesMessage"
            v-bind:readerState="2"
            v-bind:showPrice="true"
            v-bind:listHeight="430"
           />
        </q-tab-panel>

        <q-tab-panel v-if="showFullPanel" name="cart">
          <ItemList
            style="height:100%;"
            v-bind:bookList="$store.state.main.cart"
            v-bind:emptyMessage="emptyCartMessage"
            v-bind:clickedMessage="clickedCartMessage"
            v-bind:readerState="2"
            v-bind:showPrice="true"
            v-bind:listHeight="275"
            />
          <div class="CartPricePanel q-mb-md">
            <div class="CartPriceRow">
              <div>Subtotal:</div>
              <div>${{getSubtotal()}}</div>
            </div>
            <div class="CartPriceRow">
              <div>Discount:</div>
              <div>${{getSubtotal()}}</div>
            </div>
            <div class="CartPriceRow">
              <div>Total:</div>
              <div>$0.00</div>
            </div>
          </div>
          <div class="row justify-center">
            <q-btn class="PurchaseSubmit" label="Purchase" v-on:click="purchase"/>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>
<script>
import HTTP from '../util/http'
import ItemList from './ItemList'
import Messages from '../util/messages'
import Queue from '../util/queue'
import QueuedUserMessage from '../util/queued-user-message'
import UpdateAccount from './UpdateAccount'
import UserCart from '../data/user-cart'
import UserMessages from '../util/user-messages'
import UserState from '../util/user-state'
export default {
  name: 'UserPanel',
  components: {
    ItemList,
    UpdateAccount
  },
  props: {
    showFullPanel: { type: Boolean, default: true }
  },
  data () {
    return {
      tab: this.showFullPanel ? 'stuff' : 'you',
      subtotal: 0
    }
  },
  mounted () {
    Queue.register(this, Messages.CART_BOOK_REMOVED, this.doCartBookRemoved)
    Queue.register(this, Messages.FAVORITES_BOOK_SELECTED, this.doFavoritesBookSelected)
    Queue.register(this, Messages.PURCHASED_BOOK_SELECTED, this.doPurchasedBookSelected)
    this.subtotal = this.getSubtotal
  },
  computed: {
    clickedCartMessage() {
      return Messages.CART_BOOK_REMOVED
    },
    clickedFavoritesMessage() {
      return Messages.FAVORITES_BOOK_SELECTED
    },
    clickedPurchasedMessage() {
      return Messages.PURCHASED_BOOK_SELECTED
    },
    emptyCartMessage() {
      return UserMessages.getMessage(UserMessages.LANGUAGE.en_US, UserMessages.NO_CART)
    },
    emptyFavoritesMessage() {
      return UserMessages.getMessage(UserMessages.LANGUAGE.en_US, UserMessages.NO_FAVORITES)
    },
    emptyPurchasedMessage() {
      return UserMessages.getMessage(UserMessages.LANGUAGE.en_US, UserMessages.NO_PURCHASES)
    }
  },
  methods: {
    doCartBookRemoved(book) {
    },
    doFavoritesBookSelected(book) {
      let pages = [ book.pages[0] ]
      pages = pages.concat(book.preview)
      pages = pages.concat('EndofPreview.jpg')
      let preview = { id: book.id, issue: book.issue, pages: pages }
      this.$store.commit('main/SET_CURRENT_BOOK', preview)
      if (this.$route.path !== '/reader') this.$router.push({ path: '/reader' }).catch(() => {})
    },
    doPurchasedBookSelected(book) {
      this.$store.commit('main/SET_CURRENT_BOOK', book)
      if (this.$route.path !== '/reader') this.$router.push({ path: '/reader' }).catch(() => {})
    },
    getSubtotal () {
      let subtotal = 0
      let cart = this.$store.state.main.cart
      let bookInfo = this.$store.state.main.bookInfo
      if (!cart || !bookInfo) return 0
      for (let i = 0; i < cart.length; i++) {
        let cartBook = cart[i]
        for (let j = 0; j < bookInfo.length; j++) {
          let book = bookInfo[j]
          if (cartBook.id !== book.id || cartBook.issue !== book.issue) continue
          subtotal += parseFloat(book.price)
        }
      }
      subtotal = subtotal.toFixed(2)
      return subtotal
    },
    async purchase () {
      let url = this.$store.getters.urlBase + 'user/checkout/data'
      let result = await UserCart.postPurchaseToServer(url, this.$store.state.main.username, JSON.stringify(this.$store.state.main.cart))
      if (HTTP.hasErrors(result)) return
      let msg = UserMessages.getMessage(UserMessages.LANGUAGE.en_US, UserMessages.SUCCESS_PURCHASE)
      let successMsg = new QueuedUserMessage(msg, UserMessages.SOUND_SUCCESS, 0, false)
      Queue.broadcast(Messages.USER_MESSAGE, successMsg)
    },
    async signOut () {
      this.$store.commit('main/SIGN_OUT')
      this.$store.commit('main/SET_USER_PANEL_STATE', UserState.SIGN_IN)
    }
  }
}
</script>
<style>
.Theme {
  color: var(--theme_text_color_label) !important;
  background-color: var(--theme_background_color) !important;
}
.UserPanel {
  position: absolute;
  top: 50px;
  bottom: 0px;
  color: var(--theme_text_color_label) !important;
  background-color: var(--theme_background_color) !important;
}
.Tabs {
  font-size: .7rem;
  padding: 4px;
  color: var(--theme_text_color_label) !important;
  background-color: var(--theme_background_color) !important;
}
.CartPricePanel {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 5px;
}
.CartPriceRow {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
}
.PurchaseSubmit {
  color: var(--theme_background_color) !important;
  background-color: var(--theme_text_color_label) !important;
}
.SignOutLink {
  text-decoration: underline;
  cursor: pointer;
}
</style>
