<template>
<div class="ResetPasswordColumn">
  <div class="ResetPasswordColumn ResetPasswordTop">
    <!-- Image -->
    <!-- <img class="reset-password-logo q-mb-md" src='../assets/USComicsLogo.png'/> -->
    <!-- Form -->
    <form class="ResetPasswordColumn">
      <!-- Email -->
      <TextInput
        class="ResetPasswordText"
        :dense="true"
        :hidebottomspace="true"
        id="email"
        label="Email"
        type="text"
        v-model="email"
        @text-input-changed-event="setEmail"
        @text-input-focus-event="setHelpText('Used for password reset.')"
      />
      <br/>
     <Button type="submit" class="q-mt-md" label="Reset Password" @button-event="resetPassword"/>
    </form>
    <br/>
    <Label
      class="Info"
      text="An email will be sent to you. It will contain a link which can be used to reset your password. This link will expire after 1 hour."
      size="small"
      color="default"
    />
    <br/>
    <Link class="ResetPasswordLink" text="Sign In" @link-event="signIn" />
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
  name: 'ResetPassword',
  components: { Button, Label, Link, TextInput },
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
    },
    setEmail (text) {
      this.email = text
    },
    signIn () {
      this.$store.commit('main/SET_USER_PANEL_STATE', UserState.SIGN_IN)
    }
  }
}
</script>
<style scoped>
.ResetPasswordTop {
  position: absolute;
  top: 50px;
  bottom: 0px;
  color: var(--theme_text_color_label) !important;
  background-color: var(--theme_background_color) !important;
}

.ResetPasswordColumn {
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

.ResetPasswordText {
    cursor: pointer;
    width: 100%;
    height: 40px;
    margin-top: 5px;
    margin-bottom: 3px;
}

.ResetPasswordLink {
    text-decoration: underline;
    width: 75%;
    height: 25px;
    margin-top: 5px;
    margin-bottom: 3px;
}

.Info{
  margin: 5px;
}
</style>
