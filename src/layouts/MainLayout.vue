// https://stackoverflow.com/questions/43990130/open-drawer-from-another-component-in-quasar-framework-vuejs
// https://forum.quasar-framework.org/topic/3416/hide-header-from-script/4
<template>
  <q-layout view="hHh lpR fFf">

    <q-header v-model="headerVisible" reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar >
            <img src='../assets/USComicsLogo.png' v-on:click="showAbout">
          </q-avatar>
        </q-toolbar-title>

        <q-btn dense flat round icon="person" @click="right = !right" />
      </q-toolbar>
    </q-header>

    <q-drawer ref="rightDrawer" v-model="right" side="right" no-swipe-backdrop elevated>
      <ResetPassword v-if="$store.state.main.userPanelState === stateResetPassword"/>
      <SignIn v-else-if="$store.state.main.userPanelState === stateSignIn"/>
      <SignUp v-else-if="$store.state.main.userPanelState === stateSignUp"/>
      <UserPanel v-else-if="$store.state.main.userPanelState === stateUser"/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import HTTP from '../util/http'
import Issue from '../data/issue'
import Messages from '../util/messages'
import Queue from '../util/queue'
import QueuedUserMessage from '../util/queued-user-message'
import ResetPassword from '../components/ResetPassword'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import UserPanel from '../components/UserPanel'
import UserState from '../util/user-state'
import UserMessages from '../util/user-messages'
export default {
  components: {
    ResetPassword,
    SignIn,
    SignUp,
    UserPanel
  },
  data () {
    return {
      right: false,
      headerVisible: true
    }
  },
  created() {
    Queue.register(this, Messages.SHOW_HEADER, this.showHeader)
    Queue.register(this, Messages.HIDE_HEADER, this.hideHeader)
    Queue.register(this, Messages.SHOW_DRAWER, this.showDrawer)
    Queue.register(this, Messages.HIDE_DRAWER, this.hideDrawer)
    Queue.register(this, Messages.USER_MESSAGE, this.showMessage)
    Queue.register(this, Messages.USER_ERROR, this.showError)
  },
  async mounted() {
    let url = this.$store.state.main.urlBase + 'comics'
    let storeBooks = await Issue.getFromServer(url)
    if (HTTP.hasErrors(storeBooks)) return
    let bookInfo = await Issue.getBooksFromServer(this.$store.state.main.urlBase + 'comics/', JSON.parse(storeBooks.body))
    Issue.sortBooks(bookInfo, Issue.SORT_BY_NAME)
    this.$store.commit('main/SET_BOOK_INFO', bookInfo)
    this.showDrawer()
  },
  computed: {
    stateResetPassword () {
      return UserState.RESET_PASSWORD
    },
    stateSignIn () {
      return UserState.SIGN_IN
    },
    stateSignUp () {
      return UserState.SIGN_UP
    },
    stateUser () {
      return UserState.USER
    }
  },
  methods: {
    showHeader () {
      this.headerVisible = true
    },
    hideHeader () {
      this.headerVisible = false
    },
    showDrawer () {
      this.$refs.rightDrawer.show()
    },
    hideDrawer () {
      this.$refs.rightDrawer.hide()
    },
    showAbout () {
      let msg = UserMessages.getMessage(UserMessages.LANGUAGE.en_US, UserMessages.TOOLS)
      let successMsg = new QueuedUserMessage(msg, UserMessages.SOUND_SUCCESS, 0, false)
      this.showMessage(successMsg)
    },
    showMessage (msg) {
      this.$q.notify({
        message: msg.message,
        color: 'primary',
        multiLine: true,
        avatar: this.$store.state.main.urlBase + 'logo',
        position: 'top'
      })
    },
    showError (msg) {
      this.$q.notify({
        message: msg.message,
        color: 'red',
        multiLine: true,
        avatar: this.$store.state.main.urlBase + 'logo',
        position: 'top'
      })
    }
  }
}
</script>
<style>
</style>
