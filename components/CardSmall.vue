<template>
  <div class="card card-small border-0 mb-3" :key="componentKey">
    <div v-if="item" class="d-flex">
        <img
          :src="item.recipe.photo.preview.url"
          secure="true" height="96" width="96" class="rounded" style="object-fit: cover;"
        >
      <div class="ml-3 d-flex flex-column">
        <NuxtLink
          class="text-body stretched-link"
          :to="'/r/' + item.recipe.slug"
        >
        {{ item.recipe.title }}
        </NuxtLink>
        <div class="card-text text-body font-weight-lighter" style="font-size: 90%" v-html="description">
        </div>
      </div>
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
      return this.tuncateString(this.item.recipe.description, this.isMobile ? 50 : 200)
    }
  },
  beforeMount () {
    this.forceRerender()
  },
}
</script>
