<template>
  <div>
    <div class="d-none d-print-block mt-3 mb-5 text-center">
      &nbsp;www.CuisinierRebelle.com&nbsp;
    </div>
    <div class="my-md-5 order-1 order-md-1 d-flex flex-column justify-content-center align-items-center">
      <div class="text-center">
        <div class="h1">
          {{ item.recipe.title }}
        </div>
        <div v-if="item.recipe.subtitle" class="h2 text-secondary">
          {{ item.recipe.subtitle }}
        </div>
      </div>
    </div>
    <img
      ref="lazyImage"
      class="recipe-image my-3 d-print-none"
      :data-src="item.recipe.photo.full.url"
      :width="dimension.width"
      :height="dimension.height"
      :style="`object-fit: cover;`"
      :alt="item.recipe.slug"
    >
    <vue-markdown-plus :source="item.recipe.direction" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueMarkdownPlus from 'vue-markdown-plus'

export default {
  name: 'RecipeBody',
  components: {
    VueMarkdownPlus
  },
  props: {
    item: {
      type: Object,
      default: null
    },
    dimension: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/current',
      isMobile: 'isMobile'
    })
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.lazyImage.src = this.$refs.lazyImage.dataset.src
    })
  }
}
</script>
