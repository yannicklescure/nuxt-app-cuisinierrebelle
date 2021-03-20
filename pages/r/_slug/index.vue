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

      <div class="w-100 mt-3">
        <LazyRecipeAds />
      </div>

      <LazyOtherRecipes v-if="recipes.length > 2" :recipes="recipes" />

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
    }
  },
  computed: {
    ...mapGetters({
      // currentUser: 'users/sessions/current',
      isMobile: 'isMobile',
      recipe: 'recipes/recipe',
      recipes: 'recipes/listSorted',
    }),
    item () {
      return this.recipe(this.$route.params.slug)
    },
    isProduction () {
      return location.hostname != 'localhost'
    }
  },
  methods: {
    ...mapActions({
      getStoreData: 'getStoreData',
      getRecipe: 'recipes/recipe',
    }),
    matchInfoBox () {
      this.dimension.width = this.$refs.recipe.clientWidth
      this.dimension.height = parseInt(this.dimension.width * 2 / 3)
    }
  },
  async fetch() {
    console.log(this.$route.params.slug)
    await this.getRecipe(this.$route.params.slug)
    if (this.recipes.length == 0) await this.getStoreData()
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
