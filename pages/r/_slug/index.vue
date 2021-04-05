<template>
  <div>
    <div v-if="$fetchState.error">
      <NotFound />
    </div>
    <div v-else :key="componentKey" ref="recipe" class="container py-3 mb-5 recipe">
      <SocialHead
        :title="item.recipe.title"
        :description="item.recipe.description"
        :image="item.recipe.photo.openGraph.url"
      />
      <RecipeHead :item="item" />
      <RecipeBody :item="item" :dimension="dimension" />

      <LazyYoutube :item="item" />

      <LazyBtnSocialSharing v-if="$device.isMobile == false" :item="item" />

      <div class="w-100 my-5">
        <LazyRecipeAds />
      </div>

      <LazyOtherRecipes v-if="recipes.length > 2" :recipes="recipes" />

      <Comments
        :item="item"
        @refresh="$fetch"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Recipe',
  async asyncData ({ $axios, params }) {
    const item = await $axios.$get(`/v1/recipes/${params.slug}`)
    return { item }
  },
  data () {
    return {
      componentKey: 0,
      dimension: {
        width: 0,
        height: 0
      }
    }
  },
  async fetch () {
    // TO DO
    // check if recipe exists in store or fetch
    // await this.getRecipe(this.$route.params.slug)
    let refresh = true
    if (this.timestamp !== null) {
      refresh = new Date().getTime() - this.timestamp > 60 * 1000 * 3
    }
    if (refresh) {
      await this.getStoreData()
    }
  },
  computed: {
    ...mapGetters({
      // recipe: 'recipes/recipe',
      recipes: 'recipes/list',
      timestamp: 'timestamp'
    }),
    // item () {
    //   return this.recipe(this.$route.params.slug)
    // },
    show () {
      return this.item !== undefined
    },
    isProduction () {
      return location.hostname !== 'localhost'
    }
  },
  mounted () {
    this.$store.commit('recipes/recipe', this.item)
    this.$nextTick(() => {
      this.matchInfoBox()
    })
    window.addEventListener('resize', this.matchInfoBox)
  },
  methods: {
    ...mapActions({
      getStoreData: 'getStoreData',
      getRecipe: 'recipes/recipe'
    }),
    refresh () {
      this.$fetch()
    },
    loadItem () {
      this.item = this.recipe(this.$route.params.slug)
    },
    matchInfoBox () {
      if (this.$refs.recipe) {
        this.dimension.width = this.$refs.recipe.clientWidth
        this.dimension.height = parseInt(this.dimension.width * 2 / 3)
      }
    }
  }
}
</script>
