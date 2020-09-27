<template>
<div class="SignUpColumn">
  <div class="SignUpColumn SignUpTop">
    <!-- Image -->
    <!-- <img class="sign-up-logo q-mb-md" src='../assets/USComicsLogo.png'/> -->
    <!-- Form -->
    <form class="SignUpColumn">
      <!--     UserName     Password -->
      <!--     First Name   Reenter Password -->
      <!--     Last Name    Email -->
      <div class="SignUpRow">
        <div class="SignUpColumn SignUpHalfWidth">
          <TextInput
            class="SignUpText"
            :dense="true"
            :hidebottomspace="true"
            id="username"
            label="User Name"
            type="text"
            v-model="username"
            @text-input-focus-event="setHelpText('Minimum 5 characters. Letter, number, dash, or underscore.')"
          />
          <TextInput
            class="SignUpText"
            :dense="true"
            :hidebottomspace="true"
            id="firstName"
            label="First Name"
            type="text"
            v-model="firstName"
            @text-input-focus-event="setHelpText('Optional.')"
          />
          <TextInput
            class="SignUpText"
            :dense="true"
            :hidebottomspace="true"
            id="lastName"
            label="Last Name"
            type="text"
            v-model="lastName"
            @text-input-focus-event="setHelpText('Optional.')"
          />
        </div>
        <div class="SignUpColumn SignUpHalfWidth">
          <TextInput
            class="SignUpText"
            :dense="true"
            :hidebottomspace="true"
            id="password"
            label="Password"
            type="password"
            v-model="password"
            @text-input-focus-event="setHelpText('Minimum 5 characters.')"
          />
          <TextInput
            class="SignUpText"
            :dense="true"
            :hidebottomspace="true"
            id="reenterPassword"
            label="Renter Password"
            type="password"
            v-model="reenterPassword"
            @text-input-focus-event="setHelpText('Minimum 5 characters.')"
          />
          <TextInput
            class="SignUpText"
            :dense="true"
            :hidebottomspace="true"
            id="email"
            label="Email"
            type="text"
            v-model="reenterPassword"
            @text-input-focus-event="setHelpText('Used for password reset.')"
          />
        </div>
      </div>
      <Label :text="getHelpText()" size="small" color="default" />
      <br/>
      <!-- Remember Me -->
       <div class="SignUpRememberMeRow">
        <q-checkbox color="white-1" id="rememberMe" v-model="rememberMe" />
        <Label for="rememberMe" text="Remember Me" size="medium" color="default" />
      </div>
     <Button type="submit" class="q-mt-md" label="Sign Up" @button-event="signUp"/>
    </form>
    <!-- Already Have An Account? -->
    <br/>
    <Label text="Already Have An Account?" size="medium" color="default" />
    <!-- Sign In -->
    <Link class="SignUpLink" text="Sign In" @link-event="signIn" />
    <!-- Forgot Your Password? -->
    <br/>
    <Label text="Forgot Your Password?" size="medium" color="default" />
    <!-- Reset Password -->
    <Link class="SignUpLink" text="Reset Password" @link-event="resetPassword" />
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
  name: 'SignUp',
  components: { Button, Label, Link, TextInput },
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
    getHelpText () {
      return this.helpText
    },
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
<style scoped lang="scss">
@import '../css/app.sass';
.SignUpTop {
  position: absolute;
  top: 50px;
  bottom: 0px;
  width: 100%;
  color: var(--theme_text_color_label) !important;
  background-color: var(--theme_background_color) !important;
}

.SignUpColumn {
  @include column;
  justify-content: flex-center;
  align-items: center;
}

.SignUpRow {
  @include row;
  justify-content: space-between;
  align-items: center;
  width:100%;
  min-width: 100%;
  max-width: 100%;
}

.SignUpRow-2 {
  @include row;
  justify-content: center;
  align-items: center;
  width:100%;
  min-width: 100%;
  max-width: 100%;
}

.SignUpRow:before {
  box-sizing: content-box;
}

.SignUpRow:after {
  box-sizing: content-box;
}

.SignUpHalfWidth {
  width: 48%;
}

.sign-up-logo {
  position: relative;
  top: -3px;
  width: 50px;
  height: 50px;
}

.SignUpRememberMeRow {
  @include rise;
  @include row;
  justify-content: center;
  align-items: center;
  width:100%;
  min-width: 100%;
  max-width: 100%;
}

.SignUpText {
    text-decoration: underline;
    cursor: pointer;
    width: 100%;
    height: 40px;
    margin-top: 5px;
    margin-bottom: 3px;
}

.SignUpLink {
    width: 75%;
    height: 25px;
    margin-top: 5px;
    margin-bottom: 3px;
}

</style>
