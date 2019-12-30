<template>
  <div>
    <div class="character-info">
      <div>
        <div class="character-name">{{getName()}}</div>
        <div class="row justify-center cover-gallery">
          <div class="appearances row" clickable v-ripple v-on:click="clicked(item)" v-for="(item, index) in character.appearances" v-bind:key="index">
            <img class="thumbnail-image" v-bind:src="getURL(item)" />
            <div class="thumbnail-item-description">{{getTitle(item)}} #{{item.issue}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Issue from '../data/issue'
import Messages from '../util/messages'
import Queue from '../util/queue'
export default {
  name: 'CharacterInfo',
  props: {
    character: null
  },
  methods: {
    clicked (item) {
      let book = this.getBook(item)
      this.$store.commit('main/SET_READER_STATE', this.readerState)
      Queue.broadcast(Messages.STORE_BOOK_SELECTED, book)
    },
    getBook(item) {
      if (!this.$store.state.main.bookInfo) return
      return Issue.getBook(this.$store.state.main.bookInfo, item.id, item.issue)
    },
    getName() {
      return this.character.name
    },
    getTitle (item) {
      let book = this.getBook(item)
      if (!book) return
      return this.getBook(item).title
    },
    getURL (item) {
      let book = this.getBook(item)
      if (!book) return
      return this.$store.state.main.urlBase + 'comics/' + item.id + '/' + item.issue + '/' + book.cover
    }
  }
}
</script>
<style scoped>
.character-info {
  width: 99%;
  border: 1px solid #073d6d;
  background-color: #FFFFFF77;
}
.character-name {
  font-size: x-large;
  color: #073d6d;
  text-align: center;
  background-color: white;
  opacity: 0.66;
}
.cover-gallery {
  width: 100%;
  margin: 2px;
}
.thumbnail-item-description {
  font-size: small;
  width: 60%;
  text-align: center;
}
.thumbnail-image {
  width: 77px;
  height: 100px;
  border: 3px;
  background-color: #073d6d;
  border-color: #073d6d;
  border-style: solid;
}
.appearances {
  width: 24%;
  margin: 2px;
}
@media only screen and (max-width: 450px) {
.character-info {
  width: 95%;
  border: 1px solid #073d6d;
  background-color: #FFFFFF77;
}
.character-name {
  font-size: small;
  color: #073d6d;
  text-align: center;
  background-color: white;
  opacity: 0.66;
}
.cover-gallery {
  width: 97%;
}
.thumbnail-item-description {
  font-size: xx-small;
  width: 90%;
}
.thumbnail-image {
  width: 62px;
  height: 80px;
  border: 1px;
  background-color: #073d6d;
  border-color: #073d6d;
  border-style: solid;
}
}
</style>
