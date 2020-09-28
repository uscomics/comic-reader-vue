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
            @text-input-changed-event="setUsername"
            v-model="username"
          />
          <TextInput
            class="SignInText"
            :dense="true"
            :hidebottomspace="true"
            id="password"
            label="Password"
            type="password"
            @text-input-changed-event="setPassword"
            v-model="password"
          />
        </div>
      </div>
      <!-- Remember Me -->
      <div class="SignInRememberMeRow">
        <q-checkbox color="white-1" id="rememberMe" v-model="rememberMe" />
        <Label for="rememberMe" text="Remember Me" size="medium" color="default" />
      </div>
      <Button type="submit" class="q-mt-md" label="Sign In" @button-event="signIn"/>
    </form>
    <!-- Don't Have An Account? -->
    <br/>
    <Label text="Don't Have An Account?" size="medium" color="default" />
    <!-- Sign Up -->
    <Link class="SignInLink" text="Sign Up" @link-event="signUp" />
    <!-- Forgot Your Password? -->
    <br/>
    <Label text="Forgot Your Password?" size="medium" color="default" />
    <!-- Reset Password -->
    <Link class="SignInLink" text="Reset Password" @link-event="resetPassword" />
  </div>
</div>
</template>
<script>
import Account from '../data/account'
import Button from '../components/Button.vue'
import HTTP from '../util/http'
import Label from '../components/Label.vue'
import Link from '../components/Link.vue'
import Messages from '../util/messages'
import Queue from '../util/queue'
import QueuedUserMessage from '../util/queued-user-message'
import TextInput from '../components/TextInput.vue'
import UserMessages from '../util/user-messages'
import UserState from '../util/user-state'
export default {
  name: 'SignIn',
  components: { Button, Label, Link, TextInput },
  data: function() {
    return {
      username: '',
      password: '',
      rememberMe: false
    }
  },
  created () {
    this.remember()
    Queue.unregister('SignIn', Messages.USER_SIGNED_IN)
    Queue.unregister('SignIn', Messages.USER_SIGNED_IN)
    Queue.unregister('SignIn', Messages.USER_SIGNED_IN)
    Queue.unregister('SignIn', Messages.USER_SIGNED_IN)
    Queue.register('SignIn', Messages.USER_SIGNED_IN, this.getUserCart)
    Queue.register('SignIn', Messages.USER_SIGNED_IN, this.getUserFavorites)
    Queue.register('SignIn', Messages.USER_SIGNED_IN, this.getUserPurchases)
  },
  methods: {
    async getUserCart (message) {
      let url = this.$store.state.main.urlBase + 'cart/' + message.username
      let result = await Account.getUserCartFromServer(url)
      if (HTTP.hasErrors(result)) return
      this.$store.commit('main/SET_CART', JSON.parse(result.body))
    },
    async getUserFavorites (message) {
      let url = this.$store.state.main.urlBase + 'favorites/' + message.username
      let result = await Account.getUserFavoritesFromServer(url)
      if (HTTP.hasErrors(result)) return
      this.$store.commit('main/SET_FAVORITES', JSON.parse(result.body))
    },
    async getUserInfo (username) {
      let url = this.$store.state.main.urlBase + 'user/' + username + '/info'
      let result = await Account.getUserInfoFromServer(url)
      if (HTTP.hasErrors(result)) return
      console.log(JSON.stringify(result.body))
      this.$store.commit('main/SET_ACCOUNT', JSON.parse(result.body))
    },
    async getUserPurchases (message) {
      let url = this.$store.state.main.urlBase + 'comics/' + message.username
      let result = await Account.getUserPurchasesFromServer(url)
      if (HTTP.hasErrors(result)) return
      this.$store.commit('main/SET_PURCHASED', JSON.parse(result.body))
    },
    async remember () {
      let url = this.$store.state.main.urlBase + 'remember/data'
      let response = await HTTP.postToServer(url, new FormData())
      if (200 === response.status) {
        this.username = JSON.parse(response.body).user
        this.rememberMe = true
      }
    },
    setPassword (text) {
      this.password = text
    },
    setUsername (text) {
      this.username = text
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
      await this.getUserInfo(this.username)
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
