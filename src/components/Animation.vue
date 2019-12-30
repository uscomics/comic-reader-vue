// https://css-tricks.com/animate-to-an-inline-style/
<template>
  <div>
    <div>
      <img v-if="characters[0]" class="animation-character" v-bind:style="{ height: getHeight(0), 'z-index': getZ(0), 'left': getLeft(0), 'opacity': getOpacity(0)}" v-bind:src="characters[0].image">
      <img v-if="characters[1]" class="animation-character" v-bind:style="{ height: getHeight(1), 'z-index': getZ(1), 'left': getLeft(1), 'opacity': getOpacity(1)}" v-bind:src="characters[1].image">
      <img v-if="characters[2]" class="animation-character" v-bind:style="{ height: getHeight(2), 'z-index': getZ(2), 'left': getLeft(2), 'opacity': getOpacity(2)}" v-bind:src="characters[2].image">
    </div>
    <q-chat-message class="animation-quote" v-bind:style="{ 'opacity': getQuoteOpacity()}" :text="[getQuote()]" sent/>
    <CharacterInfo v-bind:character="frontCharacter" class="row justify-center animation-character-panel"/>
  </div>
</template>

<script>
const animation = require('../data/animation.json')
import CharacterInfo from './CharacterInfo'
import Messages from '../util/messages'
import Queue from '../util/queue'
export default {
  name: 'Animation',
  components: {
    CharacterInfo
  },
  data: function() {
    return {
      characters: [],
      characterName: '',
      intervalId: 0,
      quoteOpacity: 0.0
    }
  },
  created () {
    this.characters = animation.characters
    this.setName()
    Queue.register(this, Messages.STORE_BOOK_SELECTED, this.doStoreBookSelected)
    this.intervalId = setInterval(() => { this.animate() }, 5000)
    setTimeout(() => { this.quoteOpacity = 1.0 }, 1000)
    setTimeout(() => { this.quoteOpacity = 0.0 }, 4000)
  },
  computed: {
    frontCharacter () {
      for (let i = 0; i < this.characters.length; i++) {
        if ('cf' !== this.characters[i].position) continue
        return this.characters[i]
      }
      return null
    }
  },
  methods: {
    animate () {
      for (let i = 0; i < this.characters.length; i++) {
        if ('cf' === this.characters[i].position) this.characters[i].position = 'lr'
        else if ('lr' === this.characters[i].position) this.characters[i].position = 'rr'
        else if ('rr' === this.characters[i].position) this.characters[i].position = 'cf'
      }
      setTimeout(() => { this.quoteOpacity = 1.0 }, 2300)
      setTimeout(() => { this.quoteOpacity = 0.0 }, 4800)
    },
    // mobile, tablet, laptop, and desktop defined in router/index.js
    getHeight (index) {
      let position = this.characters[index].position
      if ('cf' === position) {
        if (this.$mq === 'mobile') return '206px'
        if (this.$mq === 'tablet') return '413px'
        if (this.$mq === 'laptop') return '573px'
        if (this.$mq === 'desktop') return '819px'
      }
      if ('lr' === position || 'rr' === position) {
        if (this.$mq === 'mobile') return '98px'
        if (this.$mq === 'tablet') return '197px'
        if (this.$mq === 'laptop') return '273px'
        if (this.$mq === 'desktop') return '455px'
      }
      return 0 // Should never happen
    },
    getLeft (index) {
      let position = this.characters[index].position
      if ('cf' === position) return '30%'
      if ('rr' === position) return '80%'
      if ('lr' === position) return '10px'
      return 0 // should never happen
    },
    getName() {
      return this.characterName
    },
    getOpacity (index) {
      let position = this.characters[index].position
      if ('cf' === position) return 1.0
      if ('lr' === position || 'rr' === position) return 0.5
      return 0 // should never happen
    },
    getQuote (index) {
      return this.frontCharacter.quote
    },
    getQuoteOpacity (index) {
      return this.quoteOpacity
    },
    getZ (index) {
      let position = this.characters[index].position
      if ('cf' === position) return 10
      return 5
    },
    doStoreBookSelected(book) {
      let pages = [ book.cover ]
      pages = pages.concat(book.preview)
      pages = pages.concat('EndofPreview.jpg')
      let preview = { id: book.id, issue: book.issue, pages: pages }
      clearInterval(this.intervalId)
      this.$store.commit('main/SET_CURRENT_BOOK', preview)
      if (this.$route.path !== '/reader') this.$router.push({ path: '/reader' }).catch(() => {})
    },
    setName () {
      this.characterName = this.frontCharacter.name
    }
  }
}
</script>
<style scoped>
.animation-character {
  position: absolute;
  top: 0%;
  width: auto;
  transition: z-index 2s linear, left 2s linear, height 2s linear, opacity 2s linear;
}
.animation-quote {
  position: absolute;
  top: 7%;
  left: 35%;
  width: 150px;
  z-index: 20;
}
.animation-character-panel {
  position: absolute;
  left: 1px;
  width: 98%;
  z-index: 15;
  margin: 1%;
}
@media only screen and (max-width: 450px) {
.animation-character-panel {
  position: absolute;
  bottom: 5px;
  left: 1px;
  width: 98%;
  z-index: 15;
  margin: 1%;
}
}
</style>
