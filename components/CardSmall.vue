<template>
  <div class="card card-small border-0 bg-light p-2 mb-3" :key="componentKey">
    <NuxtLink
      class="text-body stretched-link"
      :to="`/r/${ item.recipe.slug }`"
    >{{ item.recipe.title }}</NuxtLink>
    <div class="d-flex justify-content-between align-items-center">
      <div class="mr-3 d-flex flex-column">
        <div class="card-text text-body font-weight-lighter" style="font-size: 90%" v-html="description">
        </div>
      </div>
      <img
        ref="lazyImage"
        :data-src="item.recipe.photo.preview.url"
        secure="true" height="64" width="64" class="rounded" style="object-fit: cover;"
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CardSmall',
  // props: ['componentKey'],
  data () {
    return {
      componentKey: 0,
    }
  },
  methods: {
    forceRerender () {
      this.componentKey += 1;
    },
    tuncateString (str, length) {
      const arr = str.split('')
      // console.log(arr)
      while ((/\s/).test(arr[length]) == false) {
        // console.log(arr[length])
        length -= 1
      }
      if ((/\W/).test(arr[length-1])) length -= 1
      return str.length <= length ? str : str.slice(0, length) + '&hellip;'
    }
  },
  computed: {
    ...mapGetters({
      recipes: 'recipes/listSorted',
      isMobile: 'isMobile'
    }),
    item () {
      const getRandomInt = (max) => {
        max = max > 0 ? max - 1 : 0
        const result = Math.floor(Math.random() * Math.floor(max))
        // console.log(result)
        return result
      }
      const num = getRandomInt(this.recipes.length)
      const randomRecipe = this.recipes[num]
      // console.log(randomRecipe)
      return randomRecipe
    },
    description () {
      return this.tuncateString(this.item.recipe.description, this.isMobile ? 100 : 200)
    }
  },
  mounted () {
    this.$refs.lazyImage.src = this.$refs.lazyImage.dataset.src
    // this.$nextTick(() => {
      // this.forceRerender()
    // })
  }
}
</script>
