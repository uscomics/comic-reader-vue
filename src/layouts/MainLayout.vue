// https://stackoverflow.com/questions/43990130/open-drawer-from-another-component-in-quasar-framework-vuejs
// https://forum.quasar-framework.org/topic/3416/hide-header-from-script/4
<template>
  <q-layout view="hHh lpR fFf">
    <q-header v-model="headerVisible" reveal elevated class="bg-primary text-white">
      <q-toolbar class="Toolbar">
        <div class="ToolbarTitle" @click="doHomeClicked">HERO/Web</div>
        <div class="ButtonRow">
          <IconButton icon="menu" :pressed="right" @icon-button-event="right = !right" />
          <IconButton v-if="showToonButtons" icon="save" :toggle="false" @icon-button-event="doSave" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer ref="rightDrawer" v-model="right" side="right" no-swipe-backdrop elevated>
      <Drawer />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import Drawer from '../components/Drawer'
import HTTP from '../util/http'
import IconButton from '../components/IconButton'
import Issue from '../data/issue'
import Messages from '../util/messages'
import Queue from '../util/queue'
import QueuedUserMessage from '../util/queued-user-message'
import { setThemeLight } from '../util/theme_utils'
import UserMessages from '../util/user-messages'
export default {
  components: { Drawer, IconButton },
  data () {
    return {
      right: false,
      headerVisible: true,
      showToonButtons: false
    }
  },
  created() {
    Queue.register(this, Messages.SHOW_HEADER, this.showHeader)
    Queue.register(this, Messages.HIDE_HEADER, this.hideHeader)
    Queue.register(this, Messages.SHOW_DRAWER, this.showDrawer)
    Queue.register(this, Messages.HIDE_DRAWER, this.hideDrawer)
    Queue.register(this, Messages.USER_MESSAGE, this.showMessage)
    Queue.register(this, Messages.USER_ERROR, this.showErrorMessage)
  },
  updated() {
    this.showToonButtons = this.$router.currentRoute.path.startsWith('/Toon')
  },
  async mounted() {
    this.monitorErrorMessages()
    this.$store.dispatch('builder/loadDatabase')
    setThemeLight()
    let url = this.$store.state.main.urlBase + 'comics'
    let storeBooks = await Issue.getFromServer(url)
    if (HTTP.hasErrors(storeBooks)) return
    let bookInfo = await Issue.getBooksFromServer(this.$store.state.main.urlBase + 'comics/', JSON.parse(storeBooks.body))
    Issue.sortBooks(bookInfo, Issue.SORT_BY_NAME)
    this.$store.commit('main/SET_BOOK_INFO', bookInfo)
    this.showDrawer()
  },
  computed: {
    getErrorMessage: function () {
      if (this.getErrorMessageCount === 0) {
        return ''
      }
      return this.$store.state.builder.errorMessages[0]
    },
    getErrorMessageCount: function () {
      return this.$store.state.builder.errorMessages.length
    },
    getHamburgerButtonClass: function () {
      if (this.right) {
        return 'MenuButtonPressed'
      }
      return 'MenuButton'
    }
  },
  methods: {
    doHomeClicked () {
      this.$router.push('/')
    },
    doSave () {
      Queue.broadcast(Messages.TOON_SAVE)
    },
    hideDrawer () {
      this.$refs.rightDrawer.hide()
    },
    hideHeader () {
      this.headerVisible = false
    },
    monitorErrorMessages: function () {
      const monitor = () => {
        if (this.getErrorMessageCount === 0) {
          return
        }
        this.showErrorMessage(this.$store.state.builder.errorMessages[0])
        this.$store.commit('builder/removeOldestErrorMessage')
      }
      setInterval(monitor, 500)
    },
    showAbout () {
      let msg = UserMessages.getMessage(UserMessages.LANGUAGE.en_US, UserMessages.TOOLS)
      let successMsg = new QueuedUserMessage(msg, UserMessages.SOUND_SUCCESS, 0, false)
      this.showMessage(successMsg)
    },
    showDrawer () {
      this.$refs.rightDrawer.show()
    },
    showErrorMessage (errorMessage) {
      if (!errorMessage) {
        return
      }
      this.$q.notify({
        type: 'negative',
        message: errorMessage
      })
    },
    showHeader () {
      this.headerVisible = true
    },
    showMessage (msg) {
      alert('showMessage' + msg)
      this.$q.notify({
        message: msg.message,
        color: 'primary',
        multiLine: true,
        position: 'top'
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../css/app.sass';

.Hidden {
  display: none;
}

.Toolbar {
  @include row;
  justify-content: space-between;
  font-family: var(--theme_font_family) !important;
  font-size: var(--theme_font_size_large) !important;
  background-image: var(--theme_background_image_menu_bar);
  box-shadow: var(--theme_box_shadow_small_active) !important;
}

.ToolbarTitle {
  @include rise;
  @include cursor-pointer;
  width: 100px;
  height: 35px;
  padding-top: 5px;
}

.ButtonRow {
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  width: 80px;
}

</style>
