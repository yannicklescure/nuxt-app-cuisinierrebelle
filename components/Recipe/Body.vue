<template>
  <div>
    <div class="d-none d-print-block mt-3 mb-5 text-center">∾&nbsp;www.CuisinierRebelle.com&nbsp;∾</div>
    <div class="my-md-5 order-1 order-md-1 d-flex flex-column justify-content-center align-items-center">
      <div class="text-center">
        <div class="h1">{{ item.recipe.title }}</div>
        <div v-if="item.recipe.subtitle" class="h2 text-secondary">{{ item.recipe.subtitle }}</div>
      </div>
    </div>
    <div
      class="recipe-image my-3 d-print-none"
      :style="{ backgroundImage: 'url(' + item.recipe.photo.full.url + ')' }"
    ></div>
    <vue-markdown-plus :source="item.recipe.direction" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueMarkdownPlus from 'vue-markdown-plus'

export default {
  name: 'RecipeBody',
  props: ['item'],
  components: {
    VueMarkdownPlus,
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/current',
      isMobile: 'isMobile',
    }),
  },
}
</script>
