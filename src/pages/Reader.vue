// https://stackoverflow.com/questions/46051951/css-aspect-ratio-with-maximum-height
// https://pagekit-forum.org/forum/thread/123-how-to-bind-the-src-in-an-img/
// https://stackoverflow.com/questions/44700257/hide-a-component-in-vue-js
// https://dev.to/samolabams/understanding-vuejs-lifecycle-hooks-5ejk
// https://www.flaticon.com/
<template>
  <q-page class="flex flex-center">
    <canvas id="page-canvas" class="page" width="1275" height="1650"/>
    <ReaderNavBar v-if="navBarVisible" class="reader-nav-bar"/>
  </q-page>
</template>
<script>
import Messages from '../util/messages'
import Queue from '../util/queue'
import QueuedUserMessage from '../util/queued-user-message'
import ReaderNavBar from '../components/ReaderNavBar'
import UserMessages from '../util/user-messages'
import UserState from '../util/user-state'
export default {
  name: 'Reader',
  components: {
    ReaderNavBar
  },
  data: function () {
    return {
      currentPage: 0,
      navBarTime: new Date().getTime(),
      navBarVisible: true,
      canvas: null,
      intervalId: null
    }
  },
  mounted () {
    if (!this.$store.state.main.currentBook) {
      this.$store.commit('main/SIGN_OUT')
      this.$store.commit('main/SET_USER_PANEL_STATE', UserState.SIGN_IN)
      if (this.$route.path !== '/index') this.$router.push({ path: '/index' }).catch(() => {})
      return
    }
    Queue.broadcast(Messages.HIDE_HEADER)
    Queue.register(this, Messages.READER_NAV_BAR_FIRST_PAGE, this.firstPage)
    Queue.register(this, Messages.READER_NAV_BAR_PREVIOUS_PAGE, this.previousPage)
    Queue.register(this, Messages.READER_NAV_BAR_HOME, this.home)
    Queue.register(this, Messages.READER_NAV_BAR_NEXT_PAGE, this.nextPage)
    Queue.register(this, Messages.READER_NAV_BAR_LAST_PAGE, this.lastPage)
    window.addEventListener('mousemove', this.updateNavBarTime)
    this.intervalId = setInterval(() => { this.updateNavBarVisible() }, 300)
    this.updateNavBarButtons()
    this.canvas = document.getElementById('page-canvas')
    this.loadPage()
    if (!this.$store.state.main.account) {
      let msg = UserMessages.getMessage(UserMessages.LANGUAGE.en_US, UserMessages.SIGN_IN_TO_ADD_TO_FAVORITES_OR_CART)
      let successMsg = new QueuedUserMessage(msg, UserMessages.NONE, 0, false)
      Queue.broadcast(Messages.USER_MESSAGE, successMsg)
    }
  },
  methods: {
    firstPage (event) {
      this.currentPage = 0
      this.updateNavBarTime()
      this.updateNavBarButtons()
      this.updateNavBaProgress()
      this.loadPage()
    },
    previousPage (event) {
      this.currentPage--
      this.updateNavBarTime()
      this.updateNavBarButtons()
      this.updateNavBaProgress()
      this.loadPage()
    },
    home (event) {
      clearInterval(this.intervalId)
      if (this.$route.path !== 'index') this.$router.push({ path: 'index' }).catch(() => {})
    },
    nextPage (event) {
      this.currentPage++
      this.updateNavBarTime()
      this.updateNavBarButtons()
      this.updateNavBaProgress()
      this.loadPage()
    },
    lastPage (event) {
      this.currentPage = this.$store.state.main.currentBook.pages.length - 1
      this.updateNavBarTime()
      this.updateNavBarButtons()
      this.updateNavBaProgress()
      this.loadPage()
    },
    updateNavBarTime () {
      this.navBarTime = new Date().getTime()
    },
    updateNavBarVisible () {
      this.navBarVisible = new Date().getTime() - this.navBarTime < 5000
      if (this.navBarVisible) {
        this.updateNavBarButtons()
        this.updateNavBaProgress()
      }
    },
    updateNavBarButtons () {
      let pageCount = this.$store.state.main.currentBook.pages.length
      Queue.broadcast(Messages.READER_NAV_BAR_ENABLE_FIRST, (0 !== this.currentPage))
      Queue.broadcast(Messages.READER_NAV_BAR_ENABLE_PREVIOUS, (0 !== this.currentPage))
      Queue.broadcast(Messages.READER_NAV_BAR_ENABLE_NEXT, (this.currentPage < pageCount - 1))
      Queue.broadcast(Messages.READER_NAV_BAR_ENABLE_LAST, (this.currentPage < pageCount - 1))
    },
    updateNavBaProgress () {
      let progress = ((this.currentPage + 1) / this.$store.state.main.currentBook.pages.length) * 100
      Queue.broadcast(Messages.READER_NAV_BAR_PROGRESS, progress)
    },
    url () {
      let url = this.$store.state.main.urlBase + 'comics/' + this.$store.state.main.currentBook.id + '/' + this.$store.state.main.currentBook.issue + '/'
      url += this.$store.state.main.currentBook.pages[this.currentPage]
      return url
    },
    loadPage () {
      let context = this.canvas.getContext('2d')
      let img = new Image()
      img.onload = function () {
        context.drawImage(img, 0, 0)
      }
      img.src = this.url()
    }
  }
}
</script>
<style scoped>
.page-wrapper {
  width: 100%;
  height: 99%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.page {
  height: 98%;
  width: 77vh;
  margin: 1%;
}
.reader-nav-bar {
  height: 60px;
  position: fixed;
  bottom:3%;
  width:100%;
  background-color: #073D6D;
  opacity: 0.9;
}
@media only screen and (max-width: 420px) {
  .page {
  height: 120vw;
  width: 98%;
  margin: 1%;
}
}
</style>
