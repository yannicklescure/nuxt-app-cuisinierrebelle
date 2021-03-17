<template>
  <div ref="recipe" class="container py-3 mb-5 recipe" :key="componentKey">
    <div v-if="item">
      <SocialHead
        :title="item.recipe.title"
        :description="item.recipe.description"
        :image="item.recipe.photo.openGraph.url"
      />
      <RecipeHead :item="item" />
      <RecipeBody :item="item" :dimension="dimension" />

      <LazyYoutube :item="item" />

      <LazyBtnSocialSharing v-if="isMobile == false" :item="item" />

      <!-- <LazyRecipeAds /> -->

      <LazyOtherRecipes />

      <LazyComments :item="item" />
    </div>
    <div v-else>
      {{ item }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Recipe',
  data() {
    return {
      componentKey: 0,
      dimension: {
        width: 0,
        height: 0
      },
      // item: undefined,
    }
  },
  computed: {
    ...mapGetters({
      // currentUser: 'users/sessions/current',
      isMobile: 'isMobile',
      recipe: 'recipes/recipe',
      // items: 'recipes/listSorted',
    }),
    item () {
      return this.recipe(this.$route.params.slug)
    }
  },
  methods: {
    ...mapActions({
      // getStoreData: 'getStoreData',
      fetchRecipe: 'recipes/recipe',
    }),
    matchInfoBox () {
      this.dimension.width = this.$refs.recipe.clientWidth
      this.dimension.height = parseInt(this.dimension.width * 2 / 3)
    }
  },
  async created() {
    console.log(this.$route.params.slug)
    await this.fetchRecipe(this.$route.params.slug)
  },
  created() {
    if (process.client) {
      window.addEventListener("resize", this.matchInfoBox);
    }
  },
  destroyed() {
    if (process.client) {
      window.removeEventListener("resize", this.matchInfoBox);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.matchInfoBox()
    })
  }
}
</script>
