<template>
  <div :key="componentKey" class="card card-small border-0 bg-light p-2 mb-3">
    <NuxtLink
      :to="`/r/${ item.recipe.slug }`"
      class="text-body stretched-link"
    >
      {{ item.recipe.title }}
    </NuxtLink>
    <div class="d-flex justify-content-between align-items-center">
      <div class="mr-3 d-flex flex-column">
        <div class="card-text text-body font-weight-lighter" style="font-size: 90%">
          {{ description }}
        </div>
      </div>
      <img
        ref="lazyImage"
        :data-src="item.recipe.photo.preview.url"
        secure="true"
        height="64"
        width="64"
        class="rounded"
        style="object-fit: cover;"
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CardSmall',
  props: {
    number: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      componentKey: 0
    }
  },
  computed: {
    ...mapGetters({
      recipes: 'recipes/listSorted'
    }),
    item () {
      return this.recipes[this.number]
    },
    description () {
      return this.tuncateString(this.item.recipe.description, this.$device.isMobile ? 100 : 200)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.lazyImage.src = this.$refs.lazyImage.dataset.src
    })
  },
  methods: {
    forceRerender () {
      this.componentKey += 1
    },
    tuncateString (str, length) {
      const arr = str.split('')
      // console.log(arr)
      while ((/\s/).test(arr[length]) === false) {
        // console.log(arr[length])
        length -= 1
      }
      if ((/\W/).test(arr[length - 1])) {
        length -= 1
      }
      return str.length <= length ? str : str.slice(0, length) + '&hellip;'
    }
  }
}
</script>
