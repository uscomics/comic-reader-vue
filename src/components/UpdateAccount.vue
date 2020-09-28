<template>
<div class="UpdateAccountColumn">
  <div class="UpdateAccountColumn update-account-top">
    <!-- Form -->
    <form class="UpdateAccountColumn">
      <!--     UserName     Password -->
      <!--     First Name   Reenter Password -->
      <!--     Last Name    Email -->
      <div class="UpdateAccountRow">
        <div class="UpdateAccountColumn UpdateAccountHalfWidth">
          <Label
            class="UpdateAccountText Username"
            id="username"
            :text="username"
            size="medium"
            color="default"
          />
          <TextInput
            class="UpdateAccountText"
            :dense="true"
            :hidebottomspace="true"
            id="firstName"
            label="First Name"
            type="text"
            v-model="firstName"
            @text-input-changed-event="setFirstName"
            @text-input-focus-event="setHelpText('Optional.')"
          />
          <TextInput
            class="UpdateAccountText"
            :dense="true"
            :hidebottomspace="true"
            id="lastName"
            label="Last Name"
            type="text"
            v-model="lastName"
            @text-input-changed-event="setLastName"
            @text-input-focus-event="setHelpText('Optional.')"
          />
        </div>
        <div class="UpdateAccountColumn UpdateAccountHalfWidth">
          <TextInput
            class="UpdateAccountText"
            :dense="true"
            :hidebottomspace="true"
            id="password"
            label="Password"
            type="password"
            v-model="password"
            @text-input-changed-event="setPassword"
            @text-input-focus-event="setHelpText('Minimum 5 characters.')"
          />
          <TextInput
            class="UpdateAccountText"
            :dense="true"
            :hidebottomspace="true"
            id="reenterPassword"
            label="Renter Password"
            type="password"
            v-model="reenterPassword"
            @text-input-changed-event="setReenterPassword"
            @text-input-focus-event="setHelpText('Minimum 5 characters.')"
          />
          <TextInput
            class="UpdateAccountText"
            :dense="true"
            :hidebottomspace="true"
            id="email"
            label="Email"
            type="text"
            v-model="reenterPassword"
            @text-input-changed-event="setEmail"
            @text-input-focus-event="setHelpText('Used for password reset.')"
          />
        </div>
      </div>
      <Label :text="getHelpText()" size="small" color="default" />
      <br/>
      <br/>
      <Button type="submit" class="q-mt-md" label="Update Account" @button-event="updateAccount"/>
    </form>
  </div>
</div>
</template>
<script>
import Account from '../data/account'
import Button from '../components/Button.vue'
import HTTP from '../util/http'
import Label from '../components/Label.vue'
import Messages from '../util/messages'
import Queue from '../util/queue'
import QueuedUserMessage from '../util/queued-user-message'
import TextInput from '../components/TextInput.vue'
import UserMessages from '../util/user-messages'
export default {
  name: 'UpdateAccount',
  components: { Button, Label, TextInput },
  data: function() {
    return {
      username: this.$store.state.main.account.username,
      firstName: this.$store.state.main.account.firstName,
      lastName: this.$store.state.main.account.lastName,
      password: '',
      reenterPassword: '',
      email: this.$store.state.main.account.email,
      helpText: ''
    }
  },
  methods: {
    getHelpText () {
      return this.helpText
    },
    setEmail (text) {
      this.email = text
    },
    setFirstName (text) {
      this.firstName = text
    },
    setHelpText (text) {
      this.helpText = text
    },
    setLastName (text) {
      this.lastName = text
    },
    setPassword (text) {
      this.password = text
    },
    setReenterPassword (text) {
      this.reenterPassword = text
    },
    async updateAccount () {
      let err = this.validate()
      if (err) {
        let msg = UserMessages.getMessage(UserMessages.LANGUAGE.en_US, err)
        let errorMsg = new QueuedUserMessage(msg, UserMessages.SOUND_ERROR, 0, false)
        Queue.broadcast(Messages.USER_ERROR, errorMsg)
        return
      }

      let url = this.$store.state.main.urlBase + 'user/update/data'
      let account = new Account(this.username, this.password, this.email, this.firstName, this.lastName, null, ['user'])
      let result = await account.postToServer(url)
      if (HTTP.hasErrors(result)) return
      this.$store.commit('main/SET_ACCOUNT', account)
      let msg = UserMessages.getMessage(UserMessages.LANGUAGE.en_US, UserMessages.SUCCESS_ACCOUNT_UPDATED)
      let successMsg = new QueuedUserMessage(msg, UserMessages.SOUND_SUCCESS, 0, false)
      Queue.broadcast(Messages.USER_MESSAGE, successMsg)
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
.UpdateAccountColumn {
  @include column;
  justify-content: flex-center;
  align-items: center;
}

.UpdateAccountRow {
  @include row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
}

.UpdateAccountHalfWidth {
  width: 48%;
}

.Username {
    height: 43px !important;
}

.UpdateAccountText {
    cursor: pointer;
    width: 100%;
    height: 40px;
    margin-top: 5px;
    margin-bottom: 3px;
}

.UpdateAccountLink {
    text-decoration: underline;
    width: 75%;
    height: 25px;
    margin-top: 5px;
    margin-bottom: 3px;
}

</style>
