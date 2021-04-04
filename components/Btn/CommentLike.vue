<template>
  <div class="d-flex align-items-center text-muted mx-2 mouse-pointer">
    <span
      @click="likeIt"
      :class="['material-icons md-16', { 'text-primary': liked }]"
      data-toggle="tooltip"
      data-placement="bottom"
      :title="$t('comments.like')"
    >thumb_up</span>
    <span v-if="likes > 0" :class="['font-weight-lighter small ml-1']">{{ likes }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CommentLike',
  props: ['item', 'type'],
  data () {
    return {
      liked: false,
      likes: this.item.likes
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'users/authentication/isAuthenticated',
      currentUser: 'users/sessions/current'
    })
  },
  methods: {
    isUserLiked () {
      if (this.isAuthenticated) {
        console.log(this.currentUser[`${this.type}Likes`].findIndex(item => item === this.item.id))
        this.liked = this.currentUser[`${this.type}Likes`].findIndex(item => item === this.item.id) > -1
      } else {
        this.liked = false
      }
    },
    likeIt () {
      const payload = {}
      if (this.type === 'comment') {
        payload.comment_id = this.item.id
        payload.recipe_id = this.item.recipe.id
      }
      if (this.type === 'reply') {
        payload.reply_id = this.item.id
        payload.comment_id = this.item.commentId
        payload.recipe_id = this.item.recipeId
      }
      console.log(payload)
      this.liked = !this.liked
      if (this.liked) {
        this.likes += 1
      } else {
        this.likes -= 1
      }
      this.$store.dispatch(`recipes/${this.type}${this.liked ? 'Like' : 'Unlike'}`, payload)
    }
  },
  beforeMount () {
    this.isUserLiked()
  }
}
</script>
