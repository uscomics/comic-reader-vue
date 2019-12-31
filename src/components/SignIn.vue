<template>
<div class="sign-in-wrapper">
  <div class="sign-in-column sign-in-top">
    <!-- Image -->
    <img class="sign-in-logo q-mb-md" src='../assets/USComicsLogo.png'/>
    <!-- Form -->
    <form class="sign-in-column">
      <!-- UserName -->
      <!-- Password -->
      <div class="sign-in-row">
        <div class="sign-in-column">
          <q-input id="username" v-model="username" label="User Name" />
          <q-input id="password" v-model="password" type="password" label="Password" />
        </div>
      </div>
      <!-- Remember Me -->
      <div class="sign-in-row-2">
        <q-checkbox id="rememberMe" v-model="rememberMe" />
        <label for="rememberMe">Remember Me</label>
      </div>
      <q-btn type="submit" color="white" text-color="black" class="q-mt-md" label="Sign In" v-on:click="signIn"/>
    </form>
    <!-- Don't Have An Account? -->
    <br/>
    <label>Don't Have An Account?</label>
    <!-- Sign Up -->
    <label class="stext-body1 ign-in-link" v-on:click="signUp">Sign Up</label>
    <!-- Forgot Your Password? -->
    <br/>
    <label>Forgot Your Password?</label>
    <!-- Reset Password -->
    <label class="text-body1 sign-in-link" v-on:click="resetPassword">Reset Password</label>
  </div>
</div>
</template>
<script>
import Account from '../data/account'
import HTTP from '../util/http'
import Messages from '../util/messages'
import Queue from '../util/queue'
import QueuedUserMessage from '../util/queued-user-message'
import UserMessages from '../util/user-messages'
import UserState from '../util/user-state'
export default {
  name: 'SignIn',
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
      let url = this.$store.state.main.urlBase + 'remember/data'
      let response = await HTTP.postToServer(url, new FormData())
      if (200 === response.status) {
        this.username = JSON.parse(response.body).user
        this.rememberMe = true
      }
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
<style scoped>
.sign-in-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
  align-items: center;
}
.sign-in-top {
  position: absolute;
  top: 60px;
  width: 96%;
}
.sign-in-column {
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
  align-items: center;
}
.sign-in-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width:100%;
  min-width: 100%;
  max-width: 100%;
}
.sign-in-row-2 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width:100%;
  min-width: 100%;
  max-width: 100%;
}
.sign-in-row:before {
  box-sizing: content-box;
}
.sign-in-row:after {
  box-sizing: content-box;
}
.sign-in-logo {
  width: 50px;
  height: 50px;
}
.sign-in-link {
  text-decoration: underline;
  cursor: pointer;
}
</style>
