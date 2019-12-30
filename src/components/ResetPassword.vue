<template>
<div class="reset-password-column">
  <div class="reset-password-column reset-password-top">
    <!-- Image -->
    <img class="reset-password-logo q-mb-md" src='../assets/USComicsLogo.png'/>
    <!-- Form -->
    <form class="reset-password-column">
      <!-- Email -->
      <q-input id="email" v-model="email" label="Email" />
      <br/>
      <q-btn type="submit" color="white" text-color="black" class="q-mt-md" label="Reset Password" v-on:click="resetPassword"/>
    </form>
    <br/>
    <div class="text-body1">
      An email will be sent to you. It will contain a link which can be used to reset your password. This link will expire after 1 hour.
    </div>
    <br/>
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
  name: 'ResetPassword',
  data: function() {
    return {
      email: ''
    }
  },
  methods: {
    async resetPassword () {
      let url = this.$store.state.main.urlBase + 'user/password/reset/request/data'
      let account = new Account(null, null, this.email, null, null, null, null)
      let result = await account.postToServer(url, false)
      if (HTTP.hasErrors(result)) return
      let msg = UserMessages.getMessage(UserMessages.LANGUAGE.en_US, UserMessages.SUCCESS_PASSWORD_RESET_REQUEST)
      let successMsg = new QueuedUserMessage(msg, UserMessages.SOUND_SUCCESS, 0, false)
      this.$store.commit('main/SET_USER_PANEL_STATE', UserState.SIGN_IN)
      Queue.broadcast(Messages.USER_MESSAGE, successMsg)
    }
  }
}
</script>
<style scoped>
.reset-password-top {
  position: absolute;
  top: 60px;
  width: 96%;
}
.reset-password-column {
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
  align-items: center;
}
.reset-password-logo {
  position: relative;
  top: -3px;
  width: 50px;
  height: 50px;
}
</style>
