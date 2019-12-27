<template>
<div>
  <div class="list-wrapper" v-if="bookList">
    <q-list bordered class="list-control" v-bind:style="{ height: listHeight + 'px' }">
      <q-item clickable v-ripple v-on:click="clicked(item)" v-for="(item, index) in bookList" v-bind:key="index">
        <q-item-section avatar>
          <img class="thumbnail-image" v-bind:src="getURL(item)" />
        </q-item-section>
        <div class="thumbnail-item-description">
          <q-item-section>{{getTitle(item)}} #{{item.issue}}</q-item-section>
            <div v-if="showPrice" class="thumbnail-price self-end">${{getPrice(item)}}</div>
        </div>
      </q-item>
    </q-list>
  </div>
  <div v-else>
    {{emptyMessage}}
  </div>
</div>
</template>
<script>

import Queue from '../util/queue'
export default {
  name: 'ItemList',
  props: {
    bookList: {
      type: Array
    },
    emptyMessage: {
      type: String
    },
    clickedMessage: {
      type: String
    },
    readerState: {
      type: Number
    },
    showPrice: {
      type: Boolean
    },
    listHeight: {
      type: Number
    }
  },
  methods: {
    clicked (item) {
      let book = this.getBook(item)
      this.$store.commit('main/SET_READER_STATE', this.readerState)
      Queue.broadcast(this.clickedMessage, book)
    },
    getBook(item) {
      let bookInfo = this.$store.state.main.bookInfo
      if (!bookInfo || !bookInfo.length) return
      for (let i = 0; i < bookInfo.length; i++) {
        let book = bookInfo[i]
        if (book.id !== item.id || book.issue !== item.issue) continue
        return book
      }
      return null
    },
    getPrice (item) {
      let book = this.getBook(item)
      if (book) return book.price
      return '0.00'
    },
    getTitle (item) {
      let book = this.getBook(item)
      if (book) return book.title
      return ''
    },
    getURL (item) {
      let book = this.getBook(item)
      if (book) return this.$store.state.main.urlBase + 'comics/' + item.id + '/' + item.issue + '/' + book.cover
      return ''
    }
  }
}
</script>
<style scoped>
.list-wrapper {
  height: 100%;
  width: 100%;
}
.list-control {
  overflow: auto;
}
.thumbnail-image {
  width: 77px;
  height: 100px;
  border: 3px;
  background-color: #073d6d;
  border-color: #073d6d;
  border-style: solid;
}
.thumbnail-item-description {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  font-weight: bold;
  width: 120px;
}
.thumbnail-price {
  width: 42px;
  height: 23px;
  border: 1px;
  border-color: #073d6d;
  border-style: solid;
  text-align: center;
}
</style>
