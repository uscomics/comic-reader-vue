<template>
<div class="sign-up-column">
  <div class="sign-up-column sign-up-top">
    <!-- Image -->
    <!-- <img class="sign-up-logo q-mb-md" src='../assets/USComicsLogo.png'/> -->
    <!-- Form -->
    <form class="sign-up-column">
      <!--     UserName     Password -->
      <!--     First Name   Reenter Password -->
      <!--     Last Name    Email -->
      <div class="sign-up-row">
        <div class="sign-up-column sign-up-half-width">
          <q-input id="username" v-on:focus="setHelpText('Minimum 5 characters. Letter, number, dash, or underscore.')" v-model="username" label="User Name" />
          <q-input id="firstName" v-on:focus="setHelpText('Optional.')" v-model="firstName" label="First Name" />
          <q-input id="lastName" v-on:focus="setHelpText('Optional.')" v-model="lastName" label="Last Name" />
        </div>
        <div class="sign-up-column sign-up-half-width">
          <q-input id="password" v-on:focus="setHelpText('Minimum 5 characters.')" v-model="password" type="password" label="Password" />
          <q-input id="reenterPassword" v-on:focus="setHelpText('Minimum 5 characters.')" v-model="reenterPassword" type="password" label="Renter Password" />
          <q-input id="email" v-on:focus="setHelpText('Used for password reset.')" v-on:blur="setHelpText('')" v-model="email" label="Email" />
        </div>
      </div>
      {{helpText}}
      <br/>
      <!-- Remember Me -->
      <div class="sign-up-row-2">
        <q-checkbox id="rememberMe" v-model="rememberMe" />
        <label class="text-body1" for="rememberMe">Remember Me</label>
      </div>
      <q-btn type="submit" color="white" text-color="black" class="q-mt-md" label="Sign Up" v-on:click="signUp"/>
    </form>
    <!-- Already Have An Account? -->
    <br/>
    <label class="text-body1">Already Have An Account?</label>
    <!-- Sign In -->
    <label class="text-body1 sign-up-link" v-on:click="signIn">Sign In</label>
    <!-- Forgot Your Password? -->
    <br/>
    <label class="text-body1">Forgot Your Password?</label>
    <!-- Reset Password -->
    <label class="text-body1 sign-up-link" v-on:click="resetPassword">Reset Password</label>
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
  name: 'SignUp',
  data: function() {
    return {
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      reenterPassword: '',
      email: '',
      rememberMe: false,
      helpText: ''
    }
  },
  methods: {
    setHelpText (text) {
      this.helpText = text
    },
    async signUp () {
      let err = this.validate()
      if (err) {
        let msg = UserMessages.getMessage(UserMessages.LANGUAGE.en_US, err)
        let errorMsg = new QueuedUserMessage(msg, UserMessages.SOUND_ERROR, 0, false)
        Queue.broadcast(Messages.USER_ERROR, errorMsg)
        return
      }

      let url = this.$store.state.main.urlBase + 'user/add/data'
      let account = new Account(this.username, this.password, this.email, this.firstName, this.lastName, this.rememberMe, ['user'])
      let result = await account.postToServer(url)
      if (HTTP.hasErrors(result)) return
      this.$store.commit('main/SET_ACCOUNT', account)
      this.$store.commit('main/SET_USER_PANEL_STATE', UserState.USER)
      let msg = UserMessages.getMessage(UserMessages.LANGUAGE.en_US, UserMessages.SUCCESS_ACCOUNT_ADDED)
      let successMsg = new QueuedUserMessage(msg, UserMessages.SOUND_SUCCESS, 0, false)
      Queue.broadcast(Messages.USER_MESSAGE, successMsg)
    },
    signIn () {
      this.$store.commit('main/SET_USER_PANEL_STATE', UserState.SIGN_IN)
    },
    resetPassword () {
      this.$store.commit('main/SET_USER_PANEL_STATE', UserState.RESET_PASSWORD)
    },
    validate () {
      let account = new Account(this.username, this.password, this.email)
      let err = account.validate()
      if (err) return err
      if (this.password !== this.reenterPassword) return UserMessages.ERROR_PASSWORDS_DO_NOT_MATCH
      return 0
    }
  }
}
</script>
<style scoped>
.sign-up-top {
  position: absolute;
  top: 60px;
  width: 96%;
}
.sign-up-column {
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
  align-items: center;
}
.sign-up-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width:100%;
  min-width: 100%;
  max-width: 100%;
}
.sign-up-row-2 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width:100%;
  min-width: 100%;
  max-width: 100%;
}
.sign-up-row:before {
  box-sizing: content-box;
}
.sign-up-row:after {
  box-sizing: content-box;
}
.sign-up-half-width {
  width: 48%;
}
.sign-up-logo {
  position: relative;
  top: -3px;
  width: 50px;
  height: 50px;
}
.sign-up-link {
  text-decoration: underline;
  cursor: pointer;
}
</style>
