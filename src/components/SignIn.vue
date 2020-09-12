<template>
<div class="SignInWrapper">
  <div class="SignInColumn SignInTop">
    <!-- Image -->
    <!-- <img class="SignInLogo q-mb-md" src='../assets/USComicsLogo.png'/> -->
    <!-- Form -->
    <form class="SignInColumn">
      <!-- UserName -->
      <!-- Password -->
      <div class="SignInRow">
        <div class="SignInColumn">
          <TextInput
            class="SignInText"
            :dense="true"
            :hidebottomspace="true"
            id="username"
            label="User Name"
            v-model="username"
          />
          <TextInput
            class="SignInText"
            :dense="true"
            :hidebottomspace="true"
            id="password"
            label="Password"
            type="password"
            v-model="password"
          />
        </div>
      </div>
      <!-- Remember Me -->
      <div class="SignInRememberMeRow">
        <q-checkbox color="white-1" id="rememberMe" v-model="rememberMe" />
        <label class="SignInRememberMe" for="rememberMe">Remember Me</label>
      </div>
      <Button type="submit" class="q-mt-md" label="Sign In" @button-event="signIn"/>
    </form>
    <!-- Don't Have An Account? -->
    <br/>
    <label>Don't Have An Account?</label>
    <!-- Sign Up -->
    <Link class="SignInLink" text="Sign Up" @link-event="signUp" />
    <!-- Forgot Your Password? -->
    <br/>
    <label>Forgot Your Password?</label>
    <!-- Reset Password -->
    <Link class="SignInLink" text="Reset Password" @link-event="resetPassword" />
  </div>
</div>
</template>
<script>
import Account from '../data/account'
import Button from '../components/Button.vue'
import HTTP from '../util/http'
import Link from '../components/Link.vue'
import Messages from '../util/messages'
import Queue from '../util/queue'
import QueuedUserMessage from '../util/queued-user-message'
import TextInput from '../components/TextInput.vue'
import UserMessages from '../util/user-messages'
import UserState from '../util/user-state'
export default {
  name: 'SignIn',
  components: { Button, Link, TextInput },
  data: function() {
    return {
      username: '',
      password: '',
      rememberMe: false
    }
  },
  created () {
    this.remember()
    Queue.register(this, Messages.USER_SIGNED_IN, this.getUserInfo)
    Queue.register(this, Messages.USER_SIGNED_IN, this.getUserCart)
    Queue.register(this, Messages.USER_SIGNED_IN, this.getUserFavorites)
    Queue.register(this, Messages.USER_SIGNED_IN, this.getUserPurchases)
  },
  methods: {
    async remember () {
      /*
      let url = this.$store.state.main.urlBase + 'remember/data'
      let response = await HTTP.postToServer(url, new FormData())
      if (200 === response.status) {
        this.username = JSON.parse(response.body).user
        this.rememberMe = true
      }
      */
    },
    async signIn () {
      let url = this.$store.state.main.urlBase + 'user/authenticate'
      let account = new Account(this.username, this.password, null, null, null, this.rememberMe, null)
      let result = await account.signInToServer(url)
      if (HTTP.hasErrors(result)) {
        this.$store.commit('main/SIGN_OUT')
        this.$store.commit('main/SET_USER_PANEL_STATE', UserState.SIGN_IN)
        return
      }
      let msg = UserMessages.getMessage(UserMessages.LANGUAGE.en_US, UserMessages.SUCCESS_SIGN_IN)
      let successMsg = new QueuedUserMessage(msg, UserMessages.SOUND_SUCCESS, 0, false)
      Queue.broadcast(Messages.USER_MESSAGE, successMsg)
      Queue.broadcast(Messages.USER_SIGNED_IN, { username: this.username })
      this.$store.commit('main/SET_USER_PANEL_STATE', UserState.USER)
    },
    signUp () {
      this.$store.commit('main/SET_USER_PANEL_STATE', UserState.SIGN_UP)
    },
    resetPassword () {
      this.$store.commit('main/SET_USER_PANEL_STATE', UserState.RESET_PASSWORD)
    },
    async getUserInfo (user) {
      let url = this.$store.state.main.urlBase + 'user/' + this.username + '/info'
      let result = await Account.getUserInfoFromServer(url)
      if (HTTP.hasErrors(result)) return
      this.$store.commit('main/SET_ACCOUNT', JSON.parse(result.body))
    },
    async getUserCart (user) {
      let url = this.$store.state.main.urlBase + 'cart/' + this.username
      let result = await Account.getUserCartFromServer(url)
      if (HTTP.hasErrors(result)) return
      this.$store.commit('main/SET_CART', JSON.parse(result.body))
    },
    async getUserFavorites (user) {
      let url = this.$store.state.main.urlBase + 'favorites/' + this.username
      let result = await Account.getUserFavoritesFromServer(url)
      if (HTTP.hasErrors(result)) return
      this.$store.commit('main/SET_FAVORITES', JSON.parse(result.body))
    },
    async getUserPurchases (user) {
      let url = this.$store.state.main.urlBase + 'comics/' + this.username
      let result = await Account.getUserPurchasesFromServer(url)
      if (HTTP.hasErrors(result)) return
      this.$store.commit('main/SET_PURCHASED', JSON.parse(result.body))
    }
  }
}
</script>
<style scoped lang="scss">
@import '../css/app.sass';

.SignInWrapper {
  @include column;
  justify-content: flex-center;
  align-items: center;
}

.SignInTop {
  position: absolute;
  top: 50px;
  bottom: 0px;
  width: 100%;
  color: var(--theme_text_color_label) !important;
  background-color: var(--theme_background_color) !important;
}

.SignInColumn {
  @include column;
  justify-content: flex-center;
  align-items: center;
}

.SignInRow {
  @include row;
  justify-content: space-between;
  align-items: center;
  width:100%;
  min-width: 100%;
  max-width: 100%;
}

.SignInRow:before {
  box-sizing: content-box;
}

.SignInRow:after {
  box-sizing: content-box;
}

.SignInRememberMeRow {
  @include rise;
  @include row;
  justify-content: center;
  align-items: center;
  width:100%;
  min-width: 100%;
  max-width: 100%;
}

.SignInLogo {
  width: 50px;
  height: 50px;
}

.SignInRememberMe {
  color: var(--theme_text_color_label) !important;
  background-color: var(--theme_background_color) !important;
}

.SignInText {
    width: 100%;
    height: 40px;
    margin-top: 5px;
    margin-bottom: 3px;
}

.SignInLink {
    width: 75%;
    height: 25px;
    margin-top: 5px;
    margin-bottom: 3px;
}
</style>
