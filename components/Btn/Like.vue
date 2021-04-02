<template>
  <div :class="['d-flex align-items-center text-danger', isMobile ? '' : 'ml-3']">
    <div :class="['d-flex align-items-center justify-content-center', { 'flex-column': isMobile }]">
      <div v-if="isAuthenticated" class="mouse-pointer btn-like" @click="likeIt">
        <i :class="['material-icons', liked ? 'text-danger' : 'text-body', isMobile ? 'md-32' : 'md-18']">{{ like }}</i>
      </div>
      <NuxtLink v-else to="/login" class="text-body btn-like">
        <i :class="['material-icons', isMobile ? 'md-32' : 'md-18']">favorite_border</i>
      </NuxtLink>
      <span v-if="false" :class="['text-muted font-weight-lighter small', { 'ml-1': !isMobile }]">{{ likes }}</span>
    </div>
  </div>
</template>

<script>
import { isMobile } from 'mobile-device-detect'
import { mapGetters } from 'vuex'

export default {
  name: 'BtnLike',
  props: ['item'],
  data () {
    return {
      likes: this.item.recipe.likes,
      liked: false,
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'users/authentication/isAuthenticated',
      currentUser: 'users/sessions/current',
      isMobile: 'isMobile',
    }),
    like () {
      return this.liked ? 'favorite' : 'favorite_border'
    },
  },
  methods: {
    isLiked () {
      if (this.isAuthenticated) {
        // console.log(this.user)
        this.liked = this.currentUser.likes.findIndex(like => like.recipe_id == this.item.recipe.id) > -1
      }
      else this.liked = false
    },
    likeIt () {
      if (!this.liked) {
        console.log('like')
        this.likes += 1
        this.liked = true
        this.$store.dispatch('recipes/like', { user_id: this.currentUser.id, recipe_id: this.item.recipe.id })
          // .then(() => this.$emit('liked', true))
      }
      else {
        console.log('unlike')
        this.likes -= 1
        this.liked = false
        this.$store.dispatch('recipes/unlike', { user_id: this.currentUser.id, recipe_id: this.item.recipe.id })
      }
    },
  },
  beforeMount () {
    this.isLiked()
  }
}
</script>
