<template>
  <div ref="recipe" class="container py-3 mb-5 recipe" :key="componentKey">
    <div v-if="item">
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
      }
    }
  },
  async asyncData(context) {
    console.log(context)
    await context.store.dispatch('recipes/recipe', context.params.slug)
    const recipeData = await context.$axios({
      validateStatus: status => {
        // console.log(status)
        return status < 500; // Resolve only if the status code is less than 500
      },
      method: 'get',
      url: `https://api.cuisinierrebelle.com/v1/recipes/${ context.params.slug }`,
    })
    console.log(recipeData)
    const item = recipeData.data
    return { item }
  },
  async fetch () {
    console.log(this.$route.params.slug)
    if (this.items.length < 2) this.getStoreData()
    await this.fetchRecipe(this.$route.params.slug)
  },
  head() {
    if (this.item) {
      return {
        meta: [
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            content: this.item.recipe.title
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: this.item.recipe.description
          },
          {
            hid: 'twitter:image',
            name: 'twitter:image',
            content: this.item.recipe.photo.openGraph.url
          },
          {
            hid: 'twitter:image:alt',
            name: 'twitter:image:alt',
            content: this.item.recipe.title
          },
          {
            hid: 'fb:app_id',
            property: 'fb:app_id',
            content: '570259036897585'
          },
          {
            hid: 'og:title',
            property: 'og:title',
            content: this.item.recipe.title
          },
          {
            hid: 'og:description',
            property: 'og:description',
            content: this.item.recipe.description
          },
          {
            hid: 'og:image',
            property: 'og:image',
            content: this.item.recipe.photo.openGraph.url
          },
          {
            hid: 'og:image:secure_url',
            property: 'og:image:secure_url',
            content: this.item.recipe.photo.openGraph.url
          },
          {
            hid: 'og:image:alt',
            property: 'og:image:alt',
            content: this.item.recipe.title
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/current',
      isMobile: 'isMobile',
      recipe: 'recipes/recipe',
      items: 'recipes/listSorted',
    }),
    // item () {
    //   return this.recipe(this.$route.params.slug)
    // }
  },
  methods: {
    ...mapActions({
      getStoreData: 'getStoreData',
      fetchRecipe: 'recipes/recipe',
    }),
    matchInfoBox () {
      this.dimension.width = this.$refs.recipe.clientWidth
      this.dimension.height = parseInt(this.dimension.width * 2 / 3)
    }
  },
  created () {
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
