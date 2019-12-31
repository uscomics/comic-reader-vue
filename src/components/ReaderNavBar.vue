// https://material.io/resources/icons/?style=baseline
<template>
<div class="column">
  <div class="reader-nav-bar-control column justify-between items-center content-center">
    <div class="reader-nav-bar">
      <div>
        <q-btn class="nav-button" rounded color="white" text-color="black" icon="first_page" :disable=!firstEnabled v-on:click="firstPage"/>
        <q-btn class="nav-button" rounded color="white" text-color="black" icon="chevron_left" :disable=!previousEnabled v-on:click="previousPage"/>
      </div>
      <div>
        <div class="row">
          <q-btn class="nav-button" rounded color="white" text-color="black" icon="arrow_upward" v-on:click="home"/>
          <q-btn v-if="2==$store.state.main.readerState" class="nav-button" rounded color="white" v-bind:text-color="favoritesColor" icon="favorite" :disable=favoritesDisabled v-on:click="toggleFavorite"/>
          <q-btn v-if="2==$store.state.main.readerState" class="nav-button" rounded color="white" v-bind:text-color="cartColor" icon="shopping_cart" :disable=cartDisabled v-on:click="toggleCart"/>
        </div>
      </div>
      <div>
        <q-btn class="nav-button" rounded color="white" text-color="black" icon="chevron_right" :disable=!nextEnabled v-on:click="nextPage"/>
        <q-btn class="nav-button" rounded color="white" text-color="black" icon="last_page" :disable=!lastEnabled v-on:click="lastPage"/>
      </div>
    </div>
  </div>
  <!-- <q-linear-progress :value="progress" size="lg"/> -->
</div>
</template>
<script>
import Issue from '../data/issue'
import Messages from '../util/messages'
import Queue from '../util/queue'
export default {
  name: 'ReaderNavBar',
  data: function () {
    return {
      firstEnabled: false,
      previousEnabled: false,
      nextEnabled: true,
      lastEnabled: true,
      progress: 50
    }
  },
  mounted () {
    Queue.register(this, Messages.READER_NAV_BAR_ENABLE_FIRST, this.enableFirst)
    Queue.register(this, Messages.READER_NAV_BAR_ENABLE_PREVIOUS, this.enablePrevious)
    Queue.register(this, Messages.READER_NAV_BAR_ENABLE_NEXT, this.enableNext)
    Queue.register(this, Messages.READER_NAV_BAR_ENABLE_LAST, this.enableLast)
    Queue.register(this, Messages.READER_NAV_BAR_PROGRESS, this.setProgress)
  },
  computed: {
    cartColor() {
      if (this.inCart) return 'red'
      return 'black'
    },
    cartDisabled() {
      if (!this.$store.state.main.account || !this.$store.state.main.account.username) return true
      return false
    },
    favoritesColor() {
      if (this.isFavorite) return 'red'
      return 'black'
    },
    favoritesDisabled() {
      if (!this.$store.state.main.account || !this.$store.state.main.account.username) return true
      return false
    },
    inCart () {
      let currentBook = this.$store.state.main.currentBook
      return Issue.hasBook(this.$store.state.main.cart, currentBook.id, currentBook.issue)
    },
    isFavorite () {
      let currentBook = this.$store.state.main.currentBook
      return Issue.hasBook(this.$store.state.main.favorites, currentBook.id, currentBook.issue)
    }
  },
  methods: {
    firstPage (event) {
      Queue.broadcast(Messages.READER_NAV_BAR_FIRST_PAGE)
    },
    previousPage (event) {
      Queue.broadcast(Messages.READER_NAV_BAR_PREVIOUS_PAGE)
    },
    home (event) {
      Queue.broadcast(Messages.READER_NAV_BAR_HOME)
    },
    nextPage (event) {
      Queue.broadcast(Messages.READER_NAV_BAR_NEXT_PAGE)
    },
    lastPage (event) {
      Queue.broadcast(Messages.READER_NAV_BAR_LAST_PAGE)
    },
    enableFirst (enabled) {
      this.firstEnabled = enabled
    },
    enablePrevious (enabled) {
      this.previousEnabled = enabled
    },
    enableNext (enabled) {
      this.nextEnabled = enabled
    },
    enableLast (enabled) {
      this.lastEnabled = enabled
    },
    toggleCart () {
      if (Issue.hasBook(this.$store.state.main.cart, this.$store.state.main.currentBook.id, this.$store.state.main.currentBook.issue)) {
        Queue.broadcast(Messages.READER_NAV_BAR_REMOVE_FROM_CART)
      } else {
        Queue.broadcast(Messages.READER_NAV_BAR_ADD_TO_CART)
      }
    },
    toggleFavorite () {
      if (Issue.hasBook(this.$store.state.main.favorites, this.$store.state.main.currentBook.id, this.$store.state.main.currentBook.issue)) {
        Queue.broadcast(Messages.READER_NAV_BAR_REMOVE_FROM_FAVORITES)
      } else {
        Queue.broadcast(Messages.READER_NAV_BAR_ADD_TO_FAVORITES)
      }
    },
    setProgress (progress) {
      this.progress = progress
    }
  }
}
</script>
<style scoped>
.reader-nav-bar-control {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.reader-nav-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding-left: 3px;
  padding-right: 3px;
}
.rotate-180 {
  transform: rotate(180deg);
}
.progress-background {
  position: absolute;
  height: 30px;
  width: 100%;
  background-color: lightgrey;
}
.nav-button {
  width: 50px;
  height: 50px;
  font-size: medium;
}
@media only screen and (max-width: 450px) {
.nav-button {
  width: 30px;
  height: 30px;
  font-size: small;
}
}
</style>
