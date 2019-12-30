<template>
<div class="update-account-column">
  <div class="update-account-column update-account-top">
    <!-- Form -->
    <form class="update-account-column">
      <!--     UserName     Password -->
      <!--     First Name   Reenter Password -->
      <!--     Last Name    Email -->
      <div class="update-account-row">
        <div class="update-account-column update-account-half-width">
          <q-input id="username" v-on:focus="setHelpText('Minimum 5 characters. Letter, number, dash, or underscore.')" v-model="username" label="User Name" />
          <q-input id="firstName" v-on:focus="setHelpText('Optional.')" v-model="firstName" label="First Name" />
          <q-input id="lastName" v-on:focus="setHelpText('Optional.')" v-model="lastName" label="Last Name" />
        </div>
        <div class="update-account-column update-account-half-width">
          <q-input id="password" v-on:focus="setHelpText('Minimum 5 characters.')" v-model="password" type="password" label="Password" />
          <q-input id="reenterPassword" v-on:focus="setHelpText('Minimum 5 characters.')" v-model="reenterPassword" type="password" label="Renter Password" />
          <q-input id="email" v-on:focus="setHelpText('Used for password reset.')" v-on:blur="setHelpText('')" v-model="email" label="Email" />
        </div>
      </div>
      {{helpText}}
      <br/>
      <br/>
      <q-btn type="submit" color="white" text-color="black" class="q-mt-sm" label="Update Account" v-on:click="updateAccount"/>
    </form>
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
export default {
  name: 'UpdateAccount',
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
    setHelpText (text) {
      this.helpText = text
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
<style scoped>
.update-account-top {
  width: 96%;
}
.update-account-column {
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
  align-items: center;
}
.update-account-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
}
.update-account-half-width {
  width: 48%;
}

</style>
