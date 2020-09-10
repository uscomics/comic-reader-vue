<template>
  <div>
      <q-toolbar class="TabBar">
            <q-btn
                :class="getUserTabButtonClass"
                v-on:click="userTab = true; linksTab = false; settingsTab=false"
                icon="person"
                aria-label="User"
            />
            <q-btn
                :class="getLinkTabButtonClass"
                v-on:click="userTab = false; linksTab = true; settingsTab=false"
                icon="link"
                aria-label="Essential Links"
            />
            <q-btn
                :class="getSettingsTabButtonClass"
                v-on:click="userTab = false; linksTab = false; settingsTab=true"
                icon="settings"
                aria-label="Settings"
            />
        </q-toolbar>
        <div v-if="userTab">
          <ResetPassword v-if="$store.state.main.userPanelState === stateResetPassword"/>
          <SignIn v-else-if="$store.state.main.userPanelState === stateSignIn"/>
          <SignUp v-else-if="$store.state.main.userPanelState === stateSignUp"/>
          <UserPanel v-else-if="$store.state.main.userPanelState === stateUser"/>
        </div>
        <div v-if="settingsTab" class="DrawerContent ThemeWrapper">
          <q-select class="ThemeSelect"
              v-model="theme"
              :options="options"
              outlined
              label="Theme"
              aria-label="Select Theme"
          />
        </div>
        <q-list v-if="linksTab" class="DrawerContent LinkList">
            <q-item-label header>
                Essential Links
            </q-item-label>
            <EssentialLink
                v-for="link in essentialLinks"
                v-bind="link"
                :key="link.title"
                :aria-label="link.title"
            />
        </q-list>
  </div>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import ResetPassword from '../components/ResetPassword'
import { setThemeLight, setThemeDark, setThemeHero, setThemeVillian, setThemeGamma, setTheme3D, setThemeNeumorphic, setThemeNeumorphicDark } from '../util/theme_utils'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import UserPanel from '../components/UserPanel'
import UserState from '../util/user-state'

const linksData = [
  {
    title: 'City of Heroes: Homecoming Forum',
    caption: 'forums.homecomingservers.com',
    icon: 'record_voice_over',
    link: 'https://forums.homecomingservers.com/forum/3-city-of-heroes-homecoming/'
  },
  {
    title: 'Mids\' Reborn Hero Designer Forum',
    caption: 'forums.homecomingservers.com',
    icon: 'record_voice_over',
    link: 'https://forums.homecomingservers.com/forum/74-forum/'
  },
  {
    title: 'City of Heroes Homecoming Discord Chat Channel',
    caption: '',
    icon: 'chat',
    link: 'https://discord.com/channels/572090223115239444/572090265678905354'
  },
  {
    title: 'Mids\' Reborn Hero Designer Discord Chat Channel',
    caption: '',
    icon: 'chat',
    link: 'https://discord.com/channels/593336669004890113/731584074531078232'
  }
]

export default {

  name: 'Drawer',
  components: { EssentialLink, ResetPassword, SignIn, SignUp, UserPanel },
  data () {
    return {
      userTab: true,
      linksTab: false,
      settingsTab: false,
      essentialLinks: linksData,
      theme: this.$store.state.builder.theme,
      options: [
        'Light', 'Dark', 'Hero', 'Villain', 'Gamma', 'Neumorphic', 'Neumorphic Dark'
      ]
    }
  },
  computed: {
    getLinkTabButtonClass () {
      if (this.linksTab) {
        return 'TabButtonPressed'
      } else {
        return 'TabButton'
      }
    },
    getSettingsTabButtonClass () {
      if (this.settingsTab) {
        return 'TabButtonPressed'
      } else {
        return 'TabButton'
      }
    },
    getUserTabButtonClass () {
      if (this.userTab) {
        return 'TabButtonPressed'
      } else {
        return 'TabButton'
      }
    },
    stateResetPassword () {
      return UserState.RESET_PASSWORD
    },
    stateSignIn () {
      return UserState.SIGN_IN
    },
    stateSignUp () {
      return UserState.SIGN_UP
    },
    stateUser () {
      return UserState.USER
    }
  },
  watch: {
    theme: function (val, preVal) {
      if (val !== preVal) {
        if (val === 'Light') {
          setThemeLight()
        } else if (val === 'Dark') {
          setThemeDark()
        } else if (val === 'Hero') {
          setThemeHero()
        } else if (val === 'Villain') {
          setThemeVillian()
        } else if (val === 'Gamma') {
          setThemeGamma()
        } else if (val === '3D') {
          setTheme3D()
        } else if (val === 'Neumorphic') {
          setThemeNeumorphic()
        } else {
          setThemeNeumorphicDark()
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../css/app.sass';

.Drawer {
  @include cursor-default;
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  color: var(--theme_text_color_label) !important;
  background-color: var(--theme_background_color) !important;
  font-family: var(--theme_font_family) !important;
}

.DrawerContent {
  position: absolute;
  top: 50px;
  bottom: 0px;
  width: 100%;
  color: var(--theme_text_color_label) !important;
  background-color: var(--theme_background_color) !important;
  font-family: var(--theme_font_family) !important;
}

.TabBar  {
  @include row;
  position: absolute;
  top: 0px;
  width: 100%;
  height: 35px;
  color: var(--theme_text_color_label) !important;
  background-color: var(--theme_background_color_menu_bar) !important;
}

.TabButton {
  @include cursor-default;
  @include small-box;
  @include rise;
  @include cursor-pointer;
  color: var(--theme_text_color_label) !important;
  background-color: var(--theme_background_color) !important;
  font-family: var(--theme_font_family) !important;
  box-shadow: var(--theme_box_shadow_small) !important;
  border-radius: var(--theme_border_radius_image_button_image) !important;
  margin-right: 20px;
  &:active {
    box-shadow: var(--theme_box_shadow_small_active) !important;
  }
}

.TabButtonPressed {
  @include cursor-default;
  @include small-box;
  @include rise;
  @include cursor-pointer;
  color: var(--theme_text_color_button_down) !important;
  background-color: var(--theme_background_color_button_down) !important;
  font-family: var(--theme_font_family) !important;
  box-shadow: var(--theme_box_shadow_small_active) !important;
  border-radius: var(--theme_border_radius_image_button_image) !important;
  margin-right: 20px;
  &:active {
    box-shadow: var(--theme_box_shadow_small) !important;
  }
}

.ThemeWrapper {
  @include column;
  align-content: center;
  align-items: center;
  color: var(--theme_text_color_label) !important;
  background-color: var(--theme_background_color) !important;
}

.ThemeSelect {
  width: 90%;
  color: black !important;
  background-color: white;
}

.LinkList {
  @include column;
  align-content: center;
  align-items: center;
}
</style>
