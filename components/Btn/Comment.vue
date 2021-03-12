<template>
  <div>
    <NuxtLink
      :class="['text-body text-decoration-none d-flex align-items-center justify-content-center', { 'flex-column': isMobile }, isMobile ? 'mx-3' : 'ml-2']"
      :to="`/r/${ item.recipe.slug }#comments`"
    >
      <i :class="['material-icons', isMobile ? 'md-32' : 'md-18']">comment</i>
      <span :class="['text-muted font-weight-lighter small', isMobile ? 'btn-comment' : 'ml-1']">{{ commentsCount }}</span>
    </NuxtLink>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BtnComment',
  props: ['item'],
  computed: {
    ...mapGetters({
      isMobile: 'isMobile',
    }),
    commentsCount () {
      const counts = this.item.comments.map(comment => comment.replies.length)
      let sum = counts.length
      counts.map(res => sum += res)
      return sum
    },
  }
}
</script>
