<template>
  <div ref="recipe" class="container py-3 mb-5 recipe" :key="componentKey">
    <div v-if="item">
      <SocialHead :item="item" />
      <RecipeHead :item="item" />
      <RecipeBody :item="item" :dimension="dimension" />

      <LazyYoutube :item="item" />

      <LazyBtnSocialSharing v-if="isMobile == false" :item="item" />

      <LazyRecipeAds />

      <LazyOtherRecipes />

      <LazyComments :item="item" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Recipe',
  data () {
    return {
      componentKey: 0,
      dimension: {
        width: 0,
        height: 0
      },
      item: undefined
    }
  },
  // async asyncData(context) {
  //   console.log(context)
  //   // await context.store.dispatch('recipes/recipe', context.params.slug)
  //   const item = await context.$axios.$get(`https://api.cuisinierrebelle.com/v1/recipes/${ context.params.slug }`)
  //   return { item }
  // },
  async fetch () {
    this.item = await this.$axios.$get(`https://api.cuisinierrebelle.com/v1/recipes/${ this.$route.params.slug }`)
    this.$store.commit("recipes/recipe", { data: this.item })
    console.log(this.$route.params.slug)
    // await this.fetchRecipe(this.$route.params.slug)
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/current',
      isMobile: 'isMobile',
      // recipe: 'recipes/recipe',
      items: 'recipes/listSorted',
    }),
    // item () {
    //   return this.recipe(this.$route.params.slug)
    // }
  },
  methods: {
    ...mapActions({
      getStoreData: 'getStoreData',
      // fetchRecipe: 'recipes/recipe',
    }),
    matchInfoBox () {
      this.dimension.width = this.$refs.recipe.clientWidth
      this.dimension.height = parseInt(this.dimension.width * 2 / 3)
    }
  },
  created () {
    if (this.items.length < 2) this.getStoreData()
    if (process.client) {
      window.addEventListener("resize", this.matchInfoBox);
    }
  },
  destroyed() {
    if (process.client) {
      window.removeEventListener("resize", this.matchInfoBox);
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.matchInfoBox()
    })
  }
}
</script>
