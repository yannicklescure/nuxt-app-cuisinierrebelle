<template>
  <div :class="['d-flex align-items-center ml-2 text-body']">
    <div :class="['d-flex align-items-center justify-content-center', { 'flex-column': isMobile }]">
      <div v-if="isAuthenticated" class="mouse-pointer btn-bookmark" @click="bookmarkIt">
        <i :class="['material-icons text-body', isMobile ? 'md-24' : 'md-18']">{{ bookmark }}</i>
      </div>
      <NuxtLink v-else to="/login" class="text-body btn-bookmark">
        <i :class="['material-icons', isMobile ? 'md-24' : 'md-18']">bookmark_border</i>
      </NuxtLink>
      <span :class="['text-muted font-weight-lighter small', { 'ml-1': !isMobile }]">{{ bookmarks }}</span>
    </div>
  </div>
</template>

<script>
// import { isMobile } from 'mobile-device-detect'
import { mapGetters } from 'vuex'

export default {
  name: 'BtnBookmark',
  props: ['item'],
  data () {
    return {
      bookmarks: this.item.recipe.bookmarks
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'isAuthenticated',
      currentUser: 'users/current',
      isMobile: 'isMobile',
    }),
    bookmarked () {
      if (this.isAuthenticated) {
        // console.log(this.currentUser)
        return this.currentUser.bookmarks.findIndex(bookmark => bookmark.recipe_id === this.item.recipe.id) > -1
      }
      else return false
    },
    bookmark () {
      return this.bookmarked ? 'bookmark' : 'bookmark_border'
    },
  },
  methods: {
    bookmarkIt () {
      if (!this.bookmarked) {
        console.log('bookmark')
        this.bookmarks += 1
        this.$store
          .dispatch('BOOKMARK', { user_id: this.currentUser.id, recipe_id: this.item.recipe.id, created_at: new Date().getTime() })
          .then(() => this.$emit('bookmarked', true))
      }
      else {
        console.log('unbookmark')
        this.bookmarks -= 1
        this.$store.dispatch('UNBOOKMARK', { user_id: this.currentUser.id, recipe_id: this.item.recipe.id })
      }
    },
  },
}
</script>
