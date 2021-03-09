<template>
  <div v-if="item" class="container py-3 mb-5 recipe" :key="componentKey">
    <LazyRecipeHead :item="item" />
    <RecipeBody :item="item" />

<!--     <div class="my-3 d-print-none">
      <InArticleAdsense
        data-ad-client="ca-pub-9223566768445571"
        data-ad-slot="4726766855">
      </InArticleAdsense>
    </div> -->

    <LazyYoutube :item="item" />

    <LazyBtnSocialSharing v-if="isMobile == false" :item="item" />

    <LazyOtherRecipes />

    <div
      id="comments"
      ref="comments"
    >
      <LazyComments
        :item="item"
      />
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
      // loadComments: false,
      // item: undefined,
    }
  },
  // async asyncData({ params }) {
  //   console.log(params.slug)
  //   const slug = params.slug
  //   return { slug }
  // },
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/current',
      isMobile: 'isMobile',
      recipe: 'recipes/recipe',
      items: 'recipes/listSorted',
    }),
    item () {
      return this.recipe(this.$route.params.slug)
    }
  },
  methods: {
    ...mapActions({
      getStoreData: 'getStoreData',
      fetchRecipe: 'recipes/recipe',
    }),
    // async setItem () {
      // this.item = this.recipe(this.slug)
      // this.item = this.recipe(this.slug)
    // },
  },
  metaInfo () {
    console.log(this.item)
    return {
      title: this.item.recipe.title,
      meta: [
        { vmid: 'description', name: 'description', content: this.item.recipe.description },
        { vmid: 'fb:app_id', property: 'fb:app_id', content: '570259036897585' },
        { vmid: 'og:site_name', property: 'og:site_name', content: 'Cuisinier Rebelle' },
        { vmid: 'og:title', property: 'og:title', content: `${ this.item.recipe.title } | Cuisinier Rebelle` },
        { vmid: 'og:description', property: 'og:description', content: this.item.recipe.description },
        { vmid: 'og:locale', property: 'og:locale', content: 'fr_FR' },
        { vmid: 'og:type', property: 'og:type', content: 'website' },
        { vmid: 'og:url', property: 'og:url', content: `https://www.cuisinierrebelle.com/r/${ this.$route.params.slug }` },
        { vmid: 'og:image', property: 'og:image', content: this.item.recipe.photo.openGraph.url },
        { vmid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { vmid: 'twitter:site', name: 'twitter:site', content: '@cuisinierrebelle' },
        { vmid: 'twitter:creator', name: 'twitter:creator', content: '@cuisinierrebelle' },
        { vmid: 'twitter:title', name: 'twitter:title', content: `${ this.item.recipe.title } | Cuisinier Rebelle` },
        { vmid: 'twitter:description', name: 'twitter:description', content: this.item.recipe.description },
        { vmid: 'twitter:image', name: 'twitter:image', content: this.item.recipe.photo.openGraph.url },
      ]
    }
  },
  async created () {
    // console.log(this.slug)
    console.log(this.$route.params.slug)
    await this.fetchRecipe(this.$route.params.slug)
  },
  async beforeMount () {
    if (this.items.length == 0) this.getStoreData()
  },
  // async mounted () {
  //   this.$nextTick(() => {
  //     this.loadComments = true
  //   })
  // },
}
</script>
