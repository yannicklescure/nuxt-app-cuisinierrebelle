<template>
  <div>
    <NuxtLink
      :class="['text-body text-decoration-none d-flex align-items-center justify-content-center', { 'flex-column': isMobile }, isMobile ? 'mr-2' : 'ml-2']"
      :to="'/r/' + item.recipe.slug + '#comments'"
    >
      <i :class="['material-icons', isMobile ? 'md-24' : 'md-18']">comment</i>
      <span :class="['text-muted font-weight-lighter small', isMobile ? 'btn-comment' : 'ml-1']">{{ countRecipeComments(item) }}</span>
    </NuxtLink>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BtnComment',
  props: ['item'],
  computed: {
    ...mapGetters([
      'countRecipeComments',
      'isMobile',
    ]),
  }
}
</script>
